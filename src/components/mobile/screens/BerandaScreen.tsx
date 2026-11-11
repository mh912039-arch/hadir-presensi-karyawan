"use client";

import React from "react";
import { MapPin, Calendar, FileText, ChevronRight, CheckCircle2, XCircle, X } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function BerandaScreen() {
  const {
    user,
    hasClockedIn,
    clockInTime,
    remainingLeaveDays,
    setCurrentView,
    setActiveTab,
    isOffline,
    notifications,
    markNotificationAsRead,
  } = useMobileApp();

  const latestLeaveNotif = notifications.find(
    (n) =>
      !n.read &&
      (n.recipientNip === user.nip || n.recipientNip === "all") &&
      (n.type === "leave_approved" || n.type === "leave_rejected")
  );

  const handlePresensiClick = () => {
    if (!hasClockedIn) {
      setCurrentView("presensi_gps");
    }
  };

  const handleAjukanCutiClick = () => {
    setActiveTab("cuti");
    setCurrentView("pengajuan_cuti");
  };

  const handleDataKepegawaianClick = () => {
    setActiveTab("profil");
    setCurrentView("main");
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-6 no-scrollbar">
      {/* Offline Mode Alert banner if simulated offline */}
      {isOffline && (
        <div className="px-3 py-2 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-800 text-xs flex items-center justify-between">
          <span>Mode Offline aktif • Data presensi masuk ke antrean lokal</span>
          <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded font-bold">
            P1
          </span>
        </div>
      )}

      {/* Greeting Header */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">
          Senin, 9 November 2026
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Selamat pagi, {user.name.split(" ")[0]}
        </h2>
        <p className="text-xs text-slate-500">
          {user.role} • {user.division.startsWith("Divisi") ? user.division : `Divisi ${user.division}`}
        </p>
      </div>

      {/* Leave Decision Notification Alert Card */}
      {latestLeaveNotif && (
        <div
          className={`p-3.5 rounded-2xl border transition-all animate-in fade-in duration-200 space-y-2.5 ${
            latestLeaveNotif.type === "leave_approved"
              ? "bg-[#E8F6ED] border-[#D5EEDC]"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  latestLeaveNotif.type === "leave_approved"
                    ? "bg-white text-[#0D7A57] shadow-2xs"
                    : "bg-white text-red-600 shadow-2xs"
                }`}
              >
                {latestLeaveNotif.type === "leave_approved" ? (
                  <CheckCircle2 className="w-4 h-4" strokeWidth={2.2} />
                ) : (
                  <XCircle className="w-4 h-4" strokeWidth={2.2} />
                )}
              </div>
              <div className="space-y-0.5">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                    latestLeaveNotif.type === "leave_approved"
                      ? "text-[#0D7A57]"
                      : "text-red-700"
                  }`}
                >
                  PEMBERITAHUAN HR
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {latestLeaveNotif.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {latestLeaveNotif.message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => markNotificationAsRead(latestLeaveNotif.id)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 cursor-pointer"
              title="Tutup pemberitahuan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/50">
            <button
              type="button"
              onClick={() => markNotificationAsRead(latestLeaveNotif.id)}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Tandai Dibaca
            </button>
            <button
              type="button"
              onClick={() => {
                markNotificationAsRead(latestLeaveNotif.id);
                setActiveTab("cuti");
                setCurrentView("pengajuan_cuti");
              }}
              className="px-3 py-1 rounded-lg bg-[#0D7A57] text-white text-[11px] font-bold shadow-2xs hover:bg-[#0A6447] active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Menu Cuti</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Hero Card (Dark Forest Green) */}
      <div className="rounded-[26px] bg-[#0C2B22] p-5.5 text-white shadow-md border border-white/5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#98C2B0]">
            PRESENSI HARI INI
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white">
            {hasClockedIn ? "Selamat bekerja!" : "Siap memulai hari?"}
          </h3>
          <p className="text-xs text-slate-300">
            Shift reguler • 08.00 – 17.00 WIB
          </p>
        </div>

        <div className="border-t border-white/10 pt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Masuk</span>
              <span
                className={`text-2xl font-bold tracking-tight ${
                  hasClockedIn ? "text-white" : "text-slate-300 font-mono"
                }`}
              >
                {hasClockedIn ? clockInTime : "-- : --"}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Pulang</span>
              <span className="text-2xl font-bold tracking-tight text-slate-300 font-mono">
                -- : --
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {!hasClockedIn ? (
            <button
              type="button"
              onClick={handlePresensiClick}
              className="w-full h-12 rounded-2xl bg-[#D5F2C8] hover:bg-[#C9EEB9] active:scale-[0.98] text-[#0A3A29] text-sm font-bold shadow-xs transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              Presensi masuk
            </button>
          ) : (
            <div className="w-full h-12 rounded-2xl bg-[#163B2F] border border-[#234F40] text-[#7E9F93] text-xs font-semibold flex items-center justify-center select-none">
              Presensi pulang mulai 17.00
            </div>
          )}
        </div>
      </div>

      {/* Location Status Under Card */}
      <div className="flex items-center gap-2 text-xs text-slate-600 pl-1">
        <MapPin className="w-4 h-4 text-[#0D7A57] shrink-0" />
        <span>
          {hasClockedIn
            ? "Masuk tercatat • UNPAM Viktor 2"
            : "UNPAM Viktor 2 • Radius presensi 100 m"}
        </span>
      </div>

      {/* Section: Ruang Karyawan */}
      <div className="space-y-3 pt-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Ruang karyawan
        </h3>

        <div className="space-y-2.5">
          {/* Card: Ajukan Cuti */}
          <button
            type="button"
            onClick={handleAjukanCutiClick}
            className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F6ED] flex items-center justify-center text-[#0D7A57] shrink-0">
                <Calendar className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D7A57] transition-colors">
                  Ajukan cuti
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sisa cuti {remainingLeaveDays} hari
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

          {/* Card: Data Kepegawaian */}
          <button
            type="button"
            onClick={handleDataKepegawaianClick}
            className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F6ED] flex items-center justify-center text-[#0D7A57] shrink-0">
                <FileText className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D7A57] transition-colors">
                  Data kepegawaian
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lihat informasi pribadi
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
