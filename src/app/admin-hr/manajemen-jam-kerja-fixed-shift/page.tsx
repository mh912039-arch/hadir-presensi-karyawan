/**
 * =========================================================================
 * MODUL: Manajemen Jam Kerja Fixed Shift [P0]
 * PORTAL: Admin HR
 * =========================================================================
 * User Story:
 * Sebagai Admin HR, saya ingin membuat dan menetapkan jadwal Fixed Shift harian agar jam masuk dan jam pulang baku karyawan tercatat secara konsisten di sistem.
 *
 * Alur Kerja (Happy Path):
 *   1. Admin HR mengakses menu pengaturan shift dan mengklik tombol tambah shift.
 *   2. Admin HR mengisi formulir nama shift, jam masuk baku, dan jam pulang baku.
 *   3. Sistem memvalidasi format waktu dan kelengkapan parameter formulir.
 *   4. Admin HR menekan tombol simpan untuk mengirim data ke server.
 *   5. Sistem menyimpan data ke basis data dan menampilkan notifikasi sukses.
 *
 * Aturan Bisnis & Validasi:
 *   - Jam masuk baku wajib mendahului jam pulang baku dengan selisih minimal 4 jam.
 *   - Nama shift bersifat unik dan tidak boleh ada duplikasi dalam satu perusahaan.
 *   - Penetapan shift wajib mencakup hari kerja aktif dalam sepekan.
 *   - Penghapusan shift ditolak jika masih ada karyawan aktif yang terikat pada shift tersebut.
 *
 * Tech Mapping:
 * - Endpoints: POST /api/shifts, GET /api/shifts
 * - Tables: public.fixed_shifts, public.employee_shifts
 * =========================================================================
 */

import { CheckCircle2, ArrowLeft, Layers, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminHrManajemenJamKerjaFixedShiftPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
              P0
            </span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Portal Admin HR
            </span>
            <h1 className="text-lg font-bold tracking-tight text-white">Manajemen Jam Kerja Fixed Shift</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Sebagai Admin HR, saya ingin membuat dan menetapkan jadwal Fixed Shift harian agar jam masuk dan jam pulang baku karyawan tercatat secara konsisten di sistem.
          </p>
        </div>

        <Link
          href="/admin-hr"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Admin HR</span>
        </Link>
      </div>

      {/* Alur Kerja & Aturan Bisnis */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            <Layers className="h-4 w-4 text-blue-400" />
            <span>Alur Kerja (Happy Path)</span>
          </div>
          <div className="space-y-2">
            
            <div key={0} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                1
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Admin HR mengakses menu pengaturan shift dan mengklik tombol tambah shift.</p>
            </div>
            <div key={1} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                2
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Admin HR mengisi formulir nama shift, jam masuk baku, dan jam pulang baku.</p>
            </div>
            <div key={2} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                3
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem memvalidasi format waktu dan kelengkapan parameter formulir.</p>
            </div>
            <div key={3} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                4
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Admin HR menekan tombol simpan untuk mengirim data ke server.</p>
            </div>
            <div key={4} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                5
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem menyimpan data ke basis data dan menampilkan notifikasi sukses.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Aturan Bisnis & Validasi</span>
          </div>
          <div className="space-y-2">
            
            <div key={0} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Jam masuk baku wajib mendahului jam pulang baku dengan selisih minimal 4 jam.</span>
            </div>
            <div key={1} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Nama shift bersifat unik dan tidak boleh ada duplikasi dalam satu perusahaan.</span>
            </div>
            <div key={2} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Penetapan shift wajib mencakup hari kerja aktif dalam sepekan.</span>
            </div>
            <div key={3} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Penghapusan shift ditolak jika masih ada karyawan aktif yang terikat pada shift tersebut.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Mapping */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 font-mono">
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>Endpoint API Terkait</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-blue-400">
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">POST /api/shifts</div><div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">GET /api/shifts</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 font-mono">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Tabel Database</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-emerald-400">
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.fixed_shifts</div><div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.employee_shifts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
