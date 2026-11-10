"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  NavigationTab,
  AdminTab,
  UserRole,
  AppView,
  UserProfile,
  AttendanceRecord,
  LeaveRequest,
  GPSStatus,
  LocalQueueItem,
  EmployeeItem,
  AdminAttendanceLog,
} from "@/types/mobile";

interface MobileAppContextType {
  // Role & View Navigation
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  activeTab: NavigationTab;
  adminTab: AdminTab;
  currentView: AppView;
  setActiveTab: (tab: NavigationTab) => void;
  setAdminTab: (tab: AdminTab) => void;
  setCurrentView: (view: AppView) => void;

  // User Profile
  user: UserProfile;

  // Attendance & Clock-In
  hasClockedIn: boolean;
  clockInTime: string;
  attendanceHistory: AttendanceRecord[];
  hadirCount: number;
  terlambatCount: number;
  cutiCount: number;

  // GPS & UNPAM Viktor 2 Geo-fencing
  gps: GPSStatus;
  toggleGpsEnabled: (enabled: boolean) => void;
  toggleGpsLocation: (inside: boolean) => void;
  requestRealBrowserGps: () => Promise<{ success: boolean; message: string }>;
  confirmAttendance: () => { success: boolean; queued: boolean; message: string };

  // Leave Management (Karyawan & Admin Approval)
  remainingLeaveDays: number;
  leaveRequests: LeaveRequest[];
  latestLeaveRequest: LeaveRequest | null;
  submitLeaveRequest: (leaveType: string, date: string, reason: string) => { success: boolean; queued: boolean };
  approveLeaveRequest: (id: string) => void;
  rejectLeaveRequest: (id: string) => void;

  // Admin: Employee Management
  employees: EmployeeItem[];
  addEmployee: (employee: Omit<EmployeeItem, "id">) => void;
  updateEmployee: (id: string, updatedData: Partial<EmployeeItem>) => void;
  deleteEmployee: (id: string) => void;

  // Admin: GPS Attendance Monitoring Logs
  adminAttendanceLogs: AdminAttendanceLog[];

  // Offline Simulation (PRD P1)
  isOffline: boolean;
  toggleOfflineMode: (offline?: boolean) => void;
  localQueue: LocalQueueItem[];
  syncLocalQueue: () => void;

  // Auth (Strict UNPAM Viktor 2 validation)
  loginError: string | null;
  setLoginError: (err: string | null) => void;
  login: (email?: string, password?: string) => { success: boolean; message: string };
  loginAsAdmin: () => void;
  loginAsKaryawan: () => void;
  logout: () => void;

  // Presets & Demo Helpers
  activePresetNumber: number;
  jumpToPreset: (presetNumber: number) => void;
  resetToDefault: () => void;
}

// Koordinat resmi Kampus UNPAM Viktor (Gedung Viktor 2, Tangerang Selatan)
const UNPAM_VIKTOR_LAT = -6.3458;
const UNPAM_VIKTOR_LNG = 106.6917;

// Formula Haversine untuk menghitung jarak akurat dalam satuan meter
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // meter
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
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
  workLocation: "UNPAM Viktor 2",
};

