"use client";

import React, { useEffect } from "react";
import { CheckCircle2, XCircle, Bell, X, ChevronRight } from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function MobileNotificationBanner() {
  const {
    activeBannerNotification,
    dismissBannerNotification,
    setActiveTab,
    setCurrentView,
    markNotificationAsRead,
  } = useMobileApp();

  useEffect(() => {
    if (!activeBannerNotification) return;

    // Auto-dismiss after 8 seconds if not dismissed manually
    const timer = setTimeout(() => {
      dismissBannerNotification();
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeBannerNotification, dismissBannerNotification]);

  if (!activeBannerNotification) return null;

  const isApproved = activeBannerNotification.type === "leave_approved";
  const isRejected = activeBannerNotification.type === "leave_rejected";

  const handleOpenDetails = () => {
    markNotificationAsRead(activeBannerNotification.id);
    dismissBannerNotification();
    setActiveTab("cuti");
    setCurrentView("pengajuan_cuti");
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-sm z-50 animate-in slide-in-from-top-6 fade-in duration-200"
    >
      <div className="bg-white/98 backdrop-blur-md rounded-3xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-slate-200/90 text-slate-900 space-y-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#0C2B22] text-[#D5F2C8] flex items-center justify-center font-extrabold text-[10px]">
              h.
            </div>
            <span className="font-bold text-slate-800 text-[11px] tracking-tight">
              hadir. • Notifikasi HR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-slate-400">
              {activeBannerNotification.timeLabel || "Baru saja"}
            </span>
            <button
              type="button"
              onClick={dismissBannerNotification}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notification Main Body */}
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
              isApproved
                ? "bg-[#E8F6ED] text-[#0D7A57]"
                : isRejected
                ? "bg-red-50 text-red-600"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {isApproved && <CheckCircle2 className="w-5 h-5" strokeWidth={2.2} />}
            {isRejected && <XCircle className="w-5 h-5" strokeWidth={2.2} />}
            {!isApproved && !isRejected && <Bell className="w-5 h-5" />}
          </div>

          <div className="flex-1 space-y-0.5">
            <h4
              className={`text-xs font-bold leading-snug ${
                isApproved
                  ? "text-[#0D7A57]"
                  : isRejected
                  ? "text-red-700"
                  : "text-slate-900"
              }`}
            >
              {activeBannerNotification.title}
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeBannerNotification.message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100/80">
          <button
            type="button"
            onClick={dismissBannerNotification}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Nanti
          </button>
          <button
            type="button"
            onClick={handleOpenDetails}
            className="px-3.5 py-1.5 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] text-white text-xs font-bold shadow-2xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            <span>Buka Cuti</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
