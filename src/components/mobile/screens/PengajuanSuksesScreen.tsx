"use client";

import React from "react";
import { Check } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function PengajuanSuksesScreen() {
  const { setCurrentView, setActiveTab, latestLeaveRequest } = useMobileApp();

  const handleReturnHome = () => {
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const leaveType = latestLeaveRequest?.leaveType || "Cuti tahunan";
  const leaveDate = latestLeaveRequest?.date || "13 November 2026";
  const duration = latestLeaveRequest?.duration || "1 hari kerja";
  const approver = latestLeaveRequest?.approver || "Rina Wijaya";
  const requestNumber = latestLeaveRequest?.requestNumber || "CT-2026-0113";

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 flex flex-col justify-between no-scrollbar">
      {/* Top Header */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D7A57]">
          PENGAJUAN CUTI
        </span>
      </div>

      {/* Main Success Content */}
      <div className="space-y-6 my-auto py-3">
        {/* Animated Checkmark Circle */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#E8F6ED] border-4 border-white shadow-sm flex items-center justify-center animate-in zoom-in-95 duration-200">
            <Check className="w-10 h-10 text-[#0D7A57]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pengajuan terkirim
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[260px] mx-auto">
            Pengajuan Anda sudah diteruskan ke HR. Anda akan menerima hasil persetujuan.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] block">
            {leaveType.toUpperCase()}
          </span>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tanggal</span>
              <span className="font-bold text-slate-900">{leaveDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Durasi</span>
              <span className="font-medium text-slate-800">{duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Penyetuju</span>
              <span className="font-medium text-slate-800">{approver}</span>
            </div>
          </div>

          {/* Pending Approval Banner */}
          <div className="bg-[#FEF6E6] border border-[#FDE5B5] py-2.5 px-3 rounded-xl text-center">
            <span className="text-xs font-semibold text-[#8C5209]">
              Menunggu persetujuan HR
            </span>
          </div>
        </div>
      </div>

      {/* Button & Footnote */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleReturnHome}
          className="w-full h-13 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
        >
          Kembali ke beranda
        </button>

        <p className="text-center text-[11px] text-slate-400">
          No. pengajuan {requestNumber} • Data contoh
        </p>
      </div>
    </div>
  );
}
