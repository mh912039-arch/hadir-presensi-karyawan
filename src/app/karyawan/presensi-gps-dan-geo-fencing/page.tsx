/**
 * =========================================================================
 * MODUL: Presensi GPS dan Geo-fencing [P0]
 * PORTAL: Karyawan
 * =========================================================================
 * User Story:
 * Sebagai Karyawan, saya ingin melakukan pencatatan presensi harian dengan verifikasi koordinat GPS agar kehadiran saya sah tercatat dalam radius kantor yang ditentukan.
 *
 * Alur Kerja (Happy Path):
 *   1. Karyawan membuka menu presensi di peramban seluler.
 *   2. Sistem meminta izin akses sensor lokasi GPS perangkat pengguna.
 *   3. Perangkat mengembalikan titik koordinat lintang dan bujur terkini.
 *   4. Sistem menghitung jarak Haversine antara koordinat pengguna dan koordinat titik kantor.
 *   5. Sistem memverifikasi apakah jarak berada dalam radius maksimum Geo-fencing.
 *   6. Sistem mencatat transaksi presensi ke basis data dan menampilkan status sukses.
 *
 * Aturan Bisnis & Validasi:
 *   - Radius maksimum Geo-fencing ditetapkan sejauh 100 meter dari titik pusat koordinat kantor.
 *   - Pengguna wajib mengaktifkan akurasi GPS tinggi pada perangkat seluler.
 *   - Percobaan presensi ditolak jika terdeteksi menggunakan aplikasi tiruan lokasi palsu.
 *   - Setiap karyawan hanya dapat melakukan satu kali pencatatan presensi masuk per hari.
 *
 * Tech Mapping:
 * - Endpoints: POST /api/attendance/clock-in
 * - Tables: public.attendance_logs, public.office_locations
 * =========================================================================
 */

import { CheckCircle2, ArrowLeft, Layers, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function KaryawanPresensiGpsDanGeoFencingPage() {
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
              Portal Karyawan
            </span>
            <h1 className="text-lg font-bold tracking-tight text-white">Presensi GPS dan Geo-fencing</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Sebagai Karyawan, saya ingin melakukan pencatatan presensi harian dengan verifikasi koordinat GPS agar kehadiran saya sah tercatat dalam radius kantor yang ditentukan.
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
              <p className="text-xs text-zinc-300 leading-relaxed">Karyawan membuka menu presensi di peramban seluler.</p>
            </div>
            <div key={1} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                2
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem meminta izin akses sensor lokasi GPS perangkat pengguna.</p>
            </div>
            <div key={2} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                3
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Perangkat mengembalikan titik koordinat lintang dan bujur terkini.</p>
            </div>
            <div key={3} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                4
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem menghitung jarak Haversine antara koordinat pengguna dan koordinat titik kantor.</p>
            </div>
            <div key={4} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                5
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem memverifikasi apakah jarak berada dalam radius maksimum Geo-fencing.</p>
            </div>
            <div key={5} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                6
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mencatat transaksi presensi ke basis data dan menampilkan status sukses.</p>
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
              <span className="leading-relaxed">Radius maksimum Geo-fencing ditetapkan sejauh 100 meter dari titik pusat koordinat kantor.</span>
            </div>
            <div key={1} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Pengguna wajib mengaktifkan akurasi GPS tinggi pada perangkat seluler.</span>
            </div>
            <div key={2} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Percobaan presensi ditolak jika terdeteksi menggunakan aplikasi tiruan lokasi palsu.</span>
            </div>
            <div key={3} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Setiap karyawan hanya dapat melakukan satu kali pencatatan presensi masuk per hari.</span>
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
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">POST /api/attendance/clock-in</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 font-mono">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Tabel Database</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-emerald-400">
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.attendance_logs</div><div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.office_locations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
