"use client";

import { useState } from "react";
import type { Project } from "@/lib/db/schema";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions";
import { Plus, Trash2, Edit3, Upload, ExternalLink, Image as ImageIcon, Check } from "lucide-react";

interface ProjectManagerProps {
  initialProjects: Project[];
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage("Uploading to Cloudinary...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal upload gambar");
      }

      setImageUrl(data.url);
      setUploadMessage("✅ Berhasil diunggah ke Cloudinary!");
    } catch (err: any) {
      setUploadMessage(`❌ ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const startCreate = () => {
    setEditingProject(null);
    setImageUrl("");
    setUploadMessage("");
    setIsCreating(true);
  };

  const startEdit = (p: Project) => {
    setIsCreating(false);
    setEditingProject(p);
    setImageUrl(p.image || "");
    setUploadMessage("");
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingProject(null);
    setImageUrl("");
    setUploadMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary">Manage Projects</h2>
          <p className="text-xs text-muted-foreground">
            Tambah, ubah, atau hapus karya proyek portofolio.
          </p>
        </div>
        {!isCreating && !editingProject && (
          <button
            onClick={startCreate}
            className="retro-button text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Proyek</span>
          </button>
        )}
      </div>

      {/* Form Tambah / Edit */}
      {(isCreating || editingProject) && (
        <div className="p-5 border-4 border-primary bg-card retro-shadow space-y-4">
          <h3 className="text-sm font-bold text-primary border-b-2 border-primary/40 pb-2">
            {editingProject ? `Edit: ${editingProject.title}` : "Tambah Proyek Baru"}
          </h3>

          <form
            action={async (formData) => {
              if (imageUrl) {
                formData.set("image", imageUrl);
              }
              if (editingProject) {
                await updateProjectAction(editingProject.id, formData);
              } else {
                await createProjectAction(formData);
              }
              cancelForm();
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Judul Proyek *</label>
                <input
                  name="title"
                  defaultValue={editingProject?.title || ""}
                  required
                  placeholder="Contoh: Sistem Informasi Santri"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Slug URL *</label>
                <input
                  name="slug"
                  defaultValue={editingProject?.slug || ""}
                  required
                  placeholder="contoh: sistem-informasi-santri"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1">Deskripsi Singkat *</label>
              <textarea
                name="description"
                defaultValue={editingProject?.description || ""}
                required
                rows={2}
                placeholder="Penjelasan ringkas tentang proyek..."
                className="w-full p-2 bg-background border-2 border-primary text-foreground"
              />
            </div>

            {/* Cloudinary Image Upload & Preview */}
            <div className="p-3 border-2 border-dashed border-primary/60 bg-background/50 space-y-3">
              <label className="block font-bold text-primary">
                Gambar Proyek (Cloudinary) *
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <label className="retro-button text-xs py-1.5 px-3 cursor-pointer flex items-center gap-1.5 bg-accent text-accent-foreground border-accent-foreground">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Mengunggah..." : "Pilih File & Upload ke Cloudinary"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {uploadMessage && (
                  <span className="text-[11px] text-muted-foreground">{uploadMessage}</span>
                )}
              </div>

              <div>
                <label className="block text-[11px] text-muted-foreground mb-1">
                  Atau masukkan URL Cloudinary secara manual:
                </label>
                <input
                  name="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              {imageUrl && (
                <div className="mt-2">
                  <span className="text-[10px] text-muted-foreground block mb-1">Preview:</span>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-28 object-cover border-2 border-primary rounded-none"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">
                  Tags / Tech Stack (Pisahkan dengan koma) *
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
                  placeholder="Next.js, Laravel, PostgreSQL, Tailwind"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Urutan Tampilan (Order)</label>
                <input
                  type="number"
                  name="orderIndex"
                  defaultValue={editingProject?.orderIndex ?? 0}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Demo / Live URL</label>
                <input
                  name="demoUrl"
                  defaultValue={editingProject?.demoUrl || ""}
                  placeholder="https://example.com"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">GitHub Repo URL</label>
                <input
                  name="repoUrl"
                  defaultValue={editingProject?.repoUrl || ""}
                  placeholder="https://github.com/..."
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={editingProject ? Boolean(editingProject.featured) : true}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="featured" className="font-bold text-primary">
                Tampilkan di Halaman Utama (Featured)
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="retro-button text-xs py-2 px-4"
              >
                {editingProject ? "Simpan Perubahan" : "Simpan Proyek"}
              </button>
              <button
                type="button"
                onClick={cancelForm}
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
              <th className="p-3 w-12 text-center">#</th>
              <th className="p-3 w-20">Foto</th>
              <th className="p-3">Judul & Deskripsi</th>
              <th className="p-3">Tech Stack</th>
              <th className="p-3">Link</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {initialProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Belum ada proyek. Klik "Tambah Proyek" di atas.
                </td>
              </tr>
            ) : (
              initialProjects.map((p, idx) => {
                let tagsList: string[] = [];
                try {
                  tagsList = JSON.parse(p.tags);
                } catch {
                  tagsList = p.tags.split(",");
                }

                return (
                  <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3 text-center text-muted-foreground font-mono">
                      {p.orderIndex ?? idx + 1}
                    </td>
                    <td className="p-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-10 object-cover border border-primary"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-muted flex items-center justify-center border border-primary">
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-bold text-foreground text-sm">{p.title}</div>
                      <div className="text-muted-foreground text-[11px] line-clamp-1">
                        {p.description}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
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
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Demo
                        </a>
                      )}
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Repo
                        </a>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Yakin ingin menghapus "${p.title}"?`)) {
                              await deleteProjectAction(p.id);
                            }
                          }}
                          className="p-1.5 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          title="Hapus"
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

