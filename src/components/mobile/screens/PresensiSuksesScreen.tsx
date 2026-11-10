"use client";

import React from "react";
import { Check } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function PresensiSuksesScreen() {
  const { setCurrentView, setActiveTab, clockInTime } = useMobileApp();

  const handleReturnHome = () => {
    setActiveTab("beranda");
    setCurrentView("main");
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 flex flex-col justify-between no-scrollbar">
      {/* Brand Header */}
      <div className="text-center pt-2">
        <h1 className="text-3xl font-extrabold text-[#0C2B22] tracking-tight">
          hadir.
        </h1>
      </div>

      {/* Main Success Content */}
      <div className="space-y-6 my-auto py-4">
        {/* Animated Checkmark Circle */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#E8F6ED] border-4 border-white shadow-sm flex items-center justify-center animate-in zoom-in-95 duration-200">
            <Check className="w-10 h-10 text-[#0D7A57]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Success Title */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Presensi berhasil!
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
            Anda datang tepat waktu.
            <br />
            Selamat memulai hari yang produktif.
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] block">
            PRESENSI MASUK
          </span>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Waktu</span>
              <span className="font-bold text-slate-900">{clockInTime} WIB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tanggal</span>
              <span className="font-medium text-slate-800">9 November 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lokasi</span>
              <span className="font-medium text-slate-800">UNPAM Viktor 2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Validasi GPS</span>
              <span className="font-medium text-slate-800">Dalam radius • 18 m</span>
            </div>
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
          Lokasi dan waktu pada prototype adalah simulasi.
        </p>
      </div>
    </div>
  );
}
