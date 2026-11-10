"use client";

import React from "react";

interface MobileHeaderProps {
  showBrand?: boolean;
  roleBadgeText?: string;
}

export function MobileHeader({
  showBrand = true,
  roleBadgeText = "KARYAWAN",
}: MobileHeaderProps) {
  if (!showBrand) return null;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8FAF9]/95 backdrop-blur-md px-5 pt-4 pb-2.5 flex items-center justify-between border-b border-slate-100/60 shrink-0">
      <h1 className="text-2xl font-extrabold text-[#0C2B22] tracking-tight">
        hadir.
      </h1>
      {roleBadgeText && (
        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] bg-[#E8F6ED] rounded-md border border-[#D5EEDC]">
          {roleBadgeText}
        </span>
      )}
    </header>
  );
}
