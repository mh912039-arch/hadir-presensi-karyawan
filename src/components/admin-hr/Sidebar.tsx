"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, LogOut } from "lucide-react";

export function AdminHrSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800 bg-zinc-950 px-4 py-5">
      <div className="flex items-center gap-3 px-2 pb-5 border-b border-zinc-800/80">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
          A
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate">Sistem Informasi Kepegawaian & Presensi Karyawan</span>
          <span className="text-[10px] text-blue-400 font-mono">Portal Admin HR</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        <Link
          href="/admin-hr"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-900 transition"
        >
          <Layers className="h-4 w-4 text-zinc-400" />
          <span>Dashboard Admin HR</span>
        </Link>
        
        <Link
          href="/admin-hr/autentikasi-multi-role"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition"
        >
          <span className="truncate">Autentikasi Multi-Role</span>
        </Link>
        <Link
          href="/admin-hr/manajemen-jam-kerja-fixed-shift"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition"
        >
          <span className="truncate">Manajemen Jam Kerja Fixed Shift</span>
        </Link>
      </div>

      <div className="border-t border-zinc-800/80 pt-4 px-2">
        <Link href="/" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition">
          <LogOut className="h-3.5 w-3.5" />
          <span>Ganti Portal</span>
        </Link>
      </div>
    </aside>
  );
}
