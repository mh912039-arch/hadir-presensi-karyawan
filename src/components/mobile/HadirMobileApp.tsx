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

export function HadirMobileApp() {
  const { isLoggedIn, activeTab, currentView } = useMobileApp();

  // 1. Unauthenticated or Login View
  if (!isLoggedIn || currentView === "login") {
    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
        <MobileHeader showBrand={false} />
        <LoginScreen />
      </div>
    );
  }

  // 2. Presensi GPS Flow (No bottom nav)
  if (currentView === "presensi_gps") {
    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
        <MobileHeader showBrand={false} />
        <PresensiGpsScreen />
      </div>
    );
  }

  // 3. Presensi Sukses Flow (No bottom nav)
  if (currentView === "presensi_sukses") {
    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
        <MobileHeader showBrand={false} />
        <PresensiSuksesScreen />
      </div>
    );
  }

  // 4. Pengajuan Cuti View (With bottom nav)
  if (currentView === "pengajuan_cuti") {
    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
        <MobileHeader showBrand={false} />
        <PengajuanCutiScreen />
        <BottomNavBar />
      </div>
    );
  }

  // 5. Pengajuan Sukses View (No bottom nav)
  if (currentView === "pengajuan_sukses") {
    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
        <MobileHeader showBrand={false} />
        <PengajuanSuksesScreen />
      </div>
    );
  }

  // 6. Main Tab Navigation Views
  return (
    <div className="w-full h-full flex flex-col bg-[#F8FAF9] text-slate-900 select-none">
      {activeTab === "beranda" && (
        <>
          <MobileHeader showBrand={true} roleBadgeText="KARYAWAN" />
          <BerandaScreen />
        </>
      )}

      {activeTab === "riwayat" && (
        <>
          <MobileHeader showBrand={false} />
          <RiwayatScreen />
        </>
      )}

      {activeTab === "profil" && (
        <>
          <MobileHeader showBrand={false} />
          <ProfilScreen />
        </>
      )}

      <BottomNavBar />
    </div>
  );
}
