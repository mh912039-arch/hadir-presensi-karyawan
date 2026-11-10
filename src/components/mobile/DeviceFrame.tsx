"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Maximize2,
  RotateCcw,
  Wifi,
  WifiOff,
  Download,
  ArrowUpRight,
  Share2,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { HadirMobileApp } from "@/components/mobile/HadirMobileApp";

const presetList = [
  { id: 1, label: "01 Masuk" },
  { id: 2, label: "02 Beranda" },
  { id: 3, label: "03 Presensi GPS" },
  { id: 4, label: "04 Luar Jangkauan" },
  { id: 5, label: "05 Presensi Sukses" },
  { id: 6, label: "06 Beranda (Clocked-in)" },
  { id: 7, label: "07 Riwayat" },
  { id: 8, label: "08 Form Cuti" },
  { id: 9, label: "09 Cuti Terkirim" },
  { id: 10, label: "10 Profil" },
  { id: 11, label: "11 Riwayat (Updated)" },
];

export function DeviceFrame() {
  const {
    activePresetNumber,
    jumpToPreset,
    resetToDefault,
    isOffline,
    toggleOfflineMode,
    localQueue,
    syncLocalQueue,
  } = useMobileApp();

  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const handleDownloadAppClick = () => {
    if (typeof window !== "undefined") {
      alert(
        "Cara Download di Chrome (PWA):\n\n" +
          "1. Di Chrome (HP atau Laptop), perhatikan ikon Install / Download di bilah alamat (URL bar) atau menu titik tiga (⋮) di kanan atas.\n" +
          "2. Pilih 'Install hadir.' atau 'Tambahkan ke Layar Utama (Add to Home screen)'.\n" +
          "3. Aplikasi akan langsung ter-download dan terpasang di HP Anda layaknya aplikasi resmi dari Play Store tanpa perlu buka browser lagi!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1318] text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6 overflow-x-hidden selection:bg-[#0D7A57] selection:text-white">
      {/* Top Floating Control Bar */}
      <header className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0D7A57] flex items-center justify-center font-bold text-white shadow-xs">
            h.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">
                hadir. Mobile App
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8F6ED] text-[#0D7A57]">
                PWA Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sistem Informasi Kepegawaian & Presensi Karyawan
            </p>
          </div>
        </div>

        {/* Center / Right Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download in Chrome Button */}
          <button
            type="button"
            onClick={handleDownloadAppClick}
            className="px-3 py-1.5 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-95 text-white flex items-center gap-1.5 font-bold transition-all cursor-pointer shadow-xs"
            title="Download aplikasi ke Chrome / Layar Utama HP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download di Chrome</span>
          </button>

          {/* Offline / Local Queue Switcher (PRD Feature P1) */}
          <button
            type="button"
            onClick={() => toggleOfflineMode()}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
              isOffline
                ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white"
            }`}
            title="Simulasikan jaringan offline / online (Local Queue)"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Offline ({localQueue.length} Queue)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Online</span>
              </>
            )}
          </button>

          {/* Sync Button if queue has items */}
          {localQueue.length > 0 && !isOffline && (
            <button
              type="button"
              onClick={syncLocalQueue}
              className="px-2.5 py-1.5 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] text-white font-semibold transition-all cursor-pointer flex items-center gap-1 animate-pulse"
            >
              Sinkronkan ({localQueue.length})
            </button>
          )}

          {/* Phone Frame Toggle */}
          <button
            type="button"
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white items-center gap-1.5 font-medium transition-all cursor-pointer"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Layar Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                <span>Frame HP</span>
              </>
            )}
          </button>

          {/* Reset Demo Button */}
          <button
            type="button"
            onClick={resetToDefault}
            className="p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Reset ke kondisi awal prototype"
            aria-label="Reset demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Portal Switcher Dropdown */}
          <Link
            href="/admin-hr"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 font-medium transition-all"
          >
            <span>Admin Portal</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* Preset Quick Jump Bar */}
      <div className="w-full max-w-4xl mb-6 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Preset Layar:
          </span>
          {presetList.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => jumpToPreset(preset.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activePresetNumber === preset.id
                  ? "bg-[#0D7A57] text-white shadow-xs font-semibold"
                  : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main App Container */}
      <main className="w-full flex justify-center items-center pb-8">
        {isPhoneFrame ? (
          /* Phone Frame Mockup (iPhone 16 Pro styling) */
          <div className="relative w-full max-w-[390px] h-[844px] bg-slate-900 rounded-[52px] p-[11px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] border-[3px] border-slate-800/90 flex flex-col overflow-hidden">
            {/* Dynamic Island Pill */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-40 flex items-center justify-between px-3 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900/60" />
            </div>

            {/* Glass Mobile Screen Viewport */}
            <div className="relative w-full h-full bg-[#F8FAF9] rounded-[42px] overflow-hidden flex flex-col shadow-inner">
              <HadirMobileApp />
            </div>
          </div>
        ) : (
          /* Responsive Fullscreen Card View */
          <div className="w-full max-w-[480px] min-h-[820px] bg-[#F8FAF9] rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col">
            <HadirMobileApp />
          </div>
        )}
      </main>

      {/* Bottom Notes & PRD Specs Checklist */}
      <footer className="w-full max-w-4xl border-t border-slate-800/80 pt-4 pb-2 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          Prototype hadir. HR & Presensi • Mata Kuliah SIM SMT 5 • PT Nusantara Digital
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>PWA Installable di Chrome</span>
          <span>•</span>
          <span>Haversine Formula (100m)</span>
          <span>•</span>
          <span>Offline Local Queue</span>
        </div>
      </footer>
    </div>
  );
}
