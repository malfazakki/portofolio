"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/lib/db/schema";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions";
import { parseProjectImages } from "@/lib/project-utils";
import { compressImageClient, formatBytes } from "@/lib/client-compress";
import {
  Plus,
  Trash2,
  Edit3,
  Upload,
  ExternalLink,
  Image as ImageIcon,
  X,
  Search,
  Loader2,
  Check,
  Star,
  Images,
} from "lucide-react";

interface ProjectManagerProps {
  initialProjects: Project[];
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [manualUrlInput, setManualUrlInput] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  // Handle multiple file uploads with automatic client-side compression
  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadMessage(`Memproses & mengompresi ${files.length} foto...`);

    const uploadedUrls: string[] = [];
    let failedCount = 0;
    let totalOriginalBytes = 0;
    let totalCompressedBytes = 0;

    for (let i = 0; i < files.length; i++) {
      const originalFile = files[i];
      totalOriginalBytes += originalFile.size;

      setUploadMessage(
        `Mengompresi (${i + 1}/${files.length}): ${originalFile.name}...`
      );

      // Client-side compression before sending over network
      let fileToUpload = originalFile;
      try {
        const comp = await compressImageClient(originalFile, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.82,
        });
        fileToUpload = comp.file;
        totalCompressedBytes += comp.compressedSize;
      } catch {
        totalCompressedBytes += originalFile.size;
      }

      setUploadMessage(
        `Mengunggah ke Cloudinary (${i + 1}/${files.length}): ${fileToUpload.name}...`
      );

