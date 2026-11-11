"use client";

import React, { useState } from "react";
import { Check, X, Clock, Calendar, User, Bell } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { LeaveRequest } from "@/types/mobile";

export function AdminLeaveApproval() {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest, switchRole } = useMobileApp();
  const [filter, setFilter] = useState<"all" | "menunggu" | "disetujui" | "ditolak">("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingCount = leaveRequests.filter((r) => r.status === "menunggu").length;
  const approvedCount = leaveRequests.filter((r) => r.status === "disetujui").length;
  const rejectedCount = leaveRequests.filter((r) => r.status === "ditolak").length;

  const filteredRequests = leaveRequests.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const handleApprove = (req: LeaveRequest) => {
    approveLeaveRequest(req.id);
    setActionNotice(`Pengajuan cuti "${req.employeeName}" disetujui! Notifikasi otomatis terkirim ke HP karyawan.`);
  };

  const handleReject = (req: LeaveRequest) => {
    rejectLeaveRequest(req.id);
    setActionNotice(`Pengajuan cuti "${req.employeeName}" ditolak. Notifikasi otomatis terkirim ke HP karyawan.`);
  };

  return (
    <div className="space-y-4">
      {/* Live Notification Sent Notice */}
      {actionNotice && (
        <div className="p-3 bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl flex items-center justify-between text-xs text-[#0D7A57] animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0D7A57] shrink-0" />
            <span className="font-semibold">{actionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => switchRole("karyawan")}
            className="px-2.5 py-1 bg-[#0D7A57] text-white rounded-lg text-[11px] font-bold shadow-2xs hover:bg-[#0A6447] active:scale-95 shrink-0 ml-2 cursor-pointer"
          >
            Lihat di HP
          </button>
        </div>
      )}
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-center">
          <span className="text-xl font-extrabold text-amber-800 block">
            {pendingCount}
          </span>
          <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-tight">
            Menunggu
          </span>
        </div>
        <div className="bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl p-3 text-center">
          <span className="text-xl font-extrabold text-[#0D7A57] block">
            {approvedCount}
          </span>
          <span className="text-[10px] font-semibold text-[#0D7A57] uppercase tracking-tight">
            Disetujui
          </span>
        </div>
        <div className="bg-slate-100 border border-slate-200/70 rounded-2xl p-3 text-center">
          <span className="text-xl font-extrabold text-slate-700 block">
            {rejectedCount}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
            Ditolak
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {(
          [
            { key: "all", label: "Semua" },
            { key: "menunggu", label: `Menunggu (${pendingCount})` },
            { key: "disetujui", label: "Disetujui" },
            { key: "ditolak", label: "Ditolak" },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filter === item.key
                ? "bg-[#0D7A57] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Leave Request List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 space-y-1">
            <p className="text-xs font-semibold text-slate-700">
              Tidak ada pengajuan cuti
            </p>
            <p className="text-[11px] text-slate-400">
              Semua permohonan cuti pada kategori ini sudah selesai ditinjau.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3 transition-all"
            >
              {/* Employee & Status Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F6ED] flex items-center justify-center text-[#0D7A57] font-bold text-xs shrink-0">
                    {req.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {req.employeeName}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      NIP {req.nip} • {req.position}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                {req.status === "menunggu" && (
                  <span className="px-2.5 py-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg shrink-0">
                    Menunggu
                  </span>
                )}
                {req.status === "disetujui" && (
                  <span className="px-2.5 py-1 text-[10px] font-bold text-[#0D7A57] bg-[#E8F6ED] border border-[#D5EEDC] rounded-lg shrink-0">
                    Disetujui
                  </span>
                )}
                {req.status === "ditolak" && (
                  <span className="px-2.5 py-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200/80 rounded-lg shrink-0">
                    Ditolak
                  </span>
                )}
              </div>

              {/* Leave Details */}
              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {req.leaveType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {req.requestNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {req.date} ({req.duration})
                  </span>
                </div>
                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400 text-[11px] block">Alasan:</span>
                  <p className="text-slate-700 text-xs mt-0.5 italic">
                    "{req.reason}"
                  </p>
                </div>
              </div>

              {/* Action Buttons (Approve / Reject) */}
              {req.status === "menunggu" ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleReject(req)}
                    className="h-9 px-3 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <X className="w-4 h-4" />
                    <span>Tolak</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(req)}
                    className="h-9 px-3 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    <span>Beri Izin / Setujui</span>
                  </button>
                </div>
              ) : (
                <div className="pt-0.5 text-right">
                  <span className="text-[10px] text-slate-400">
                    Diproses oleh {req.approver} (HR Manager)
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
