"use client";

import { useState } from "react";
import type { Experience } from "@/lib/db/schema";
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/app/admin/actions";
import { Plus, Trash2, Edit3, Briefcase, MapPin, Calendar } from "lucide-react";

interface ExperienceManagerProps {
  initialExperiences: Experience[];
}

export default function ExperienceManager({
  initialExperiences,
}: ExperienceManagerProps) {
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary">Manage Experiences</h2>
          <p className="text-xs text-muted-foreground">
            Kelola riwayat karir dan pengalaman kerja Anda.
          </p>
        </div>
        {!isCreating && !editingExp && (
          <button
            onClick={startCreate}
            className="retro-button text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Riwayat Kerja</span>
          </button>
        )}
      </div>

      {/* Form Tambah / Edit */}
      {(isCreating || editingExp) && (
        <div className="p-5 border-4 border-primary bg-card retro-shadow space-y-4">
          <h3 className="text-sm font-bold text-primary border-b-2 border-primary/40 pb-2">
            {editingExp ? `Edit: ${editingExp.title} @ ${editingExp.company}` : "Tambah Pengalaman Baru"}
          </h3>

          <form
            action={async (formData) => {
              if (editingExp) {
                await updateExperienceAction(editingExp.id, formData);
              } else {
                await createExperienceAction(formData);
              }
              cancelForm();
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
                  placeholder="Contoh: Fullstack Web Developer & Mentor"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Perusahaan / Organisasi *</label>
                <input
                  name="company"
                  defaultValue={editingExp?.company || ""}
                  required
                  placeholder="Contoh: Pondok IT Indonesia"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Tipe Pekerjaan *</label>
                <select
                  name="employmentType"
                  defaultValue={editingExp?.employmentType || "Full-time"}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Model Kerja *</label>
                <select
                  name="locationType"
                  defaultValue={editingExp?.locationType || "On-site"}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
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
                  placeholder="Contoh: Bantul, Yogyakarta, Indonesia"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">Bulan & Tahun Mulai *</label>
                <input
                  name="startDate"
                  defaultValue={editingExp?.startDate || ""}
                  required
                  placeholder="Contoh: Aug 2025"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Selesai (atau 'Present') *</label>
                <input
                  name="endDate"
                  defaultValue={editingExp?.endDate || "Present"}
                  required
                  placeholder="Contoh: Present / Dec 2024"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Durasi *</label>
                <input
                  name="duration"
                  defaultValue={editingExp?.duration || ""}
                  required
                  placeholder="Contoh: Ongoing... / 1 yr 3 mos"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1">Deskripsi Tugas / Divisi *</label>
              <textarea
                name="description"
                defaultValue={editingExp?.description || ""}
                required
                rows={2}
                placeholder="Jelaskan peran, tanggung jawab, atau divisi Anda..."
                className="w-full p-2 bg-background border-2 border-primary text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-primary mb-1">
                  Skills yang Digunakan (Pisahkan dengan koma) *
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
                  placeholder="Next.js, React, TypeScript, Express.js"
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Urutan (Order)</label>
                <input
                  type="number"
                  name="orderIndex"
                  defaultValue={editingExp?.orderIndex ?? 0}
                  className="w-full p-2 bg-background border-2 border-primary text-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="retro-button text-xs py-2 px-4"
              >
                {editingExp ? "Simpan Perubahan" : "Simpan Riwayat"}
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

      {/* Tabel Pengalaman */}
      <div className="border-4 border-primary bg-card retro-shadow overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-primary bg-primary/10 text-primary">
              <th className="p-3 w-12 text-center">#</th>
              <th className="p-3">Posisi & Perusahaan</th>
              <th className="p-3">Periode & Durasi</th>
              <th className="p-3">Lokasi & Tipe</th>
              <th className="p-3">Skills</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {initialExperiences.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Belum ada riwayat kerja. Klik "Tambah Riwayat Kerja" di atas.
                </td>
              </tr>
            ) : (
              initialExperiences.map((exp, idx) => {
                let skillsList: string[] = [];
                try {
                  skillsList = JSON.parse(exp.skills);
                } catch {
                  skillsList = exp.skills.split(",");
                }

                return (
                  <tr key={exp.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3 text-center text-muted-foreground font-mono">
                      {exp.orderIndex ?? idx + 1}
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
                          {exp.startDate} - {exp.endDate}
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
                      <div className="flex flex-wrap gap-1">
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
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Yakin ingin menghapus "${exp.title}"?`)) {
                              await deleteExperienceAction(exp.id);
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