const initialEmployees: EmployeeItem[] = [
  {
    id: "emp-1",
    name: "Aditya Pratama",
    nip: "20240018",
    position: "Product Designer",
    division: "Teknologi",
    email: "aditya@nusantara.co.id",
    password: "password123",
    status: "Aktif",
    joinDate: "8 Januari 2024",
  },
  {
    id: "emp-2",
    name: "Budi Santoso",
    nip: "20240019",
    position: "Frontend Developer",
    division: "Teknologi",
    email: "budi@nusantara.co.id",
    password: "budi2024",
    status: "Aktif",
    joinDate: "15 Maret 2024",
  },
  {
    id: "emp-3",
    name: "Siti Rahma",
    nip: "20240020",
    position: "UI/UX Researcher",
    division: "Produk",
    email: "siti@nusantara.co.id",
    password: "siti2024",
    status: "Aktif",
    joinDate: "10 Juni 2024",
  },
  {
    id: "emp-4",
    name: "Fajar Nugraha",
    nip: "20240021",
    position: "Backend Engineer",
    division: "Teknologi",
    email: "fajar@nusantara.co.id",
    password: "fajar2024",
    status: "Aktif",
    joinDate: "1 Agustus 2024",
  },
];

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "leave-demo-1",
    employeeName: "Aditya Pratama",
    nip: "20240018",
    position: "Product Designer",
    requestNumber: "CT-2026-0113",
    leaveType: "Cuti tahunan",
    date: "13 November 2026",
    duration: "1 hari kerja",
    reason: "Keperluan keluarga.",
    approver: "Rina Wijaya",
    status: "menunggu",
    statusLabel: "Menunggu persetujuan HR",
    createdAt: "2026-11-09T08:00:00Z",
  },
  {
    id: "leave-demo-2",
    employeeName: "Budi Santoso",
    nip: "20240019",
    position: "Frontend Developer",
    requestNumber: "CT-2026-0112",
    leaveType: "Cuti sakit",
    date: "10 November 2026",
    duration: "2 hari kerja",
    reason: "Istirahat pemulihan flu berat, surat dokter terlampir.",
    approver: "Rina Wijaya",
    status: "disetujui",
    statusLabel: "Disetujui HR",
    createdAt: "2026-11-08T09:30:00Z",
  },
  {
    id: "leave-demo-3",
    employeeName: "Siti Rahma",
    nip: "20240020",
    position: "UI/UX Researcher",
    requestNumber: "CT-2026-0111",
    leaveType: "Cuti keperluan penting",
    date: "15 November 2026",
    duration: "1 hari kerja",
    reason: "Urusan perpanjangan berkas kependudukan di instansi pemerintah.",
    approver: "Rina Wijaya",
    status: "menunggu",
    statusLabel: "Menunggu persetujuan HR",
    createdAt: "2026-11-08T14:15:00Z",
  },
];

const initialAdminLogs: AdminAttendanceLog[] = [
  {
    id: "log-1",
    employeeName: "Aditya Pratama",
    nip: "20240018",
    position: "Product Designer",
    time: "07.52 WIB",
    date: "9 Nov 2026",
    locationName: "UNPAM Viktor 2 (Area Kampus)",
    distanceMeters: 18,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.3457, 106.6918",
    status: "tepat_waktu",
  },
  {
    id: "log-2",
    employeeName: "Budi Santoso",
    nip: "20240019",
    position: "Frontend Developer",
    time: "07.45 WIB",
    date: "9 Nov 2026",
    locationName: "UNPAM Viktor 2 (Gedung Barat)",
    distanceMeters: 35,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.3459, 106.6919",
    status: "tepat_waktu",
  },
  {
    id: "log-3",
    employeeName: "Fajar Nugraha",
    nip: "20240021",
    position: "Backend Engineer",
    time: "08.15 WIB",
    date: "9 Nov 2026",
    locationName: "Jl. Raya Puspitek No. 12 (Luar Area)",
    distanceMeters: 320,
    maxRadiusMeters: 100,
    isWithinRadius: false,
    coordinates: "-6.3486, 106.6938",
    status: "terlambat",
  },
  {
    id: "log-4",
    employeeName: "Siti Rahma",
    nip: "20240020",
    position: "UI/UX Researcher",
    time: "07.50 WIB",
    date: "9 Nov 2026",
    locationName: "UNPAM Viktor 2 (Lobby Utama)",
    distanceMeters: 12,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.3458, 106.6917",
    status: "tepat_waktu",
  },
];

const initialAttendanceHistory: AttendanceRecord[] = [
  {
    id: "att-today",
    dateNumber: "09",
    dayName: "SEN",
    dateLabel: "Hari ini",
    timeRange: "Belum presensi",
    status: "belum",
    statusLabel: "Hari ini",
    location: "UNPAM Viktor 2",
  },
  {
    id: "att-06",
    dateNumber: "06",
    dayName: "JUM",
    dateLabel: "6 November",
    timeRange: "08.07 – 17.04",
    status: "terlambat",
    statusLabel: "Terlambat",
    location: "UNPAM Viktor 2",
  },
  {
    id: "att-05",
    dateNumber: "05",
    dayName: "KAM",
    dateLabel: "5 November",
    timeRange: "07.48 – 17.02",
    status: "tepat_waktu",
    statusLabel: "Tepat waktu",
    location: "UNPAM Viktor 2",
  },
  {
    id: "att-04",
    dateNumber: "04",
    dayName: "RAB",
    dateLabel: "4 November",
    timeRange: "Cuti tahunan",
    status: "cuti",
    statusLabel: "Disetujui",
    location: "UNPAM Viktor 2",
  },
  {
    id: "att-03",
    dateNumber: "03",
    dayName: "SEL",
    dateLabel: "3 November",
    timeRange: "07.50 – 17.06",
    status: "tepat_waktu",
    statusLabel: "Tepat waktu",
    location: "UNPAM Viktor 2",
  },
];

