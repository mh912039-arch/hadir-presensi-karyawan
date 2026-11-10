import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminHrDashboardPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-xl font-bold text-white">Portal Akses & Manajemen Admin HR</h1>
        <p className="text-xs text-zinc-400 mt-1">Selamat datang di workspace Admin HR untuk Sistem Informasi Kepegawaian & Presensi Karyawan.</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">Modul Khusus Admin HR</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          
          <Link
            key="FEAT-01"
            href="/admin-hr/autentikasi-multi-role"
            className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-400 border border-blue-500/20">
                  P0
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition">Autentikasi Multi-Role</h3>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">Sebagai Admin HR, saya ingin melakukan login menggunakan kredensial terenkripsi agar dapat mengakses panel manajemen sistem kepegawaian dengan hak akses yang valid.</p>
            </div>
          </Link>
          <Link
            key="FEAT-02"
            href="/admin-hr/manajemen-jam-kerja-fixed-shift"
            className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-400 border border-blue-500/20">
                  P0
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition">Manajemen Jam Kerja Fixed Shift</h3>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">Sebagai Admin HR, saya ingin membuat dan menetapkan jadwal Fixed Shift harian agar jam masuk dan jam pulang baku karyawan tercatat secara konsisten di sistem.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
