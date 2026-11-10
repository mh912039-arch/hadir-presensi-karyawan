"use client";

import React from "react";
import { ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { LocationMapWidget } from "@/components/mobile/LocationMapWidget";

export function PresensiGpsScreen() {
  const {
    gps,
    toggleGpsLocation,
    confirmAttendance,
    setCurrentView,
  } = useMobileApp();

  const handleBack = () => {
    setCurrentView("main");
  };

  const handleActionClick = () => {
    if (gps.isInsideOffice) {
      confirmAttendance();
    } else {
      // Refresh location simulation
      toggleGpsLocation(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 flex flex-col justify-between no-scrollbar">
      <div className="space-y-5">
        {/* Top Bar with Back Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/70 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-2xs active:scale-95 transition-all cursor-pointer"
            aria-label="Kembali ke beranda"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Presensi masuk
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pastikan posisi Anda berada di area kantor.
            </p>
          </div>
        </div>

        {/* Map Simulation Widget */}
        <LocationMapWidget
          isInsideOffice={gps.isInsideOffice}
          distanceMeters={gps.distanceMeters}
          maxRadiusMeters={gps.maxRadiusMeters}
        />

        {/* GPS Status Banner */}
        {gps.isInsideOffice ? (
          <div className="rounded-2xl bg-[#EAF6EE] border border-[#CDE8D7] p-4 flex items-start gap-3 transition-all duration-200">
            <ShieldCheck className="w-5 h-5 text-[#0D7A57] shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#0D7A57]">
                Anda berada di area kantor
              </h4>
              <p className="text-xs text-[#0D7A57]/90">
                Jarak {gps.distanceMeters} m • Akurasi GPS ±{gps.accuracyMeters} m
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#FDF1F0] border border-[#F9D5D3] p-4 flex items-start gap-3 transition-all duration-200">
            <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#DC2626]">
                Anda di luar area kantor
              </h4>
              <p className="text-xs text-[#DC2626]/90">
                Jarak {gps.distanceMeters} m • Batas maksimal {gps.maxRadiusMeters} m
              </p>
            </div>
          </div>
        )}

        {/* Office & Time Info */}
        <div className="space-y-2 pt-1">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900">
              {gps.officeName}
            </h4>
            <p className="text-xs text-slate-500">
              {gps.officeAddress}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-600">
              {gps.currentDateString}
            </span>
            <span className="text-sm font-bold text-slate-900">
              {gps.currentTimeString}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button & Demo Switcher */}
      <div className="space-y-3 pt-6">
        <button
          type="button"
          onClick={handleActionClick}
          className="w-full h-13 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
        >
          {gps.isInsideOffice
            ? "Konfirmasi presensi masuk"
            : "Perbarui lokasi"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => toggleGpsLocation(!gps.isInsideOffice)}
            className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 transition-colors cursor-pointer"
          >
            {gps.isInsideOffice
              ? "Demo: uji lokasi di luar area"
              : "Demo: kembali ke area kantor"}
          </button>
        </div>
      </div>
    </div>
  );
}
