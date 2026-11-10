"use client";

import React from "react";
import { Home, Clock, Calendar, User } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { NavigationTab } from "@/types/mobile";

export function BottomNavBar() {
  const { activeTab, setActiveTab, setCurrentView } = useMobileApp();

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab === "cuti") {
      setCurrentView("pengajuan_cuti");
    } else {
      setCurrentView("main");
    }
  };

  const navItems: { tab: NavigationTab; label: string; icon: React.ElementType }[] = [
    { tab: "beranda", label: "Beranda", icon: Home },
    { tab: "riwayat", label: "Riwayat", icon: Clock },
    { tab: "cuti", label: "Cuti", icon: Calendar },
    { tab: "profil", label: "Profil", icon: User },
  ];

  return (
    <div className="w-full shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-100 pt-2 pb-2 px-6 shadow-sm">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          const Icon = item.icon;

          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleTabClick(item.tab)}
              className="group flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <div
                className={`flex items-center justify-center w-11 h-7 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#E8F6ED] text-[#0D7A57]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-105"
                  strokeWidth={isActive ? 2.2 : 1.75}
                />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight transition-colors duration-150 ${
                  isActive ? "text-[#0D7A57] font-semibold" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-[4px] bg-slate-900 rounded-full mx-auto mt-3 mb-1" />
    </div>
  );
}
