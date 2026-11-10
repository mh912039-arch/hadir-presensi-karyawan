"use client";

import React, { useState } from "react";
import { ChevronLeft, ShieldCheck, AlertTriangle, LocateFixed, WifiOff } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { LocationMapWidget } from "@/components/mobile/LocationMapWidget";

export function PresensiGpsScreen() {
  const {
    gps,
    toggleGpsEnabled,
    toggleGpsLocation,
    requestRealBrowserGps,
    confirmAttendance,
    setCurrentView,
  } = useMobileApp();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleBack = () => {
    setCurrentView("main");
  };

  const handleActionClick = () => {
    if (!gps.isGpsEnabled) {
      setErrorMessage("Sensor GPS tidak aktif! Nyalakan izin lokasi pada HP Anda terlebih dahulu.");
      return;
    }

    if (!gps.isInsideOffice) {
      setErrorMessage("Presensi ditolak! Posisi Anda masih di luar radius 100m UNPAM Viktor 2.");
      return;
    }

    const res = confirmAttendance();
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  const handleDetectRealGps = async () => {
    setIsLocating(true);
    setErrorMessage(null);
    const res = await requestRealBrowserGps();
    setIsLocating(false);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 flex flex-col justify-between no-scrollbar">
      <div className="space-y-4">
        {/* Top Bar with Back Button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/70 flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-2xs active:scale-95 transition-all cursor-pointer"
            aria-label="Kembali ke beranda"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Presensi masuk
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pastikan GPS aktif dan posisi Anda berada di UNPAM Viktor 2.
            </p>
          </div>
        </div>

        {/* Map Simulation Widget */}
        <LocationMapWidget
          isInsideOffice={gps.isInsideOffice}
          distanceMeters={gps.distanceMeters}
          maxRadiusMeters={gps.maxRadiusMeters}
          isGpsEnabled={gps.isGpsEnabled}
        />

        {/* GPS Sensor & Location Status Banner */}
        {!gps.isGpsEnabled ? (
          <div className="rounded-2xl bg-red-50 border-2 border-red-300 p-4 flex items-start gap-3 transition-all duration-200 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-red-800">
                Sensor GPS HP Tidak Aktif!
              </h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Anda tidak dapat melakukan presensi tanpa mengaktifkan sensor lokasi GPS pada perangkat.
              </p>
            </div>
          </div>
        ) : gps.isInsideOffice ? (
          <div className="rounded-2xl bg-[#EAF6EE] border border-[#CDE8D7] p-4 flex items-start gap-3 transition-all duration-200">
            <ShieldCheck className="w-5 h-5 text-[#0D7A57] shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#0D7A57]">
                Anda berada di area UNPAM Viktor 2
              </h4>
              <p className="text-xs text-[#0D7A57]/90">
                Jarak {gps.distanceMeters} m • Akurasi GPS ±{gps.accuracyMeters} m (Sah)
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#FDF1F0] border border-[#F9D5D3] p-4 flex items-start gap-3 transition-all duration-200">
            <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2.2} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#DC2626]">
                Anda di luar area UNPAM Viktor 2
              </h4>
              <p className="text-xs text-[#DC2626]/90">
                Jarak {gps.distanceMeters} m • Batas maksimal radius {gps.maxRadiusMeters} m
              </p>
            </div>
          </div>
        )}

        {/* Error Notification if action blocked */}
        {errorMessage && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Office & Time Info */}
        <div className="space-y-2 pt-0.5">
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

        {/* GPS Control Toggles for Presenting Scenarios */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/60 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
            <span>Uji Coba Sensor GPS:</span>
            <button
              type="button"
              onClick={handleDetectRealGps}
              disabled={isLocating}
              className="text-[#0D7A57] hover:underline flex items-center gap-1 font-bold text-[10px]"
            >
              <LocateFixed className="w-3 h-3" />
              <span>{isLocating ? "mendeteksi..." : "cek gps asli"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                toggleGpsEnabled(!gps.isGpsEnabled);
                setErrorMessage(null);
              }}
              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !gps.isGpsEnabled
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-slate-200 text-slate-700"
              }`}
            >
              {gps.isGpsEnabled ? "Simulasi: Matikan GPS" : "Nyalakan GPS"}
            </button>

            <button
              type="button"
              disabled={!gps.isGpsEnabled}
              onClick={() => {
                toggleGpsLocation(!gps.isInsideOffice);
                setErrorMessage(null);
              }}
              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                !gps.isGpsEnabled
                  ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-400"
                  : gps.isInsideOffice
                  ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  : "bg-[#0D7A57] text-white cursor-pointer"
              }`}
            >
              {gps.isInsideOffice ? "Simulasi: Luar Area" : "Kembali ke Viktor 2"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="space-y-3 pt-4">
        {!gps.isGpsEnabled ? (
          <button
            type="button"
            disabled
            className="w-full h-13 rounded-2xl bg-slate-200 text-slate-400 text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed shadow-none"
          >
            <WifiOff className="w-4 h-4" />
            <span>Nyalakan GPS untuk Presensi</span>
          </button>
        ) : gps.isInsideOffice ? (
          <button
            type="button"
            onClick={handleActionClick}
            className="w-full h-13 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
          >
            Konfirmasi presensi masuk
          </button>
        ) : (
          <button
            type="button"
            onClick={handleActionClick}
            className="w-full h-13 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
          >
            Di Luar Jangkauan (Perbarui Lokasi)
          </button>
        )}
      </div>
    </div>
  );
}
