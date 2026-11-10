"use client";

import React from "react";
import { Building2, Navigation } from "lucide-react";

interface LocationMapWidgetProps {
  isInsideOffice: boolean;
  distanceMeters: number;
  maxRadiusMeters?: number;
  isGpsEnabled?: boolean;
}

export function LocationMapWidget({
  isInsideOffice,
  distanceMeters,
  maxRadiusMeters = 100,
  isGpsEnabled = true,
}: LocationMapWidgetProps) {
  return (
    <div className="relative w-full h-[230px] rounded-3xl bg-[#EAF2ED] border border-[#D5E3DB] overflow-hidden p-3 flex items-center justify-center select-none shadow-xs">
      {/* Simulation Pill Badge */}
      <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60 flex items-center gap-1.5">
        <Navigation className="w-3 h-3 text-[#0D7A57]" />
        <span className="text-[10px] font-bold tracking-wider text-slate-700 uppercase">
          PETA UNPAM VIKTOR 2
        </span>
      </div>

      {/* Grid of Campus Buildings & Puspitek Corridor */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2.5 p-3 opacity-95">
        <div className="bg-[#DCE7E1] rounded-2xl flex items-center justify-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Viktor 1</span>
        </div>
        <div className="bg-[#DCE7E1] rounded-2xl" />
        <div className="bg-[#DCE7E1] rounded-2xl flex items-center justify-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Parkir Barat</span>
        </div>
        <div className="bg-[#DCE7E1] rounded-2xl" />
        {/* Center Building: Viktor 2 */}
        <div className="bg-[#D3E3DA] rounded-2xl border border-[#0D7A57]/20" />
        <div className="bg-[#DCE7E1] rounded-2xl" />
        <div className="bg-[#DCE7E1] rounded-2xl flex items-center justify-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Jl. Puspitek</span>
        </div>
        <div className="bg-[#DCE7E1] rounded-2xl" />
        <div className="bg-[#DCE7E1] rounded-2xl flex items-center justify-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Pasar Jengkol</span>
        </div>
      </div>

      {/* Geofence 100m Radius Circle around UNPAM Viktor 2 */}
      {isGpsEnabled && (
        <div className="absolute w-[170px] h-[170px] rounded-full border-2 border-dashed border-[#10B981] bg-[#10B981]/15 z-10 flex items-center justify-center transition-all duration-300">
          <div className="absolute inset-0 rounded-full animate-pulse bg-[#10B981]/5" />
        </div>
      )}

      {/* Center Building Marker: UNPAM Viktor 2 */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#0D7A57]" strokeWidth={2} />
        </div>
        <span className="text-[11px] font-bold text-slate-800 mt-1.5 tracking-tight drop-shadow-xs bg-white/90 px-2 py-0.5 rounded-md shadow-2xs border border-slate-100">
          UNPAM Viktor 2
        </span>
      </div>

      {/* User GPS Indicator */}
      {!isGpsEnabled ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-slate-900/80 text-white px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5">
          <span>GPS Dimatikan</span>
        </div>
      ) : isInsideOffice ? (
        <div
          className="absolute z-30 transition-all duration-500 ease-out"
          style={{ top: "35%", right: "43%" }}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-blue-500/30 animate-ping" />
            <span className="relative w-3.5 h-3.5 rounded-full bg-[#2563EB] border-2 border-white shadow-md" />
          </div>
        </div>
      ) : (
        <div
          className="absolute z-30 transition-all duration-500 ease-out"
          style={{ bottom: "18%", right: "14%" }}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-red-500/30 animate-ping" />
            <span className="relative w-3.5 h-3.5 rounded-full bg-[#DC2626] border-2 border-white shadow-md" />
          </div>
        </div>
      )}
    </div>
  );
}
