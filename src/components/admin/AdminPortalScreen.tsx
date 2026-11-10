"use client";

import React from "react";
import {
  FileCheck,
  MapPin,
  Users,
  LogOut,
  ArrowLeftRight,
  Shield,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { AdminTab } from "@/types/mobile";
import { AdminLeaveApproval } from "@/components/admin/AdminLeaveApproval";
import { AdminAttendanceMonitor } from "@/components/admin/AdminAttendanceMonitor";
import { AdminEmployeeManagement } from "@/components/admin/AdminEmployeeManagement";

export function AdminPortalScreen() {
  const {
    adminTab,
    setAdminTab,
    switchRole,
    leaveRequests,
    adminAttendanceLogs,
    employees,
  } = useMobileApp();

  const pendingLeaves = leaveRequests.filter((r) => r.status === "menunggu").length;

  const tabs: { key: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    {
      key: "cuti",
      label: "Izin & Cuti",
      icon: FileCheck,
      badge: pendingLeaves > 0 ? pendingLeaves : undefined,
    },
    {
      key: "presensi",
      label: "Presensi GPS",
      icon: MapPin,
    },
    {
      key: "karyawan",
      label: "Data Karyawan",
      icon: Users,
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
      {/* Sticky Admin Top Header */}
      <header className="sticky top-0 z-30 w-full bg-[#0C2B22] text-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/10 shrink-0 shadow-sm">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            hadir.
          </h1>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0A3A29] bg-[#D5F2C8] rounded-md">
            ADMIN HR
          </span>
        </div>

        {/* Switch back to Karyawan mode */}
        <button
          type="button"
          onClick={() => switchRole("karyawan")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer active:scale-95 border border-white/10"
          title="Beralih ke Portal Karyawan"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#D5F2C8]" />
          <span>Ke Karyawan</span>
        </button>
      </header>

      {/* Admin Operator Banner */}
      <div className="bg-[#12382D] text-white px-5 py-2.5 flex items-center justify-between text-xs border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#D5F2C8] text-[#0A3A29] flex items-center justify-center font-bold text-[10px]">
            RW
          </div>
          <div>
            <span className="font-bold block text-xs">Rina Wijaya</span>
            <span className="text-[10px] text-slate-300 block -mt-0.5">
              HR Manager • Hak Akses Penuh
            </span>
          </div>
        </div>

        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
          PT Nusantara Digital
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-5 py-4 no-scrollbar">
        {adminTab === "cuti" && <AdminLeaveApproval />}
        {adminTab === "presensi" && <AdminAttendanceMonitor />}
        {adminTab === "karyawan" && <AdminEmployeeManagement />}
      </main>

      {/* Sticky Bottom Navigation for Admin */}
      <nav className="sticky bottom-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 py-1.5 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] shrink-0">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const isActive = adminTab === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setAdminTab(tab.key)}
                className="group relative flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <div
                  className={`relative flex items-center justify-center w-12 h-7 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#E8F6ED] text-[#0D7A57]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon
                    className="w-5 h-5 transition-transform duration-200"
                    strokeWidth={isActive ? 2.2 : 1.75}
                  />
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium tracking-tight transition-colors duration-150 ${
                    isActive ? "text-[#0D7A57] font-semibold" : "text-slate-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
