"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, Calendar } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function PengajuanCutiScreen() {
  const {
    remainingLeaveDays,
    submitLeaveRequest,
    setCurrentView,
    setActiveTab,
  } = useMobileApp();

  const [leaveType, setLeaveType] = useState("Cuti tahunan");
  const [leaveDate, setLeaveDate] = useState("13 November 2026");
  const [reason, setReason] = useState("Keperluan keluarga.");

  const handleBack = () => {
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLeaveRequest(leaveType, leaveDate, reason);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 flex flex-col justify-between no-scrollbar">
      <div className="space-y-5">
        {/* Top Header */}
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
              Pengajuan cuti
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rencanakan waktu istirahat Anda.
            </p>
          </div>
        </div>

        {/* Quota Banner */}
        <div className="bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#0D7A57] block">
              Sisa cuti tahunan
            </span>
            <span className="text-2xl font-extrabold text-slate-900 block mt-0.5">
              {remainingLeaveDays} hari
            </span>
          </div>
          <span className="text-xs font-semibold text-[#0D7A57] self-end mb-1">
            Periode 2026
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            FORM DEMO • SUDAH DIISI
          </span>

          {/* Jenis Cuti Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Jenis cuti
            </label>
            <div className="relative">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full h-13 px-4 pr-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 appearance-none focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs cursor-pointer"
              >
                <option value="Cuti tahunan">Cuti tahunan</option>
                <option value="Cuti sakit">Cuti sakit</option>
                <option value="Cuti keperluan penting">Cuti keperluan penting</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tanggal Cuti */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Tanggal cuti
            </label>
            <div className="relative">
              <input
                type="text"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                className="w-full h-13 px-4 pr-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-xs font-medium text-[#0D7A57] block pl-1">
              Durasi: 1 hari kerja
            </span>
          </div>

          {/* Alasan Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Alasan
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs resize-none"
            />
          </div>

          <p className="text-xs text-slate-500 pl-1">
            Persetujuan oleh Rina Wijaya • HR Manager
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-13 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              Kirim pengajuan cuti
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-[11px] text-slate-400 pt-4">
        Saldo dipotong setelah pengajuan disetujui.
      </p>
    </div>
  );
}
