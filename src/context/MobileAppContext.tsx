"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  NavigationTab,
  AppView,
  UserProfile,
  AttendanceRecord,
  LeaveRequest,
  GPSStatus,
  LocalQueueItem,
} from "@/types/mobile";

interface MobileAppContextType {
  // Navigation & View
  isLoggedIn: boolean;
  activeTab: NavigationTab;
  currentView: AppView;
  setActiveTab: (tab: NavigationTab) => void;
  setCurrentView: (view: AppView) => void;

  // User
  user: UserProfile;

  // Attendance & Clock-In
  hasClockedIn: boolean;
  clockInTime: string;
  attendanceHistory: AttendanceRecord[];
  hadirCount: number;
  terlambatCount: number;
  cutiCount: number;

  // GPS Simulation
  gps: GPSStatus;
  toggleGpsLocation: (inside: boolean) => void;
  confirmAttendance: () => { success: boolean; queued: boolean; message: string };

  // Leave Management
  remainingLeaveDays: number;
  leaveRequests: LeaveRequest[];
  latestLeaveRequest: LeaveRequest | null;
  submitLeaveRequest: (leaveType: string, date: string, reason: string) => { success: boolean; queued: boolean };

  // Offline Simulation (PRD Feature P1)
  isOffline: boolean;
  toggleOfflineMode: (offline?: boolean) => void;
  localQueue: LocalQueueItem[];
  syncLocalQueue: () => void;

  // Auth
  login: (email?: string, password?: string) => void;
  logout: () => void;

  // Presets & Demo Helpers
  activePresetNumber: number;
  jumpToPreset: (presetNumber: number) => void;
  resetToDefault: () => void;
}

const defaultUser: UserProfile = {
  name: "Aditya Pratama",
  email: "aditya@nusantara.co.id",
  role: "Karyawan",
  division: "Divisi Teknologi",
  nip: "20240018",
  status: "Aktif",
  companyName: "PT Nusantara Digital",
  employmentStatus: "Karyawan tetap",
  joinDate: "8 Januari 2024",
  workLocation: "Kantor Jakarta",
};

const initialAttendanceHistory: AttendanceRecord[] = [
  {
    id: "att-today",
    dateNumber: "09",
    dayName: "SEN",
    dateLabel: "Hari ini",
    timeRange: "Belum presensi",
    status: "belum",
    statusLabel: "Hari ini",
  },
  {
    id: "att-06",
    dateNumber: "06",
    dayName: "JUM",
    dateLabel: "6 November",
    timeRange: "08.07 – 17.04",
    status: "terlambat",
    statusLabel: "Terlambat",
  },
  {
    id: "att-05",
    dateNumber: "05",
    dayName: "KAM",
    dateLabel: "5 November",
    timeRange: "07.48 – 17.02",
    status: "tepat_waktu",
    statusLabel: "Tepat waktu",
  },
  {
    id: "att-04",
    dateNumber: "04",
    dayName: "RAB",
    dateLabel: "4 November",
    timeRange: "Cuti tahunan",
    status: "cuti",
    statusLabel: "Disetujui",
  },
  {
    id: "att-03",
    dateNumber: "03",
    dayName: "SEL",
    dateLabel: "3 November",
    timeRange: "07.50 – 17.06",
    status: "tepat_waktu",
    statusLabel: "Tepat waktu",
  },
];

const MobileAppContext = createContext<MobileAppContextType | undefined>(undefined);

