"use client";

import React from "react";
import { useMobileApp } from "@/context/MobileAppContext";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { BottomNavBar } from "@/components/mobile/BottomNavBar";
import { LoginScreen } from "@/components/mobile/screens/LoginScreen";
import { BerandaScreen } from "@/components/mobile/screens/BerandaScreen";
import { PresensiGpsScreen } from "@/components/mobile/screens/PresensiGpsScreen";
import { PresensiSuksesScreen } from "@/components/mobile/screens/PresensiSuksesScreen";
import { RiwayatScreen } from "@/components/mobile/screens/RiwayatScreen";
import { PengajuanCutiScreen } from "@/components/mobile/screens/PengajuanCutiScreen";
import { PengajuanSuksesScreen } from "@/components/mobile/screens/PengajuanSuksesScreen";
import { ProfilScreen } from "@/components/mobile/screens/ProfilScreen";
import { AdminPortalScreen } from "@/components/admin/AdminPortalScreen";

export function HadirMobileApp() {
  const { isLoggedIn, activeTab, currentView, currentRole } = useMobileApp();

  // 1. Admin Portal Flow (Full Admin HR Interface)
  if (currentRole === "admin" || currentView === "admin_portal") {
    return <AdminPortalScreen />;
  }

  // 2. Unauthenticated or Login View
  if (!isLoggedIn || currentView === "login") {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
        <LoginScreen />
      </div>
    );
  }

  // 3. Presensi GPS Flow (No bottom nav)
  if (currentView === "presensi_gps") {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
        <PresensiGpsScreen />
      </div>
    );
  }

  // 4. Presensi Sukses Flow (No bottom nav)
  if (currentView === "presensi_sukses") {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
        <PresensiSuksesScreen />
      </div>
    );
  }

  // 5. Pengajuan Cuti View (With bottom nav)
  if (currentView === "pengajuan_cuti") {
    return (
      <div className="w-full flex-1 flex flex-col justify-between bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
        <div className="flex-1 flex flex-col">
          <PengajuanCutiScreen />
        </div>
        <BottomNavBar />
      </div>
    );
  }

  // 6. Pengajuan Sukses View (No bottom nav)
  if (currentView === "pengajuan_sukses") {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
        <PengajuanSuksesScreen />
      </div>
    );
  }

  // 7. Main Tab Navigation Views (Karyawan)
  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-[#F8FAF9] text-slate-900 select-none min-h-[100dvh]">
      <div className="flex-1 flex flex-col">
        {activeTab === "beranda" && (
          <>
            <MobileHeader showBrand={true} roleBadgeText="KARYAWAN" />
            <BerandaScreen />
          </>
        )}

        {activeTab === "riwayat" && <RiwayatScreen />}

        {activeTab === "profil" && <ProfilScreen />}
      </div>

      <BottomNavBar />
    </div>
  );
}
