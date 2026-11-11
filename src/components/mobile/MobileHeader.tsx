"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

interface MobileHeaderProps {
  showBrand?: boolean;
  roleBadgeText?: string;
}

export function MobileHeader({
  showBrand = true,
  roleBadgeText = "KARYAWAN",
}: MobileHeaderProps) {
  const { unreadNotificationCount, setIsNotificationCenterOpen } = useMobileApp();

  if (!showBrand) return null;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8FAF9]/95 backdrop-blur-md px-5 pt-4 pb-2.5 flex items-center justify-between border-b border-slate-100/60 shrink-0">
      <h1 className="text-2xl font-extrabold text-[#0C2B22] tracking-tight">
        hadir.
      </h1>

      <div className="flex items-center gap-2">
        {roleBadgeText && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] bg-[#E8F6ED] rounded-md border border-[#D5EEDC]">
            {roleBadgeText}
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsNotificationCenterOpen(true)}
          className="relative w-8.5 h-8.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#0D7A57] shadow-2xs transition-all active:scale-95 cursor-pointer"
          aria-label="Pusat Notifikasi"
          title="Buka notifikasi"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white animate-pulse">
              {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