export function MobileAppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>("beranda");
  const [currentView, setCurrentView] = useState<AppView>("main");

  // User
  const [user] = useState<UserProfile>(defaultUser);

  // Attendance
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState("07.52");
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(initialAttendanceHistory);

  // GPS State
  const [isInsideOffice, setIsInsideOffice] = useState(true);

  // Leave Management
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(8);
  const [latestLeaveRequest, setLatestLeaveRequest] = useState<LeaveRequest | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // Offline / Local Queue
  const [isOffline, setIsOffline] = useState(false);
  const [localQueue, setLocalQueue] = useState<LocalQueueItem[]>([]);

  // Active preset tracker
  const [activePresetNumber, setActivePresetNumber] = useState(2);

  const gps: GPSStatus = {
    isInsideOffice,
    distanceMeters: isInsideOffice ? 24 : 245,
    maxRadiusMeters: 100,
    accuracyMeters: 5,
    officeName: "Kantor Jakarta",
    officeAddress: "Jl. Jend. Sudirman No. 28, Jakarta Selatan",
    currentTimeString: "07.52 WIB",
    currentDateString: "Senin, 9 Nov 2026",
  };

  const hadirCount = hasClockedIn ? 5 : 4;
  const terlambatCount = 1;
  const cutiCount = 1;

  // Toggle GPS inside vs outside office
  const toggleGpsLocation = (inside: boolean) => {
    setIsInsideOffice(inside);
  };

  // Confirm Clock-In
  const confirmAttendance = () => {
    if (!isInsideOffice) {
      return { success: false, queued: false, message: "Di luar jangkauan kantor" };
    }

    if (isOffline) {
      // PRD P1 Local Queue requirement
      const queueItem: LocalQueueItem = {
        id: "queue-" + Date.now(),
        type: "attendance",
        description: "Presensi masuk (07.52 WIB) - Offline",
        timestamp: new Date().toISOString(),
        payload: {
          time: "07.52",
          date: "9 November 2026",
          location: "Kantor Jakarta",
          distance: 24,
        },
      };
      setLocalQueue((prev) => [...prev, queueItem]);
    }

    setHasClockedIn(true);
    setClockInTime("07.52");

    // Update today's attendance in history (matches Screen 11)
    setAttendanceHistory((prev) =>
      prev.map((item) =>
        item.id === "att-today"
          ? {
              ...item,
              timeRange: "07.52 – belum pulang",
              status: "tepat_waktu",
              statusLabel: "Hari ini",
            }
          : item
      )
    );

    setCurrentView("presensi_sukses");
    return { success: true, queued: isOffline, message: "Presensi berhasil" };
  };

  // Submit Leave Request
  const submitLeaveRequest = (leaveType: string, date: string, reason: string) => {
    const newRequest: LeaveRequest = {
      id: "leave-" + Date.now(),
      requestNumber: "CT-2026-0113",
      leaveType: leaveType || "Cuti tahunan",
      date: date || "13 November 2026",
      duration: "1 hari kerja",
      reason: reason || "Keperluan keluarga.",
      approver: "Rina Wijaya",
      status: "menunggu",
      statusLabel: "Menunggu persetujuan HR",
      createdAt: new Date().toISOString(),
    };

    if (isOffline) {
      const queueItem: LocalQueueItem = {
        id: "queue-" + Date.now(),
        type: "leave",
        description: `Pengajuan cuti (${newRequest.leaveType}) - Offline`,
        timestamp: new Date().toISOString(),
        payload: newRequest as unknown as Record<string, unknown>,
      };
      setLocalQueue((prev) => [...prev, queueItem]);
    }

    setLatestLeaveRequest(newRequest);
    setLeaveRequests((prev) => [newRequest, ...prev]);
    setCurrentView("pengajuan_sukses");
    return { success: true, queued: isOffline };
  };

  // Offline Mode Toggle
  const toggleOfflineMode = (offline?: boolean) => {
    const nextState = offline !== undefined ? offline : !isOffline;
    setIsOffline(nextState);
  };

  // Sync Local Queue
  const syncLocalQueue = () => {
    if (localQueue.length > 0) {
      setLocalQueue([]);
    }
  };

  // Auto-sync when coming back online
  useEffect(() => {
    if (!isOffline && localQueue.length > 0) {
      const timer = setTimeout(() => {
        syncLocalQueue();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOffline, localQueue.length]);

  // Auth
  const login = () => {
    setIsLoggedIn(true);
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  // Reset all to default prototype state
  const resetToDefault = () => {
    setIsLoggedIn(true);
    setActiveTab("beranda");
    setCurrentView("main");
    setHasClockedIn(false);
    setIsInsideOffice(true);
    setRemainingLeaveDays(8);
    setLatestLeaveRequest(null);
    setLocalQueue([]);
    setIsOffline(false);
    setAttendanceHistory(initialAttendanceHistory);
    setActivePresetNumber(2);
  };

  // Jump directly to any of the 14 screenshots
  const jumpToPreset = (num: number) => {
    setActivePresetNumber(num);
    switch (num) {
      case 1: // 01 - Masuk.png
        setIsLoggedIn(false);
        setCurrentView("login");
        break;
      case 2: // 02 - Beranda.png
        setIsLoggedIn(true);
        setActiveTab("beranda");
        setCurrentView("main");
        setHasClockedIn(false);
        break;
      case 3: // 03 - Presensi GPS.png
        setIsLoggedIn(true);
        setActiveTab("beranda");
        setCurrentView("presensi_gps");
        setIsInsideOffice(true);
        break;
      case 4: // 04 - Di luar jangkauan.png
        setIsLoggedIn(true);
        setActiveTab("beranda");
        setCurrentView("presensi_gps");
        setIsInsideOffice(false);
        break;
      case 5: // 05 - Presensi berhasil.png
        setIsLoggedIn(true);
        setActiveTab("beranda");
        setCurrentView("presensi_sukses");
        setHasClockedIn(true);
        break;
      case 6: // 06 - Beranda setelah presensi.png
        setIsLoggedIn(true);
        setActiveTab("beranda");
        setCurrentView("main");
        setHasClockedIn(true);
        break;
      case 7: // 07 - Riwayat kehadiran.png
        setIsLoggedIn(true);
        setActiveTab("riwayat");
        setCurrentView("main");
        setHasClockedIn(false);
        setAttendanceHistory(initialAttendanceHistory);
        break;
      case 8: // 08 - Pengajuan cuti.png
        setIsLoggedIn(true);
        setActiveTab("cuti");
        setCurrentView("pengajuan_cuti");
        setHasClockedIn(false);
        break;
      case 9: // 09 - Pengajuan terkirim.png
        setIsLoggedIn(true);
        setActiveTab("cuti");
        setCurrentView("pengajuan_sukses");
        setHasClockedIn(false);
        setLatestLeaveRequest({
          id: "leave-demo",
          requestNumber: "CT-2026-0113",
          leaveType: "Cuti tahunan",
          date: "13 November 2026",
          duration: "1 hari kerja",
          reason: "Keperluan keluarga.",
          approver: "Rina Wijaya",
          status: "menunggu",
          statusLabel: "Menunggu persetujuan HR",
          createdAt: new Date().toISOString(),
        });
        break;
      case 10: // 10 - Profil karyawan.png
        setIsLoggedIn(true);
        setActiveTab("profil");
        setCurrentView("main");
        setHasClockedIn(false);
        break;
      case 11: // 11 - Riwayat setelah presensi.png
        setIsLoggedIn(true);
        setActiveTab("riwayat");
        setCurrentView("main");
        setHasClockedIn(true);
        setAttendanceHistory([
          {
            id: "att-today",
            dateNumber: "09",
            dayName: "SEN",
            dateLabel: "Hari ini",
            timeRange: "07.52 – belum pulang",
            status: "tepat_waktu",
            statusLabel: "Hari ini",
          },
          ...initialAttendanceHistory.slice(1),
        ]);
        break;
      case 12: // 12 - Cuti setelah presensi.png
        setIsLoggedIn(true);
        setActiveTab("cuti");
        setCurrentView("pengajuan_cuti");
        setHasClockedIn(true);
        break;
      case 13: // 13 - Cuti terkirim setelah presensi.png
        setIsLoggedIn(true);
        setActiveTab("cuti");
        setCurrentView("pengajuan_sukses");
        setHasClockedIn(true);
        setLatestLeaveRequest({
          id: "leave-demo-2",
          requestNumber: "CT-2026-0113",
          leaveType: "Cuti tahunan",
          date: "13 November 2026",
          duration: "1 hari kerja",
          reason: "Keperluan keluarga.",
          approver: "Rina Wijaya",
          status: "menunggu",
          statusLabel: "Menunggu persetujuan HR",
          createdAt: new Date().toISOString(),
        });
        break;
      case 14: // 14 - Profil setelah presensi.png
        setIsLoggedIn(true);
        setActiveTab("profil");
        setCurrentView("main");
        setHasClockedIn(true);
        break;
      default:
        break;
    }
  };

  return (
    <MobileAppContext.Provider
      value={{
        isLoggedIn,
        activeTab,
        currentView,
        setActiveTab,
        setCurrentView,
        user,
        hasClockedIn,
        clockInTime,
        attendanceHistory,
        hadirCount,
        terlambatCount,
        cutiCount,
        gps,
        toggleGpsLocation,
        confirmAttendance,
        remainingLeaveDays,
        leaveRequests,
        latestLeaveRequest,
        submitLeaveRequest,
        isOffline,
        toggleOfflineMode,
        localQueue,
        syncLocalQueue,
        login,
        logout,
        activePresetNumber,
        jumpToPreset,
        resetToDefault,
      }}
    >
      {children}
    </MobileAppContext.Provider>
  );
}

export function useMobileApp() {
  const context = useContext(MobileAppContext);
  if (!context) {
    throw new Error("useMobileApp must be used within a MobileAppProvider");
  }
  return context;
}
