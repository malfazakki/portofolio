"use client";

import { useState, useMemo } from "react";
import type { Experience } from "@/lib/db/schema";
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/app/admin/actions";
import {
  Plus,
  Trash2,
  Edit3,
  Briefcase,
  MapPin,
  Calendar,
  X,
  Search,
  Loader2,
  Check,
} from "lucide-react";

interface ExperienceManagerProps {
  initialExperiences: Experience[];
}

export default function ExperienceManager({
  initialExperiences,
}: ExperienceManagerProps) {
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const startCreate = () => {
    setEditingExp(null);
    setIsCreating(true);
  };

  const startEdit = (exp: Experience) => {
    setIsCreating(false);
    setEditingExp(exp);
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingExp(null);
    setIsSubmitting(false);
  };

  // Filter experiences by query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery) return initialExperiences;
    return initialExperiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialExperiences, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Bar: Title, Search & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span>Career Experiences</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 border border-primary text-primary font-mono">
              {initialExperiences.length} items
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola riwayat karir, posisi, perusahaan, periode, dan keahlian yang relevan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter riwayat..."
              className="pl-8 pr-3 py-1.5 bg-background border-2 border-primary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-56"
            />
          </div>

          {!isCreating && !editingExp && (
            <button
              onClick={startCreate}
              className="retro-button text-xs py-2 px-3 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Riwayat</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Tambah / Edit */}
      {(isCreating || editingExp) && (
        <div className="p-5 border-4 border-primary bg-card retro-shadow space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b-2 border-primary/40 pb-2">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              <span>
                {editingExp
                  ? `Edit: ${editingExp.title} @ ${editingExp.company}`
                  : "Tambah Riwayat Pengalaman Baru"}
              </span>
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
                if (editingExp) {
                  await updateExperienceAction(editingExp.id, formData);
                } else {
                  await createExperienceAction(formData);
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
                <label className="block font-bold text-primary mb-1">Posisi / Jabatan *</label>
                <input
                  name="title"
                  defaultValue={editingExp?.title || ""}
                  required
                  placeholder="Contoh: Freelance Fullstack Web Developer"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Perusahaan / Organisasi *</label>
                <input
                  name="company"
                  defaultValue={editingExp?.company || ""}
                  required
                  placeholder="Contoh: Self-Employed (Mandiri)"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Tipe Kontrak *</label>
                <select
                  name="employmentType"
                  defaultValue={editingExp?.employmentType || "Full-time"}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Apprenticeship">Apprenticeship / Bootcamp</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Model Kerja *</label>
                <select
                  name="locationType"
                  defaultValue={editingExp?.locationType || "On-site"}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Lokasi Kerja *</label>
                <input
                  name="location"
                  defaultValue={editingExp?.location || ""}
                  required
                  placeholder="Contoh: Indonesia / Jakarta Barat"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Mulai Bekerja *</label>
                <input
                  name="startDate"
                  defaultValue={editingExp?.startDate || ""}
                  required
                  placeholder="Contoh: Jul 2025"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Selesai (atau 'Present') *</label>
                <input
                  name="endDate"
                  defaultValue={editingExp?.endDate || "Present"}
                  required
                  placeholder="Contoh: Present / Dec 2024"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Durasi *</label>
                <input
                  name="duration"
                  defaultValue={editingExp?.duration || ""}
                  required
                  placeholder="Contoh: Ongoing... / 1 yr 3 mos"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1">
                Deskripsi Tanggung Jawab & Pencapaian *
              </label>
              <textarea
                name="description"
                defaultValue={editingExp?.description || ""}
                required
                rows={3}
                placeholder="Jelaskan peran, arsitektur, teknologi yang digunakan, serta pencapaian..."
                className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">
                  Skills Terkait (Pisahkan dengan koma) *
                </label>
                <input
                  name="skills"
                  defaultValue={
                    editingExp
                      ? (() => {
                          try {
                            return JSON.parse(editingExp.skills).join(", ");
                          } catch {
                            return editingExp.skills;
                          }
                        })()
                      : ""
                  }
                  required
                  placeholder="React.js, Next.js, NestJS, Go, Redis"
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
                  defaultValue={editingExp?.orderIndex ?? initialExperiences.length}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-primary/20">
              <button
                type="submit"
                disabled={isSubmitting}
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
                    <span>{editingExp ? "Simpan Perubahan" : "Simpan Riwayat"}</span>
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

      {/* Tabel Pengalaman */}
      <div className="border-4 border-primary bg-card retro-shadow overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-primary bg-primary/10 text-primary">
              <th className="p-3 w-12 text-center">Order</th>
              <th className="p-3">Posisi & Perusahaan</th>
              <th className="p-3">Periode & Durasi</th>
              <th className="p-3">Lokasi & Tipe</th>
              <th className="p-3">Skills</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {filteredExperiences.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground font-mono">
                  {searchQuery
                    ? `[!] Tidak ada riwayat yang cocok dengan "${searchQuery}".`
                    : "Belum ada riwayat kerja. Klik tombol 'Tambah Riwayat' di atas."}
                </td>
              </tr>
            ) : (
              filteredExperiences.map((exp, idx) => {
                let skillsList: string[] = [];
                try {
                  skillsList = JSON.parse(exp.skills);
                } catch {
                  skillsList = exp.skills.split(",");
                }

                return (
                  <tr key={exp.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3 text-center text-muted-foreground font-mono font-bold">
                      {exp.orderIndex ?? idx}
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{exp.title}</span>
                      </div>
                      <div className="text-primary text-[11px] font-semibold mt-0.5">
                        {exp.company}
                      </div>
                    </td>
                    <td className="p-3 text-[11px]">
                      <div className="flex items-center gap-1 text-foreground">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-[10px]">
                        ({exp.duration})
                      </div>
                    </td>
                    <td className="p-3 text-[11px]">
                      <div className="flex items-center gap-1 text-foreground">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {exp.employmentType} • {exp.locationType}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {skillsList.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-1.5 py-0.5 text-[10px] bg-primary/10 border border-primary/50 text-primary"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => startEdit(exp)}
                          className="p-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Edit Riwayat"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Yakin ingin menghapus riwayat "${exp.title} @ ${exp.company}"?`)) {
                              await deleteExperienceAction(exp.id);
                            }
                          }}
                          className="p-1.5 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          title="Hapus Riwayat"
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
