/**
 * =========================================================================
 * MODUL: Local Queue dan Sinkronisasi Offline [P1]
 * PORTAL: Karyawan
 * =========================================================================
 * User Story:
 * As a Karyawan, saya ingin data presensi tetap tersimpan secara lokal di perangkat saat koneksi internet terputus agar data kehadiran tidak hilang dan dapat disinkronkan kemudian.
 *
 * Alur Kerja (Happy Path):
 *   1. Karyawan melakukan klik tombol presensi saat koneksi internet terputus total.
 *   2. Sistem mendeteksi status offline melalui event listener jaringan peramban.
 *   3. Sistem mengenkripsi dan menyimpan data transaksi presensi ke dalam Local Queue di penyimpanan lokal peramban.
 *   4. Sistem menampilkan indikator visual status antrean offline kepada pengguna.
 *   5. Sistem mendeteksi pemulihan koneksi internet dan memicu skrip sinkronisasi otomatis.
 *   6. Sistem mengirimkan seluruh data dalam antrean ke server pusat dan menghapusnya dari penyimpanan lokal setelah sukses.
 *
 * Aturan Bisnis & Validasi:
 *   - Kapasitas maksimum Local Queue dibatasi hingga 50 transaksi tertunda per perangkat.
 *   - Data dalam antrean lokal wajib dienkripsi menggunakan kunci turunan sesi.
 *   - Sinkronisasi otomatis berjalan berulang setiap 5 menit atau saat koneksi stabil kembali.
 *   - Transaksi presensi offline yang melampaui batas waktu 7 hari kedaluwarsa dan ditolak sistem.
 *
 * Tech Mapping:
 * - Endpoints: POST /api/attendance/sync-batch
 * - Tables: public.attendance_logs, public.sync_audit_trail
 * =========================================================================
 */

import { CheckCircle2, ArrowLeft, Layers, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function KaryawanLocalQueueDanSinkronisasiOfflinePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
              P1
            </span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Portal Karyawan
            </span>
            <h1 className="text-lg font-bold tracking-tight text-white">Local Queue dan Sinkronisasi Offline</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            As a Karyawan, saya ingin data presensi tetap tersimpan secara lokal di perangkat saat koneksi internet terputus agar data kehadiran tidak hilang dan dapat disinkronkan kemudian.
          </p>
        </div>

        <Link
          href="/karyawan"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Karyawan</span>
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
              <p className="text-xs text-zinc-300 leading-relaxed">Karyawan melakukan klik tombol presensi saat koneksi internet terputus total.</p>
            </div>
            <div key={1} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                2
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mendeteksi status offline melalui event listener jaringan peramban.</p>
            </div>
            <div key={2} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                3
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mengenkripsi dan menyimpan data transaksi presensi ke dalam Local Queue di penyimpanan lokal peramban.</p>
            </div>
            <div key={3} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                4
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem menampilkan indikator visual status antrean offline kepada pengguna.</p>
            </div>
            <div key={4} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                5
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mendeteksi pemulihan koneksi internet dan memicu skrip sinkronisasi otomatis.</p>
            </div>
            <div key={5} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                6
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mengirimkan seluruh data dalam antrean ke server pusat dan menghapusnya dari penyimpanan lokal setelah sukses.</p>
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
              <span className="leading-relaxed">Kapasitas maksimum Local Queue dibatasi hingga 50 transaksi tertunda per perangkat.</span>
            </div>
            <div key={1} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Data dalam antrean lokal wajib dienkripsi menggunakan kunci turunan sesi.</span>
            </div>
            <div key={2} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Sinkronisasi otomatis berjalan berulang setiap 5 menit atau saat koneksi stabil kembali.</span>
            </div>
            <div key={3} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Transaksi presensi offline yang melampaui batas waktu 7 hari kedaluwarsa dan ditolak sistem.</span>
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
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">POST /api/attendance/sync-batch</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 font-mono">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Tabel Database</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-emerald-400">
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.attendance_logs</div><div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.sync_audit_trail</div>
          </div>
        </div>
      </div>
    </div>
  );
}
