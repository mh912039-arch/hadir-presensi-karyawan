"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function PengajuanCutiScreen() {
  const {
    user,
    remainingLeaveDays,
    leaveRequests,
    submitLeaveRequest,
    setCurrentView,
    setActiveTab,
  } = useMobileApp();

  const [leaveType, setLeaveType] = useState("Cuti tahunan");
  const [leaveDate, setLeaveDate] = useState("13 November 2026");
  const [reason, setReason] = useState("Keperluan keluarga.");

  const myRequests = leaveRequests.filter(
    (r) => r.nip === user.nip || r.employeeName === user.name
  );

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

        {/* Riwayat Status Pengajuan Cuti Saya */}
        {myRequests.length > 0 && (
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Status Pengajuan Cuti ({myRequests.length})
              </h3>
              <span className="text-[10px] text-slate-400">
                Pembaruan otomatis dari HR
              </span>
            </div>

            <div className="space-y-2">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {req.leaveType}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{req.date} ({req.duration})</span>
                      </p>
                    </div>

                    {req.status === "disetujui" && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-[#0D7A57] bg-[#E8F6ED] border border-[#D5EEDC] rounded-lg shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Disetujui HR</span>
                      </span>
                    )}

                    {req.status === "ditolak" && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200/80 rounded-lg shrink-0 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        <span>Ditolak HR</span>
                      </span>
                    )}

                    {req.status === "menunggu" && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Menunggu HR</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 bg-slate-50 rounded-xl p-2.5 italic">
                    "{req.reason}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-slate-400 pt-4">
        Saldo dipotong setelah pengajuan disetujui.
      </p>
    </div>
  );
}
