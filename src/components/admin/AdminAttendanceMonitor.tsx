"use client";

import React, { useState } from "react";
import { MapPin, ShieldCheck, AlertTriangle, Building2, Navigation } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function AdminAttendanceMonitor() {
  const { adminAttendanceLogs } = useMobileApp();
  const [filter, setFilter] = useState<"all" | "valid" | "anomali">("all");

  const validCount = adminAttendanceLogs.filter((log) => log.isWithinRadius).length;
  const anomaliCount = adminAttendanceLogs.filter((log) => !log.isWithinRadius).length;

  const filteredLogs = adminAttendanceLogs.filter((log) => {
    if (filter === "valid") return log.isWithinRadius;
    if (filter === "anomali") return !log.isWithinRadius;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Geofence Rule Info Banner */}
      <div className="bg-[#EAF4EE] border border-[#CDE5D6] rounded-2xl p-3.5 flex items-start gap-3">
        <Building2 className="w-5 h-5 text-[#0D7A57] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#0C2B22]">
            Aturan Geo-fencing: Radius 100m UNPAM Viktor 2
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Titik pusat: Kampus UNPAM Viktor (Gedung Viktor 2, Jl. Puspitek No. 46, Serpong). Presensi sah hanya jika jarak GPS ≤ 100 meter.
          </p>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-tight text-[#0D7A57]">
              Sesuai Radius
            </span>
            <ShieldCheck className="w-4 h-4 text-[#0D7A57]" />
          </div>
          <span className="text-2xl font-extrabold text-[#0D7A57] block">
            {validCount}
          </span>
          <span className="text-[10px] text-slate-500 block">Jarak ≤ 100m (Sah)</span>
        </div>

        <div className="bg-red-50 border border-red-200/80 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-tight text-red-700">
              Luar Radius
            </span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-2xl font-extrabold text-red-700 block">
            {anomaliCount}
          </span>
          <span className="text-[10px] text-slate-500 block">Jarak &gt; 100m (Anomali)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {(
          [
            { key: "all", label: `Semua (${adminAttendanceLogs.length})` },
            { key: "valid", label: `Sesuai Radius (${validCount})` },
            { key: "anomali", label: `Luar Radius (${anomaliCount})` },
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

      {/* Attendance Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={`bg-white rounded-2xl p-4 border shadow-2xs space-y-3 transition-all ${
              log.isWithinRadius ? "border-slate-100" : "border-red-200 bg-red-50/20"
            }`}
          >
            {/* Employee Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    log.isWithinRadius
                      ? "bg-[#E8F6ED] text-[#0D7A57]"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {log.employeeName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {log.employeeName}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    NIP {log.nip} • {log.position}
                  </p>
                </div>
              </div>

              {/* Verified Status Badge */}
              {log.isWithinRadius ? (
                <span className="px-2.5 py-1 text-[10px] font-bold text-[#0D7A57] bg-[#E8F6ED] border border-[#D5EEDC] rounded-lg flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-[#0D7A57]" />
                  <span>Sesuai Radius</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-1 shrink-0">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                  <span>Luar Radius</span>
                </span>
              )}
            </div>

            {/* GPS Metrics Grid */}
            <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-medium">{log.locationName}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-900">
                  {log.time}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Jarak ke Kantor:</span>
                  <span
                    className={`font-bold text-xs ${
                      log.isWithinRadius ? "text-[#0D7A57]" : "text-red-600"
                    }`}
                  >
                    {log.distanceMeters} meter
                    {log.isWithinRadius ? " (Aman ≤ 100m)" : " (Melebihi 100m)"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Koordinat GPS:</span>
                  <span className="font-mono text-slate-700 font-medium">
                    {log.coordinates}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
