"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function LoginScreen() {
  const { login } = useMobileApp();
  const [email, setEmail] = useState("aditya@nusantara.co.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-8">
      {/* Top Brand Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-[#0C2B22] tracking-tight">
            hadir.
          </h1>
          <div>
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7A57] bg-[#E8F6ED] rounded-md border border-[#D5EEDC]">
              HR & PRESENSI
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="space-y-2 pt-2">
          <h2 className="text-[28px] font-extrabold text-slate-900 leading-[1.2] tracking-tight">
            Hari produktif
            <br />
            dimulai di sini.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
            Informasi kerja dan presensi Anda, dalam satu genggaman.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email perusahaan
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-13 px-4 rounded-2xl bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] focus:ring-2 focus:ring-[#0D7A57]/10 transition-all shadow-2xs"
              placeholder="nama@nusantara.co.id"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-13 px-4 pr-12 rounded-2xl bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] focus:ring-2 focus:ring-[#0D7A57]/10 transition-all shadow-2xs"
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

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-13 rounded-2xl bg-[#0D7A57] hover:bg-[#0A6447] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              Masuk ke akun
            </button>
          </div>
        </form>

        {/* Demo note */}
        <div className="flex items-center gap-2 pt-1 text-slate-500 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Akun demo • data contoh • tanpa input nyata</span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-6 text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          PT Nusantara Digital / Employee workspace
        </p>
      </div>
    </div>
  );
}
