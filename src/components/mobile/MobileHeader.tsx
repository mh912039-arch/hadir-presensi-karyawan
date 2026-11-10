"use client";

import React from "react";
import { Battery, Wifi } from "lucide-react";

interface MobileHeaderProps {
  showBrand?: boolean;
  roleBadgeText?: string;
}

export function MobileHeader({
  showBrand = true,
  roleBadgeText = "KARYAWAN",
}: MobileHeaderProps) {
  return (
    <div className="w-full shrink-0 pt-3 pb-2 px-6">
      {/* iOS Style Status Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 tracking-tight pb-3">
        <span className="text-[13px] font-bold">9:41</span>
        <div className="flex items-center gap-1.5 text-slate-800">
          <span className="text-[11px] font-bold tracking-tighter">5G</span>
          <div className="flex items-center gap-0.5">
            <div className="w-[20px] h-[10px] border border-slate-700 rounded-[3px] p-[1px] flex items-center">
              <div className="bg-slate-900 h-full w-full rounded-[1.5px]" />
            </div>
            <div className="w-[1px] h-[4px] bg-slate-700 rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* Brand & Role Badge Header */}
      {showBrand && (
        <div className="flex items-center justify-between pt-1 pb-1">
          <h1 className="text-3xl font-extrabold text-[#0C2B22] tracking-tight">
            hadir.
          </h1>
          {roleBadgeText && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] bg-[#E8F6ED] rounded-md border border-[#D5EEDC]">
              {roleBadgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
