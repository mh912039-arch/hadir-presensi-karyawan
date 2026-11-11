"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  XCircle,
  X,
  CheckCheck,
  Trash2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";

export function NotificationModal() {
  const {
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    notifications,
    user,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    requestNotificationPermission,
    setActiveTab,
    setCurrentView,
  } = useMobileApp();

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [permissionRequested, setPermissionRequested] = useState(false);

  if (!isNotificationCenterOpen) return null;

  // Filter notifications for active employee
  const userNotifications = notifications.filter(
    (n) => n.recipientNip === user.nip || n.recipientNip === "all"
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const filteredList = userNotifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const handleRequestPermission = async () => {
    await requestNotificationPermission();
    setPermissionRequested(true);
  };

  const handleNotificationClick = (id: string, type: string) => {
    markNotificationAsRead(id);
    if (type === "leave_approved" || type === "leave_rejected") {
      setIsNotificationCenterOpen(false);
      setActiveTab("cuti");
      setCurrentView("pengajuan_cuti");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-t-[32px] sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-6 duration-200 overflow-hidden">
        {/* Modal Top Handle & Header */}
        <div className="px-5 pt-3 pb-3 border-b border-slate-100 space-y-2 shrink-0">
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F6ED] text-[#0D7A57] flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  Pusat Notifikasi
                </h3>
                <p className="text-[11px] text-slate-500">
                  {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua sudah dibaca"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter & Mark Read Controls */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === "all"
                    ? "bg-[#0D7A57] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Semua ({userNotifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === "unread"
                    ? "bg-[#0D7A57] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Belum Dibaca ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-[11px] font-semibold text-[#0D7A57] hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Tandai dibaca</span>
              </button>
            )}
          </div>
        </div>

        {/* Browser Device Notification Prompt Banner */}
        {typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission !== "granted" &&
          !permissionRequested && (
            <div className="mx-4 mt-3 p-3 rounded-2xl bg-[#E8F6ED] border border-[#D5EEDC] flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#0D7A57] shrink-0" />
                <span className="text-[11px] font-medium text-[#0A4A33] leading-snug">
                  Izinkan notifikasi push di HP Chrome Anda
                </span>
              </div>
              <button
                type="button"
                onClick={handleRequestPermission}
                className="px-2.5 py-1 rounded-lg bg-[#0D7A57] text-white text-[10px] font-bold shadow-2xs hover:bg-[#0A6447] shrink-0 active:scale-95 transition-all"
              >
                Izinkan
              </button>
            </div>
          )}

        {/* Notification List Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 no-scrollbar">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-700">
                  Tidak ada notifikasi
                </p>
                <p className="text-[11px] text-slate-400">
                  Pemberitahuan persetujuan cuti dan sistem akan tampil di sini.
                </p>
              </div>
            </div>
          ) : (
            filteredList.map((notif) => {
              const isApproved = notif.type === "leave_approved";
              const isRejected = notif.type === "leave_rejected";

              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id, notif.type)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    notif.read
                      ? "bg-white border-slate-100 shadow-2xs opacity-80 hover:opacity-100"
                      : "bg-[#F8FAF9] border-[#D5EEDC] shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isApproved
                            ? "bg-[#E8F6ED] text-[#0D7A57]"
                            : isRejected
                            ? "bg-red-50 text-red-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isApproved && (
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2.2} />
                        )}
                        {isRejected && (
                          <XCircle className="w-4 h-4" strokeWidth={2.2} />
                        )}
                        {!isApproved && !isRejected && <Bell className="w-4 h-4" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            {notif.title}
                          </h4>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#0D7A57]" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">
                      {notif.timeLabel}
                    </span>
                  </div>

                  {(isApproved || isRejected) && (
                    <div className="flex items-center justify-end text-[11px] font-semibold text-[#0D7A57] pt-1 border-t border-slate-100/60">
                      <span className="flex items-center gap-1">
                        Buka detail cuti <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Footer */}
        {userNotifications.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 shrink-0">
            <span className="text-[11px] text-slate-400">
              {userNotifications.length} total notifikasi
            </span>
            <button
              type="button"
              onClick={clearNotifications}
              className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Hapus Semua</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
