/**
 * =========================================================================
 * MODUL: Autentikasi Multi-Role [P0]
 * PORTAL: Admin HR
 * =========================================================================
 * User Story:
 * Sebagai Admin HR, saya ingin melakukan login menggunakan kredensial terenkripsi agar dapat mengakses panel manajemen sistem kepegawaian dengan hak akses yang valid.
 *
 * Alur Kerja (Happy Path):
 *   1. Pengguna membuka halaman login dan memasukkan email serta kata sandi.
 *   2. Sistem mengirimkan permintaan verifikasi kredensial ke Supabase Auth.
 *   3. Supabase Auth memvalidasi hash password dan mengembalikan token JWT.
 *   4. Sistem membaca klaim peran pengguna dari token JWT.
 *   5. Sistem mengarahkan pengguna ke dasbor sesuai peran aktif secara otomatis.
 *
 * Aturan Bisnis & Validasi:
 *   - Kata sandi wajib memiliki panjang minimal 8 karakter dengan kombinasi huruf dan angka.
 *   - Sesi login otomatis kedaluwarsa setelah 8 jam tidak ada aktivitas.
 *   - Akun terkunci sementara selama 15 menit setelah 5 kali percobaan login gagal.
 *   - Token JWT wajib disertakan dalam setiap header permintaan API terproteksi.
 *
 * Tech Mapping:
 * - Endpoints: POST /api/auth/v1/token
 * - Tables: auth.users, public.user_profiles
 * =========================================================================
 */

import { CheckCircle2, ArrowLeft, Layers, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminHrAutentikasiMultiRolePage() {
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
            <h1 className="text-lg font-bold tracking-tight text-white">Autentikasi Multi-Role</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Sebagai Admin HR, saya ingin melakukan login menggunakan kredensial terenkripsi agar dapat mengakses panel manajemen sistem kepegawaian dengan hak akses yang valid.
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
              <p className="text-xs text-zinc-300 leading-relaxed">Pengguna membuka halaman login dan memasukkan email serta kata sandi.</p>
            </div>
            <div key={1} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                2
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mengirimkan permintaan verifikasi kredensial ke Supabase Auth.</p>
            </div>
            <div key={2} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                3
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Supabase Auth memvalidasi hash password dan mengembalikan token JWT.</p>
            </div>
            <div key={3} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                4
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem membaca klaim peran pengguna dari token JWT.</p>
            </div>
            <div key={4} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-[10px] font-bold text-blue-400 border border-blue-500/20">
                5
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">Sistem mengarahkan pengguna ke dasbor sesuai peran aktif secara otomatis.</p>
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
              <span className="leading-relaxed">Kata sandi wajib memiliki panjang minimal 8 karakter dengan kombinasi huruf dan angka.</span>
            </div>
            <div key={1} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Sesi login otomatis kedaluwarsa setelah 8 jam tidak ada aktivitas.</span>
            </div>
            <div key={2} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Akun terkunci sementara selama 15 menit setelah 5 kali percobaan login gagal.</span>
            </div>
            <div key={3} className="flex items-start gap-2.5 text-xs text-zinc-300 rounded-lg border border-zinc-800/60 bg-zinc-900/60 p-3">
              <span className="font-mono text-emerald-400 text-xs mt-0.5">•</span>
              <span className="leading-relaxed">Token JWT wajib disertakan dalam setiap header permintaan API terproteksi.</span>
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
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">POST /api/auth/v1/token</div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 font-mono">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Tabel Database</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-emerald-400">
            <div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">auth.users</div><div className="bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800/80">public.user_profiles</div>
          </div>
        </div>
      </div>
    </div>
  );
}
