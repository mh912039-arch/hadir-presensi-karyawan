"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function ProfilScreen() {
  const { user, logout, setActiveTab, setCurrentView } = useMobileApp();

  const handleBack = () => {
    setActiveTab("beranda");
    setCurrentView("main");
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
            Profil karyawan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Informasi kepegawaian Anda.
          </p>
        </div>
      </div>

      {/* Main Employee ID Card (Dark Forest Green) */}
      <div className="rounded-[26px] bg-[#0C2B22] p-5.5 text-white shadow-md border border-white/5 space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
          {user.companyName.toUpperCase()}
        </span>

        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {user.name}
          </h3>
          <div className="flex items-end justify-between mt-1">
            <div>
              <p className="text-xs text-slate-300 font-medium">
                {user.division.replace("Divisi ", "")} • Product Designer
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                NIP {user.nip}
              </p>
            </div>
            <span className="px-3.5 py-1 text-xs font-bold text-[#0A3A29] bg-[#D5F2C8] rounded-xl">
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Section: Informasi Pekerjaan */}
      <div className="space-y-2.5 pt-1">
        <h4 className="text-sm font-bold text-slate-900">
          Informasi pekerjaan
        </h4>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Divisi</span>
            <span className="font-semibold text-slate-900">Teknologi</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Status kerja</span>
            <span className="font-semibold text-slate-900">{user.employmentStatus}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Bergabung</span>
            <span className="font-semibold text-slate-900">{user.joinDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Lokasi kerja</span>
            <span className="font-semibold text-slate-900">{user.workLocation}</span>
          </div>
        </div>
      </div>

      {/* Section: Kontak Pribadi */}
      <div className="space-y-2.5 pt-1">
        <h4 className="text-sm font-bold text-slate-900">
          Kontak pribadi
        </h4>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs space-y-1 text-xs">
          <span className="text-slate-500 block">Email perusahaan</span>
          <span className="font-semibold text-slate-900 block">{user.email}</span>
        </div>
      </div>

      {/* Keluar dari Akun */}
      <div className="pt-2">
        <button
          type="button"
          onClick={logout}
          className="text-xs font-semibold text-red-600 hover:text-red-700 active:underline transition-colors cursor-pointer"
        >
          Keluar dari akun
        </button>
      </div>
    </div>
  );
}
