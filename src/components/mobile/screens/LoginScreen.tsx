"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Shield,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function LoginScreen() {
  const {
    login,
    loginAsAdmin,
    loginError,
    setLoginError,
  } = useMobileApp();

  const [selectedRole, setSelectedRole] = useState<"karyawan" | "admin">("karyawan");
  const [email, setEmail] = useState("aditya@nusantara.co.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (role: "karyawan" | "admin") => {
    setSelectedRole(role);
    setLoginError(null);
    if (role === "admin") {
      setEmail("admin@nusantara.co.id");
      setPassword("admin123");
    } else {
      setEmail("aditya@nusantara.co.id");
      setPassword("password123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "admin") {
      loginAsAdmin();
    } else {
      login(email, password);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 max-w-sm mx-auto w-full min-h-[100dvh]">
      {/* Brand Header: Hanya hadir. */}
      <div className="text-center space-y-1.5 pt-4">
        <h1 className="text-4xl font-extrabold text-[#0C2B22] tracking-tight">
          hadir.
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Presensi &amp; Kepegawaian Digital
        </p>
      </div>

      {/* Main Form Section */}
      <div className="space-y-4.5 my-auto py-6">
        {/* Error Notification Message */}
        {loginError && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-3.5 space-y-1 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Login Gagal</span>
            </div>
            <p className="text-[11px] text-red-700 leading-relaxed pl-6">
              {loginError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kolom Login (Email / NIP) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email atau NIP
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12.5 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
              placeholder={selectedRole === "admin" ? "admin@nusantara.co.id" : "nama@nusantara.co.id"}
              required
            />
          </div>

          {/* Kolom Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12.5 px-4 pr-12 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
                placeholder="Masukkan kata sandi"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
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

          {/* Pilihan Peran: Karyawan atau Admin */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-700">
              Pilihan peran masuk
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => handleRoleChange("karyawan")}
                className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedRole === "karyawan"
                    ? "bg-[#0D7A57] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Karyawan</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedRole === "admin"
                    ? "bg-[#0C2B22] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full h-12.5 rounded-2xl text-white text-xs font-bold shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                selectedRole === "admin"
                  ? "bg-[#0C2B22] hover:bg-[#12382D]"
                  : "bg-[#0D7A57] hover:bg-[#0A6447]"
              }`}
            >
              <span>
                Masuk sebagai {selectedRole === "admin" ? "Admin HR" : "Karyawan"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
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
