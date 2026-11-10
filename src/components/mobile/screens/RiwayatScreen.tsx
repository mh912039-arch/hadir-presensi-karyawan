"use client";

import React from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function RiwayatScreen() {
  const {
    attendanceHistory,
    hadirCount,
    terlambatCount,
    cutiCount,
    setActiveTab,
    setCurrentView,
  } = useMobileApp();

  const handleBack = () => {
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "terlambat":
        return "text-[#B45309]"; // amber-700
      case "cuti":
      case "tepat_waktu":
      case "belum":
      default:
        return "text-[#0D7A57]"; // hadir emerald
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-5 no-scrollbar">
      {/* Header with Back Button */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/70 flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-2xs active:scale-95 transition-all cursor-pointer"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Riwayat kehadiran
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekap presensi dan aktivitas kerja Anda.
          </p>
        </div>
      </div>

      {/* Month Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-[#0D7A57]" />
          <span className="text-xs font-bold text-slate-900">
            November 2026
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">Bulan ini</span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Hadir */}
        <div className="bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl p-4 space-y-1">
          <span className="text-2xl font-extrabold text-[#0D7A57] block">
            {hadirCount}
          </span>
          <span className="text-xs font-medium text-slate-600 block">Hadir</span>
        </div>

        {/* Terlambat */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-2xl font-extrabold text-slate-900 block">
            {terlambatCount}
          </span>
          <span className="text-xs font-medium text-slate-500 block">
            Terlambat
          </span>
        </div>

        {/* Cuti */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-2xl font-extrabold text-slate-900 block">
            {cutiCount}
          </span>
          <span className="text-xs font-medium text-slate-500 block">Cuti</span>
        </div>
      </div>

      {/* Activity Log Section */}
      <div className="space-y-3 pt-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Aktivitas terbaru
        </h3>

        <div className="space-y-2.5">
          {attendanceHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {/* Date Square */}
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-800 leading-none">
                    {item.dateNumber}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                    {item.dayName}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.dateLabel}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {item.timeRange}
                  </p>
                </div>
              </div>

              {/* Status Badge Text */}
              <span
                className={`text-xs font-medium ${getStatusBadgeClass(
                  item.status
                )}`}
              >
                {item.statusLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