const MobileAppContext = createContext<MobileAppContextType | undefined>(undefined);

export function MobileAppProvider({ children }: { children: React.ReactNode }) {
  // Roles
  const [currentRole, setCurrentRole] = useState<UserRole>("karyawan");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>("beranda");
  const [adminTab, setAdminTab] = useState<AdminTab>("cuti");
  const [currentView, setCurrentView] = useState<AppView>("main");

  // User
  const [user] = useState<UserProfile>(defaultUser);

  // Attendance
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState("07.52");
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(initialAttendanceHistory);

  // GPS & UNPAM Viktor 2 State
  const [isGpsEnabled, setIsGpsEnabled] = useState(true);
  const [isInsideOffice, setIsInsideOffice] = useState(true);
  const [userLat, setUserLat] = useState(-6.3457);
  const [userLng, setUserLng] = useState(106.6918);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Leave Management
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(8);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [latestLeaveRequest, setLatestLeaveRequest] = useState<LeaveRequest | null>(null);

  // Admin: Employees
  const [employees, setEmployees] = useState<EmployeeItem[]>(initialEmployees);

  // Admin: Attendance logs
  const [adminAttendanceLogs, setAdminAttendanceLogs] = useState<AdminAttendanceLog[]>(initialAdminLogs);

  // Offline / Local Queue
  const [isOffline, setIsOffline] = useState(false);
  const [localQueue, setLocalQueue] = useState<LocalQueueItem[]>([]);

  // Active preset tracker
  const [activePresetNumber, setActivePresetNumber] = useState(2);

  // Calculate actual distance based on coordinates
  const currentDistance = calculateHaversineDistance(
    userLat,
    userLng,
    UNPAM_VIKTOR_LAT,
    UNPAM_VIKTOR_LNG
  );

  const gps: GPSStatus = {
    isGpsEnabled,
    isInsideOffice: isGpsEnabled ? currentDistance <= 100 : false,
    distanceMeters: isGpsEnabled ? currentDistance : 0,
    maxRadiusMeters: 100,
    accuracyMeters: 3,
    officeName: "UNPAM Viktor 2",
    officeAddress: "Gedung Viktor 2, Universitas Pamulang, Jl. Puspitek No. 46, Serpong, Tangerang Selatan",
    officeLat: UNPAM_VIKTOR_LAT,
    officeLng: UNPAM_VIKTOR_LNG,
    userLat,
    userLng,
    currentTimeString: "07.52 WIB",
    currentDateString: "Senin, 9 Nov 2026",
  };

  const hadirCount = hasClockedIn ? 5 : 4;
  const terlambatCount = 1;
  const cutiCount = 1;

  // Toggle GPS Sensor (On / Off)
  const toggleGpsEnabled = (enabled: boolean) => {
    setIsGpsEnabled(enabled);
    if (!enabled) {
      setLoginError("Sensor GPS dimatikan pada perangkat.");
    } else {
      setLoginError(null);
    }
  };

  // Toggle GPS inside vs outside UNPAM Viktor 2
  const toggleGpsLocation = (inside: boolean) => {
    setIsInsideOffice(inside);
    if (inside) {
      // Dekat Gedung Viktor 2 (~18 meter)
      setUserLat(-6.3457);
      setUserLng(106.6918);
    } else {
      // Di luar area kampus Viktor (~320 meter)
      setUserLat(-6.3486);
      setUserLng(106.6938);
    }
  };

  // Request actual hardware/browser GPS coordinates
  const requestRealBrowserGps = async (): Promise<{ success: boolean; message: string }> => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setIsGpsEnabled(false);
      return { success: false, message: "Browser tidak mendukung sensor lokasi GPS." };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGpsEnabled(true);
          const realLat = position.coords.latitude;
          const realLng = position.coords.longitude;
          setUserLat(realLat);
          setUserLng(realLng);

          const dist = calculateHaversineDistance(
            realLat,
            realLng,
            UNPAM_VIKTOR_LAT,
            UNPAM_VIKTOR_LNG
          );

          if (dist <= 100) {
            setIsInsideOffice(true);
            resolve({
              success: true,
              message: `GPS Aktif: Anda berada di dalam UNPAM Viktor 2 (${dist} meter).`,
            });
          } else {
            setIsInsideOffice(false);
            resolve({
              success: false,
              message: `GPS Aktif: Anda berada ${dist} meter dari UNPAM Viktor 2 (Di luar batas 100m).`,
            });
          }
        },
        (error) => {
          setIsGpsEnabled(false);
          let errMsg = "Izin akses lokasi GPS ditolak oleh pengguna.";
          if (error.code === error.POSITION_UNAVAILABLE) errMsg = "Sinyal GPS tidak tersedia pada perangkat.";
          if (error.code === error.TIMEOUT) errMsg = "Waktu deteksi GPS habis.";
          setLoginError(errMsg);
          resolve({ success: false, message: errMsg });
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  };

  // Strict Login at UNPAM Viktor 2
  const login = (email?: string, password?: string) => {
    setLoginError(null);

    // Aturan 1: GPS HP harus aktif
    if (!isGpsEnabled) {
      const msg = "Akses Ditolak: Sensor GPS HP Anda belum aktif! Silakan nyalakan lokasi pada perangkat untuk memvalidasi posisi Anda di UNPAM Viktor 2.";
      setLoginError(msg);
      return { success: false, message: msg };
    }

    // Aturan 2: HP harus berada di dalam radius 100 meter UNPAM Viktor 2
    if (!gps.isInsideOffice || gps.distanceMeters > 100) {
      const msg = `Akses Login Ditolak! Anda terdeteksi berada di luar area UNPAM Viktor 2 (Jarak: ${gps.distanceMeters} m, batas maksimal: 100 m). Sesuai kebijakan keamanan, login karyawan hanya dapat dilakukan di dalam area kampus UNPAM Viktor 2.`;
      setLoginError(msg);
      return { success: false, message: msg };
    }

    // Validasi lolos
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setLoginError(null);
    return { success: true, message: "Login berhasil di UNPAM Viktor 2" };
  };

  // Confirm Clock-In
  const confirmAttendance = () => {
    // Validasi 1: GPS harus aktif
    if (!isGpsEnabled) {
      return {
        success: false,
        queued: false,
        message: "Presensi Gagal: Sensor GPS HP tidak aktif! Silakan aktifkan izin lokasi perangkat Anda.",
      };
    }

    // Validasi 2: Di dalam UNPAM Viktor 2 (≤ 100m)
    if (!gps.isInsideOffice || gps.distanceMeters > 100) {
      return {
        success: false,
        queued: false,
        message: `Presensi Ditolak: Anda berada ${gps.distanceMeters} m di luar jangkauan UNPAM Viktor 2.`,
      };
    }

    if (isOffline) {
      const queueItem: LocalQueueItem = {
        id: "queue-" + Date.now(),
        type: "attendance",
        description: `Presensi masuk UNPAM Viktor 2 (07.52 WIB) - Offline`,
        timestamp: new Date().toISOString(),
        payload: {
          time: "07.52",
          date: "9 November 2026",
          location: "UNPAM Viktor 2",
          distance: gps.distanceMeters,
        },
      };
      setLocalQueue((prev) => [...prev, queueItem]);
    }

    setHasClockedIn(true);
    setClockInTime("07.52");

    // Update today's attendance in history
    setAttendanceHistory((prev) =>
      prev.map((item) =>
        item.id === "att-today"
          ? {
              ...item,
              timeRange: "07.52 – belum pulang",
              status: "tepat_waktu",
              statusLabel: "Hari ini",
              location: "UNPAM Viktor 2",
            }
          : item
      )
    );

    // Push to Admin Live Logs
    const newAdminLog: AdminAttendanceLog = {
      id: "log-" + Date.now(),
      employeeName: user.name,
      nip: user.nip,
      position: user.division,
      time: "07.52 WIB",
      date: "9 Nov 2026",
      locationName: "UNPAM Viktor 2",
      distanceMeters: gps.distanceMeters,
      maxRadiusMeters: 100,
      isWithinRadius: true,
      coordinates: `${userLat.toFixed(4)}, ${userLng.toFixed(4)}`,
      status: "tepat_waktu",
    };
    setAdminAttendanceLogs((prev) => [newAdminLog, ...prev]);

    setCurrentView("presensi_sukses");
    return { success: true, queued: isOffline, message: "Presensi berhasil di UNPAM Viktor 2" };
  };

  // Submit Leave Request
  const submitLeaveRequest = (leaveType: string, date: string, reason: string) => {
    const newRequest: LeaveRequest = {
      id: "leave-" + Date.now(),
      employeeName: user.name,
      nip: user.nip,
      position: "Product Designer",
      requestNumber: "CT-2026-" + Math.floor(1000 + Math.random() * 9000),
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

  // Admin Approval: Approve Leave
  const approveLeaveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "disetujui", statusLabel: "Disetujui HR" }
          : req
      )
    );
    setRemainingLeaveDays((prev) => Math.max(0, prev - 1));
  };

  // Admin Approval: Reject Leave
  const rejectLeaveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "ditolak", statusLabel: "Ditolak HR" }
          : req
      )
    );
  };

  // Admin: Add Employee
  const addEmployee = (newEmp: Omit<EmployeeItem, "id">) => {
    const created: EmployeeItem = {
      id: "emp-" + Date.now(),
      ...newEmp,
    };
    setEmployees((prev) => [created, ...prev]);
  };

  // Admin: Update Employee
  const updateEmployee = (id: string, updatedData: Partial<EmployeeItem>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  // Admin: Delete Employee
  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
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

  // Switch role between Karyawan and Admin HR
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === "admin") {
      setCurrentView("admin_portal");
    } else {
      setCurrentView("main");
      setActiveTab("beranda");
    }
  };

  // Auth Helpers
  const loginAsAdmin = () => {
    setIsLoggedIn(true);
    setCurrentRole("admin");
    setAdminTab("cuti");
    setCurrentView("admin_portal");
    setLoginError(null);
  };

  const loginAsKaryawan = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setLoginError(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
    setLoginError(null);
  };

  // Reset to default
  const resetToDefault = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setHasClockedIn(false);
    setIsGpsEnabled(true);
    setIsInsideOffice(true);
    setUserLat(-6.3457);
    setUserLng(106.6918);
    setRemainingLeaveDays(8);
    setLatestLeaveRequest(null);
    setLocalQueue([]);
    setIsOffline(false);
    setAttendanceHistory(initialAttendanceHistory);
    setEmployees(initialEmployees);
    setLeaveRequests(initialLeaveRequests);
    setLoginError(null);
    setActivePresetNumber(2);
  };

  // Jump directly to any preset
  const jumpToPreset = (num: number) => {
    setActivePresetNumber(num);
    switch (num) {
      case 1:
        setIsLoggedIn(false);
        setCurrentView("login");
        break;
      case 2:
        setIsLoggedIn(true);
        setCurrentRole("karyawan");
        setActiveTab("beranda");
        setCurrentView("main");
        setHasClockedIn(false);
        break;
      default:
        setIsLoggedIn(true);
        setCurrentRole("karyawan");
        setActiveTab("beranda");
        setCurrentView("main");
        break;
    }
  };

  return (
    <MobileAppContext.Provider
      value={{
        currentRole,
        switchRole,
        isLoggedIn,
        activeTab,
        adminTab,
        currentView,
        setActiveTab,
        setAdminTab,
        setCurrentView,
        user,
        hasClockedIn,
        clockInTime,
        attendanceHistory,
        hadirCount,
        terlambatCount,
        cutiCount,
        gps,
        toggleGpsEnabled,
        toggleGpsLocation,
        requestRealBrowserGps,
        confirmAttendance,
        remainingLeaveDays,
        leaveRequests,
        latestLeaveRequest,
        submitLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        adminAttendanceLogs,
        isOffline,
        toggleOfflineMode,
        localQueue,
        syncLocalQueue,
        loginError,
        setLoginError,
        login,
        loginAsAdmin,
        loginAsKaryawan,
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