      const formData = new FormData();
      formData.append("file", fileToUpload);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          uploadedUrls.push(data.url);
        } else {
          failedCount++;
        }
      } catch {
        failedCount++;
      }
    }

    if (uploadedUrls.length > 0) {
      setImagesList((prev) => [...prev, ...uploadedUrls]);
      const savedBytes = totalOriginalBytes - totalCompressedBytes;
      const savedPercent =
        totalOriginalBytes > 0
          ? Math.max(0, Math.round((savedBytes / totalOriginalBytes) * 100))
          : 0;

      const sizeNote =
        savedPercent > 5
          ? ` (Hemat ${savedPercent}%: ${formatBytes(totalOriginalBytes)} ➔ ${formatBytes(totalCompressedBytes)})`
          : "";

      setUploadMessage(
        `✅ Berhasil mengunggah ${uploadedUrls.length} foto!${sizeNote}${
          failedCount > 0 ? ` (${failedCount} gagal)` : ""
        }`
      );
    } else {
      setUploadMessage("❌ Gagal mengunggah foto ke Cloudinary.");
    }

    setUploading(false);
  };

  const addManualUrl = () => {
    if (!manualUrlInput.trim()) return;
    setImagesList((prev) => [...prev, manualUrlInput.trim()]);
    setManualUrlInput("");
  };

  const removeImageAt = (index: number) => {
    setImagesList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const setAsCover = (index: number) => {
    if (index === 0) return;
    setImagesList((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
  };

  const handleTitleChange = (val: string) => {
    setTitleInput(val);
    if (!isSlugManuallyEdited && isCreating) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlugInput(autoSlug);
    }
  };

  const startCreate = () => {
    setEditingProject(null);
    setTitleInput("");
    setSlugInput("");
    setImagesList([]);
    setManualUrlInput("");
    setUploadMessage("");
    setIsSlugManuallyEdited(false);
    setIsCreating(true);
  };

  const startEdit = (p: Project) => {
    setIsCreating(false);
    setEditingProject(p);
    setTitleInput(p.title);
    setSlugInput(p.slug);
    setImagesList(parseProjectImages(p.image));
    setManualUrlInput("");
    setUploadMessage("");
    setIsSlugManuallyEdited(true);
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingProject(null);
    setImagesList([]);
    setManualUrlInput("");
    setUploadMessage("");
    setIsSubmitting(false);
  };

  // Filter projects by search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return initialProjects;
    return initialProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialProjects, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Bar: Title, Search, and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span>Portfolio Projects</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 border border-primary text-primary font-mono">
              {initialProjects.length} items
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola karya portofolio, upload multiple screenshots untuk slideshow, dan urutkan prioritas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter proyek..."
              className="pl-8 pr-3 py-1.5 bg-background border-2 border-primary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-56"
            />
          </div>

          {!isCreating && !editingProject && (
            <button
              onClick={startCreate}
              className="retro-button text-xs py-2 px-3 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Proyek</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Tambah / Edit */}
      {(isCreating || editingProject) && (
        <div className="p-5 border-4 border-primary bg-card retro-shadow space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b-2 border-primary/40 pb-2">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              <span>{editingProject ? `Edit: ${editingProject.title}` : "Tambah Proyek Baru"}</span>
            </h3>
            <button
              onClick={cancelForm}
              className="p-1 hover:text-destructive transition-colors text-muted-foreground"
              title="Tutup Form"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                // Serialize multiple images as JSON array string
                const serializedImages =
                  imagesList.length > 0 ? JSON.stringify(imagesList) : "";
                formData.set("image", serializedImages);

                if (editingProject) {
                  await updateProjectAction(editingProject.id, formData);
                } else {
                  await createProjectAction(formData);
                }
                cancelForm();
              } catch (err: any) {
                alert(`Gagal menyimpan: ${err.message}`);
                setIsSubmitting(false);
              }
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Judul Proyek *</label>
                <input
                  name="title"
                  value={titleInput}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Contoh: Manajerku — SaaS ERP"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Slug URL (Unik) *</label>
                <input
                  name="slug"
                  value={slugInput}
                  onChange={(e) => {
                    setIsSlugManuallyEdited(true);
                    setSlugInput(e.target.value);
                  }}
                  required
                  placeholder="contoh: manajerku-saas-erp"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1">Deskripsi Ringkas *</label>
              <textarea
                name="description"
                defaultValue={editingProject?.description || ""}
                required
                rows={2}
                placeholder="Penjelasan ringkas tentang proyek..."
                className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* MULTIPLE IMAGE & SLIDESHOW MANAGER */}
            <div className="p-4 border-2 border-dashed border-primary/60 bg-background/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block font-bold text-primary flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-primary" />
                    <span>Galeri Foto & Slideshow ({imagesList.length} Foto)</span>
                  </label>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Foto pertama otomatis menjadi Cover Card. Foto lainnya akan menjadi Slideshow di halaman detail.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {/* File input (Supports MULTIPLE files) */}
                <label className="retro-button text-xs py-1.5 px-3 cursor-pointer flex items-center gap-1.5 bg-accent text-accent-foreground border-accent-foreground">
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {uploading ? "Mengunggah..." : "Pilih Satu / Banyak Foto (Cloudinary)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {uploadMessage && (
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {uploadMessage}
                  </span>
                )}
              </div>

              {/* Manual URL Input */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={manualUrlInput}
                  onChange={(e) => setManualUrlInput(e.target.value)}
                  placeholder="Atau tempel URL Cloudinary langsung di sini..."
                  className="flex-1 p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addManualUrl}
                  className="retro-button text-xs py-2 px-3 shrink-0"
                >
                  Tambah URL
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="pt-2">
                <span className="text-[10px] text-muted-foreground block mb-2 font-mono">
                  Daftar Screenshot Terpasang:
                </span>

                {imagesList.length === 0 ? (
                  <div className="w-full py-6 border-2 border-dashed border-primary/30 bg-card flex flex-col items-center justify-center p-2 text-center">
                    <ImageIcon className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-[11px] text-primary font-mono">[ BELUM ADA FOTO ]</span>
                    <span className="text-[9px] text-muted-foreground">
                      Proyek ini akan otomatis memakai placeholder [ NO IMAGE ]
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {imagesList.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative border-2 border-primary bg-background group overflow-hidden"
                      >
                        <img
                          src={imgUrl}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-24 object-cover pixelated"
                        />

                        {/* Cover Badge */}
                        {idx === 0 ? (
                          <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-1.5 py-0.5 text-[9px] font-bold font-mono flex items-center gap-1 shadow">
                            <Star className="w-2.5 h-2.5 fill-current" /> COVER
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setAsCover(idx)}
                            className="absolute top-1 left-1 bg-background/90 border border-primary text-primary px-1.5 py-0.5 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Jadikan Foto Utama / Cover"
                          >
                            Set Cover
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeImageAt(idx)}
                          className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors"
                          title="Hapus foto ini"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="p-1 bg-background text-[9px] font-mono text-muted-foreground truncate border-t border-primary/40">
                          Slide #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">
                  Tech Stack / Tags (Pisahkan dengan koma) *
                </label>
                <input
                  name="tags"
                  defaultValue={
                    editingProject
                      ? (() => {
                          try {
                            return JSON.parse(editingProject.tags).join(", ");
                          } catch {
                            return editingProject.tags;
                          }
                        })()
                      : ""
                  }
                  required
                  placeholder="React.js, NestJS, PostgreSQL, Redis"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">
                  Urutan Tampilan (Order Index)
                </label>
                <input
                  type="number"
                  name="orderIndex"
                  defaultValue={editingProject?.orderIndex ?? initialProjects.length}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Demo / Live Website URL</label>
                <input
                  name="demoUrl"
                  defaultValue={editingProject?.demoUrl || ""}
                  placeholder="https://manajerku.com (atau # jika belum publik)"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">GitHub / Git Repo URL</label>
                <input
                  name="repoUrl"
                  defaultValue={editingProject?.repoUrl || ""}
                  placeholder="https://github.com/malfazakki/... (atau # jika private)"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1">
                Studi Kasus / Detail Lengkap (Opsional)
              </label>
              <textarea
                name="content"
                defaultValue={editingProject?.content || ""}
                rows={3}
                placeholder="Penjelasan mendalam mengenai tantangan arsitektur, solusi teknis, alur sistem, dsb. Akan ditampilkan di halaman detail proyek."
                className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={editingProject ? Boolean(editingProject.featured) : true}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="featured" className="font-bold text-primary cursor-pointer">
                Tampilkan di Halaman Utama (Featured)
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-primary/20">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="retro-button text-xs py-2 px-4 flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menyimpan ke Turso...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{editingProject ? "Simpan Perubahan" : "Simpan Proyek"}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                disabled={isSubmitting}
                className="retro-button text-xs py-2 px-4 bg-muted text-foreground border-foreground"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Proyek */}
      <div className="border-4 border-primary bg-card retro-shadow overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-primary bg-primary/10 text-primary">
              <th className="p-3 w-12 text-center">Order</th>
              <th className="p-3 w-24">Cover & Slides</th>
              <th className="p-3">Judul & Deskripsi</th>
              <th className="p-3">Tech Stack</th>
              <th className="p-3">Links</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground font-mono">
                  {searchQuery
                    ? `[!] Tidak ada proyek yang cocok dengan "${searchQuery}".`
                    : "Belum ada proyek. Klik tombol 'Tambah Proyek' di atas."}
                </td>
              </tr>
            ) : (
              filteredProjects.map((p, idx) => {
                let tagsList: string[] = [];
                try {
                  tagsList = JSON.parse(p.tags);
                } catch {
                  tagsList = p.tags.split(",");
                }

                const images = parseProjectImages(p.image);
                const cover = images.length > 0 ? images[0] : null;

                return (
                  <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3 text-center text-muted-foreground font-mono font-bold">
                      {p.orderIndex ?? idx}
                    </td>
                    <td className="p-3">
                      {cover ? (
                        <div className="relative inline-block">
                          <img
                            src={cover}
                            alt={p.title}
                            className="w-16 h-10 object-cover border border-primary pixelated"
                          />
                          {images.length > 1 && (
                            <span className="absolute bottom-0 right-0 bg-background/90 text-primary border border-primary text-[8px] font-mono px-1">
                              +{images.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div
                          className="w-16 h-10 bg-background flex flex-col items-center justify-center border border-dashed border-primary/50 text-[8px] text-primary/70 font-mono"
                          title="No Image (Placeholder)"
                        >
                          <span>NO IMG</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="hover:text-primary transition-colors hover:underline"
                        >
                          {p.title}
                        </a>
                        {!p.featured && (
                          <span className="text-[9px] px-1 py-0.2 bg-muted text-muted-foreground border">
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground text-[11px] line-clamp-1 mt-0.5">
                        {p.description}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {tagsList.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 text-[10px] bg-primary/10 border border-primary/50 text-primary"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 space-y-1">
                      <a
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
                      >
                        <ExternalLink className="w-3 h-3" /> Showcase
                      </a>
                      {p.demoUrl && p.demoUrl !== "#" ? (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:underline"
                        >
                          Demo
                        </a>
                      ) : null}
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Edit Proyek"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Yakin ingin menghapus proyek "${p.title}"?`)) {
                              await deleteProjectAction(p.id);
                            }
                          }}
                          className="p-1.5 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
