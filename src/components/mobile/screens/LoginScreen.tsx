"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  ArrowRight,
  MapPin,
  AlertTriangle,
  LocateFixed,
  WifiOff,
  Navigation,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function LoginScreen() {
  const {
    login,
    loginAsAdmin,
    gps,
    loginError,
    setLoginError,
    toggleGpsEnabled,
    toggleGpsLocation,
    requestRealBrowserGps,
  } = useMobileApp();

  const [email, setEmail] = useState("aditya@nusantara.co.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDetectRealLocation = async () => {
    setIsDetectingGps(true);
    const result = await requestRealBrowserGps();
    setIsDetectingGps(false);
    if (!result.success) {
      setLoginError(result.message);
    } else {
      setLoginError(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-8">
      {/* Top Brand Section */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-[#0C2B22] tracking-tight">
              hadir.
            </h1>
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] bg-[#E8F6ED] rounded-md border border-[#D5EEDC]">
              UNPAM VIKTOR 2
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Sistem Informasi Presensi • Universitas Pamulang
          </p>
        </div>

        {/* Hero Headline */}
        <div className="space-y-1 pt-1">
          <h2 className="text-[24px] font-extrabold text-slate-900 leading-[1.2] tracking-tight">
            Hari produktif
            <br />
            dimulai di UNPAM Viktor 2.
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Login hanya diizinkan di dalam radius 100 meter area UNPAM Viktor 2.
          </p>
        </div>

        {/* Real-time Geofence Status Badge for Login */}
        <div className="space-y-2">
          {!gps.isGpsEnabled ? (
            <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-3 flex items-start gap-2.5 transition-all">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-amber-900 block">
                  Sensor GPS HP Tidak Aktif
                </span>
                <p className="text-[11px] text-amber-800 leading-tight">
                  Nyalakan GPS pada perangkat untuk memvalidasi lokasi kampus Anda.
                </p>
              </div>
            </div>
          ) : gps.isInsideOffice ? (
            <div className="rounded-2xl bg-[#E8F6ED] border border-[#D5EEDC] p-3 flex items-center justify-between transition-all">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-xs">
                  <span className="font-bold text-[#0D7A57] block">
                    Area UNPAM Viktor 2
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Jarak: {gps.distanceMeters} m (Batas aman ≤ 100 m)
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold text-[#0D7A57] bg-white rounded-md border border-[#D5EEDC]">
                SIAP LOGIN
              </span>
            </div>
          ) : (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-3 flex items-start gap-2.5 transition-all">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-red-700 block">
                  Di Luar Area UNPAM Viktor 2
                </span>
                <p className="text-[11px] text-red-600 leading-tight">
                  Jarak terdeteksi {gps.distanceMeters} m (Maks 100m). Login akan ditolak!
                </p>
              </div>
            </div>
          )}

          {/* Quick Demo Location Toggles for Presenter/Evaluator */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-slate-600 font-semibold text-[10px] uppercase tracking-wider">
              <span>Uji Coba Skenario Lokasi:</span>
              <button
                type="button"
                onClick={handleDetectRealLocation}
                disabled={isDetectingGps}
                className="text-[#0D7A57] hover:underline flex items-center gap-1 font-bold lowercase"
              >
                <LocateFixed className="w-3 h-3" />
                <span>{isDetectingGps ? "mencari..." : "deteksi gps hp"}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  toggleGpsEnabled(true);
                  toggleGpsLocation(true);
                  setLoginError(null);
                }}
                className={`py-1 px-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  gps.isGpsEnabled && gps.isInsideOffice
                    ? "bg-[#0D7A57] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Di Dalam (18m)
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleGpsEnabled(true);
                  toggleGpsLocation(false);
                  setLoginError(null);
                }}
                className={`py-1 px-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  gps.isGpsEnabled && !gps.isInsideOffice
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Di Luar (320m)
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleGpsEnabled(!gps.isGpsEnabled);
                }}
                className={`py-1 px-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  !gps.isGpsEnabled
                    ? "bg-slate-800 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {gps.isGpsEnabled ? "Matikan GPS" : "GPS Mati (Aktif)"}
              </button>
            </div>
          </div>
        </div>

        {/* Login Error Notification Message */}
        {loginError && (
          <div className="rounded-2xl bg-red-50 border-2 border-red-300 p-3.5 space-y-1 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Login Ditolak Sistem</span>
            </div>
            <p className="text-[11px] text-red-700 leading-relaxed pl-6">
              {loginError}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Email perusahaan
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
              placeholder="nama@nusantara.co.id"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
                placeholder="Masukkan kata sandi"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-xs font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              Masuk ke akun
            </button>
          </div>
        </form>

        {/* Demo note */}
        <div className="flex items-center gap-2 pt-0.5 text-slate-500 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Akun demo • data contoh • radius UNPAM Viktor 2</span>
        </div>

        {/* Login Admin HR Section */}
        <div className="pt-3 border-t border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Portal Pengelola (Admin HR)</span>
            <span className="text-[10px] bg-[#E8F6ED] text-[#0D7A57] px-2 py-0.5 rounded font-bold uppercase">
              Admin
            </span>
          </div>

          <button
            type="button"
            onClick={loginAsAdmin}
            className="w-full h-12 rounded-2xl bg-[#0C2B22] hover:bg-[#12382D] active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all duration-150 flex items-center justify-between px-4 cursor-pointer border border-[#1A4537]"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#D5F2C8]" />
              <span>Masuk sebagai Admin HR</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D5F2C8]" />
          </button>
          <p className="text-[10px] text-slate-400 text-center">
            Kelola izin cuti, validasi presensi GPS &amp; data karyawan
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          PT Nusantara Digital • Kampus UNPAM Viktor 2
        </p>
      </div>
    </div>
  );
}
