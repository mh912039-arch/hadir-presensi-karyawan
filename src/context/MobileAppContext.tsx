"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  logHadirAttendance,
  logHadirLeaveRequest,
  logHadirApproval,
} from "@/lib/discordLogger";
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
  AppNotification,
  NotificationType,
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
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeUserId: string;
  setActiveEmployee: (id: string, autoSwitchToKaryawan?: boolean) => void;

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

  // In-App & Device Notifications
  notifications: AppNotification[];
  activeBannerNotification: AppNotification | null;
  unreadNotificationCount: number;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  dismissBannerNotification: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  requestNotificationPermission: () => Promise<boolean>;

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
  login: (email?: string, password?: string) => Promise<{ success: boolean; message: string }>;
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
  role: "Product Designer",
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

const initialNotifications: AppNotification[] = [
  {
    id: "notif-init-1",
    recipientNip: "20240018",
    title: "Sistem Presensi Siap",
    message: "Validasi radius presensi kampus UNPAM Viktor 2 (100 meter) telah aktif.",
    type: "system",
    timestamp: "2026-11-09T07:30:00Z",
    timeLabel: "07.30 WIB",
    read: true,
  },
];

function playNotificationTone(type: "approved" | "rejected" | "default" = "default") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "approved") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.14);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "rejected") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(440.0, now + 0.16);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch {
    // Ignore audio permission/autoplay restrictions
  }
}

const MobileAppContext = createContext<MobileAppContextType | undefined>(undefined);

export function MobileAppProvider({ children }: { children: React.ReactNode }) {
  // Roles
  const [currentRole, setCurrentRole] = useState<UserRole>("karyawan");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>("beranda");
  const [adminTab, setAdminTab] = useState<AdminTab>("cuti");
  const [currentView, setCurrentView] = useState<AppView>("login");

  // User & Active Account
  const [activeUserId, setActiveUserId] = useState<string>("emp-1");
  const [user, setUser] = useState<UserProfile>(defaultUser);

  // In-App & Device Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [activeBannerNotification, setActiveBannerNotification] = useState<AppNotification | null>(null);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

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

  // Hydrate from localStorage on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      let loadedEmployees = initialEmployees;
      const savedEmployees = localStorage.getItem("hadir_employees");
      if (savedEmployees) {
        const parsed = JSON.parse(savedEmployees);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedEmployees = parsed;
          setEmployees(parsed);
        }
      }

      const savedUserId = localStorage.getItem("hadir_active_user_id");
      const activeId = savedUserId || "emp-1";
      setActiveUserId(activeId);

      const savedUser = localStorage.getItem("hadir_active_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name) {
          setUser(parsed);
        }
      } else {
        const target = loadedEmployees.find((e) => e.id === activeId) || loadedEmployees[0];
        if (target) {
          setUser({
            name: target.name,
            email: target.email,
            role: target.position,
            division: target.division.startsWith("Divisi ") ? target.division : `Divisi ${target.division}`,
            nip: target.nip,
            status: target.status,
            companyName: "PT Nusantara Digital",
            employmentStatus: "Karyawan tetap",
            joinDate: target.joinDate || "8 Januari 2024",
            workLocation: "UNPAM Viktor 2",
          });
        }
      }

      const savedLeaves = localStorage.getItem("hadir_leave_requests");
      if (savedLeaves) {
        const parsed = JSON.parse(savedLeaves);
        if (Array.isArray(parsed)) setLeaveRequests(parsed);
      }

      const savedLogs = localStorage.getItem("hadir_attendance_logs");
      if (savedLogs) {
        const parsed = JSON.parse(savedLogs);
        if (Array.isArray(parsed)) setAdminAttendanceLogs(parsed);
      }

      const savedNotifications = localStorage.getItem("hadir_notifications");
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotifications(parsed);
        }
      }

      const savedLoggedIn = localStorage.getItem("hadir_is_logged_in");
      if (savedLoggedIn === "true") {
        setIsLoggedIn(true);
        const savedRole = (localStorage.getItem("hadir_current_role") as UserRole) || "karyawan";
        setCurrentRole(savedRole);
        if (savedRole === "admin") {
          setCurrentView("admin_portal");
        } else {
          setCurrentView("main");
          setActiveTab("beranda");
        }
      } else {
        setIsLoggedIn(false);
        setCurrentView("login");
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
  }, []);

  // Continuous Real GPS Tracking on Device / Phone
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    let watchId: number | null = null;
    try {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setIsGpsEnabled(true);
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserLat(lat);
          setUserLng(lng);
          const dist = calculateHaversineDistance(lat, lng, UNPAM_VIKTOR_LAT, UNPAM_VIKTOR_LNG);
          setIsInsideOffice(dist <= 100);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED || err.code === err.POSITION_UNAVAILABLE) {
            setIsGpsEnabled(false);
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 3000,
          timeout: 10000,
        }
      );
    } catch (e) {
      console.warn("Geolocation watch init failed:", e);
    }

    return () => {
      if (watchId !== null && typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Calculate unread notification count for the active employee
  const unreadNotificationCount = notifications.filter(
    (n) => !n.read && (n.recipientNip === user.nip || n.recipientNip === "all")
  ).length;

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

  // Strict Login at UNPAM Viktor 2 (Validasi GPS HP Asli & Pengecualian Akun Uji Coba Aditya)
  const login = async (
    email?: string,
    password?: string
  ): Promise<{ success: boolean; message: string }> => {
    setLoginError(null);

    const cleanInput = (email || "").trim().toLowerCase();
    const isAdityaTestAccount =
      cleanInput === "aditya@nusantara.co.id" ||
      cleanInput === "20240018" ||
      cleanInput.includes("aditya");

    // Match employee by email if provided
    let matched: EmployeeItem | undefined;
    if (email) {
      matched = employees.find(
        (e) =>
          e.email.trim().toLowerCase() === cleanInput ||
          e.nip.trim().toLowerCase() === cleanInput
      );
    }

    if (matched && password) {
      if (matched.password && matched.password !== password) {
        const msg = "Kata sandi yang Anda masukkan salah.";
        setLoginError(msg);
        return { success: false, message: msg };
      }
    } else if (!matched && !isAdityaTestAccount) {
      const msg = "Akun karyawan tidak ditemukan. Periksa kembali email atau NIP Anda.";
      setLoginError(msg);
      return { success: false, message: msg };
    }

    // VALIDASI GPS HP UNTUK KARYAWAN (SELAIN AKUN UJI COBA ADITYA)
    if (!isAdityaTestAccount) {
      if (typeof window === "undefined" || !navigator.geolocation) {
        const msg = "Akses Ditolak: Browser atau perangkat Anda tidak mendukung sensor lokasi GPS.";
        setLoginError(msg);
        return { success: false, message: msg };
      }

      let realLat = userLat;
      let realLng = userLng;
      let gpsSuccess = false;

      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 0,
          });
        });
        realLat = pos.coords.latitude;
        realLng = pos.coords.longitude;
        setUserLat(realLat);
        setUserLng(realLng);
        setIsGpsEnabled(true);
        gpsSuccess = true;
      } catch (err: unknown) {
        const geoErr = err as GeolocationPositionError;
        setIsGpsEnabled(false);
        let detail = "Sensor GPS HP belum aktif atau izin akses lokasi ditolak.";
        if (geoErr && geoErr.code === 2) {
          detail = "Sinyal GPS perangkat tidak dapat dideteksi. Pastikan lokasi HP sudah dinyalakan.";
        } else if (geoErr && geoErr.code === 3) {
          detail = "Waktu verifikasi GPS habis. Silakan coba lagi.";
        }
        const msg = `Akses Ditolak: ${detail} Login hanya diizinkan di dalam area UNPAM Viktor 2.`;
        setLoginError(msg);
        return { success: false, message: msg };
      }

      if (!gpsSuccess) {
        const msg = "Akses Ditolak: Sensor GPS HP Anda belum aktif! Silakan nyalakan lokasi pada perangkat untuk memvalidasi posisi Anda di UNPAM Viktor 2.";
        setLoginError(msg);
        return { success: false, message: msg };
      }

      // Validasi Radius 100m dari UNPAM Viktor 2
      const dist = calculateHaversineDistance(realLat, realLng, UNPAM_VIKTOR_LAT, UNPAM_VIKTOR_LNG);
      setIsInsideOffice(dist <= 100);

      if (dist > 100) {
        const formattedDist = dist >= 1000 ? `${(dist / 1000).toFixed(1)} km` : `${dist} meter`;
        const msg = `Akses Login Ditolak! Anda terdeteksi berada di luar area UNPAM Viktor 2 (Jarak terdeteksi: ${formattedDist}, batas aman: 100 meter). Sesuai kebijakan keamanan, login karyawan hanya dapat dilakukan di dalam area kampus UNPAM Viktor 2.`;
        setLoginError(msg);
        return { success: false, message: msg };
      }
    } else {
      // Akun Uji Coba Aditya: Bebas radius, perbarui koordinat jika ada
      if (typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLat(pos.coords.latitude);
            setUserLng(pos.coords.longitude);
            setIsGpsEnabled(true);
          },
          () => {},
          { enableHighAccuracy: true, timeout: 3000 }
        );
      }
    }

    // Set active user
    const targetEmployee = matched || employees[0];
    if (targetEmployee) {
      setActiveUserId(targetEmployee.id);
      const newUser: UserProfile = {
        name: targetEmployee.name,
        email: targetEmployee.email,
        role: targetEmployee.position,
        division: targetEmployee.division.startsWith("Divisi ") ? targetEmployee.division : `Divisi ${targetEmployee.division}`,
        nip: targetEmployee.nip,
        status: targetEmployee.status,
        companyName: "PT Nusantara Digital",
        employmentStatus: "Karyawan tetap",
        joinDate: targetEmployee.joinDate || "8 Januari 2024",
        workLocation: "UNPAM Viktor 2",
      };
      setUser(newUser);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_active_user", JSON.stringify(newUser));
          localStorage.setItem("hadir_active_user_id", targetEmployee.id);
        } catch (e) {}
      }
    }

    // Validasi lolos
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setLoginError(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hadir_is_logged_in", "true");
        localStorage.setItem("hadir_current_role", "karyawan");
      } catch (e) {}
    }
    return {
      success: true,
      message: isAdityaTestAccount
        ? "Login berhasil (Akun Uji Coba: Aditya Pratama)"
        : "Login berhasil di UNPAM Viktor 2",
    };
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

    const isAdityaTestAccount =
      user.email.toLowerCase().includes("aditya") ||
      user.nip === "20240018";

    // Validasi 2: Di dalam UNPAM Viktor 2 (≤ 100m) untuk akun selain uji coba
    if (!isAdityaTestAccount && (!gps.isInsideOffice || gps.distanceMeters > 100)) {
      const formattedDist = gps.distanceMeters >= 1000 ? `${(gps.distanceMeters / 1000).toFixed(1)} km` : `${gps.distanceMeters} m`;
      return {
        success: false,
        queued: false,
        message: `Presensi Ditolak: Anda berada ${formattedDist} di luar jangkauan UNPAM Viktor 2 (Batas maksimal 100 m).`,
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
      position: user.role,
      time: "07.52 WIB",
      date: "9 Nov 2026",
      locationName: "UNPAM Viktor 2",
      distanceMeters: gps.distanceMeters,
      maxRadiusMeters: 100,
      isWithinRadius: true,
      coordinates: `${userLat.toFixed(4)}, ${userLng.toFixed(4)}`,
      status: "tepat_waktu",
    };
    setAdminAttendanceLogs((prev) => {
      const next = [newAdminLog, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_attendance_logs", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // Telemetri Discord Live
    logHadirAttendance({
      employeeName: user.name,
      nip: user.nip,
      position: user.role,
      locationName: "UNPAM Viktor 2",
      distanceMeters: gps.distanceMeters,
      maxRadiusMeters: 100,
      time: "07.52 WIB",
    });

    setCurrentView("presensi_sukses");
    return { success: true, queued: isOffline, message: "Presensi berhasil di UNPAM Viktor 2" };
  };

  // Submit Leave Request
  const submitLeaveRequest = (leaveType: string, date: string, reason: string) => {
    const newRequest: LeaveRequest = {
      id: "leave-" + Date.now(),
      employeeName: user.name,
      nip: user.nip,
      position: user.role,
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
    setLeaveRequests((prev) => {
      const next = [newRequest, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_leave_requests", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // Telemetri Discord Live
    logHadirLeaveRequest({
      employeeName: user.name,
      nip: user.nip,
      leaveType: newRequest.leaveType,
      date: newRequest.date,
      reason: newRequest.reason,
    });

    setCurrentView("pengajuan_sukses");
    return { success: true, queued: isOffline };
  };

  // Admin Approval: Approve Leave & Trigger Notification to Employee Phone
  const approveLeaveRequest = (id: string) => {
    let targetReq: LeaveRequest | undefined;

    setLeaveRequests((prev) => {
      targetReq = prev.find((req) => req.id === id);
      const next = prev.map((req) =>
        req.id === id
          ? { ...req, status: "disetujui" as const, statusLabel: "Disetujui HR" }
          : req
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_leave_requests", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    setRemainingLeaveDays((prev) => Math.max(0, prev - 1));

    // Create Push Notification for the Employee
    const notifTitle = "Pengajuan Cuti Disetujui";
    const notifMessage = `Pengajuan ${targetReq?.leaveType || "Cuti"} Anda (${targetReq?.date || "13 November 2026"}) telah DISETUJUI oleh HR Manager. Kuota cuti berkurang 1 hari.`;

    const newNotif: AppNotification = {
      id: "notif-" + Date.now(),
      recipientNip: targetReq ? targetReq.nip : user.nip,
      title: notifTitle,
      message: notifMessage,
      type: "leave_approved",
      timestamp: new Date().toISOString(),
      timeLabel: "Baru saja",
      read: false,
      leaveRequestId: id,
    };

    setNotifications((prev) => {
      const next = [newNotif, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_notifications", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // Display In-App Floating Push Notification Banner
    setActiveBannerNotification(newNotif);

    // Audio chime feedback
    playNotificationTone("approved");

    // Native Browser Push Notification
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        if (Notification.permission === "granted") {
          new Notification(`hadir. • ${notifTitle}`, {
            body: notifMessage,
            icon: "/icons/icon-192.png",
          });
        }
      } catch (e) {
        console.error("Browser notification error:", e);
      }
    }

    // Telemetri Discord Live
    logHadirApproval({
      employeeName: targetReq?.employeeName || user.name,
      nip: targetReq?.nip || user.nip,
      leaveType: targetReq?.leaveType || "Cuti Tahunan",
      date: targetReq?.date || "13 November 2026",
      decision: "Disetujui",
      approver: "Rina Wijaya (HR Manager)",
    });
  };

  // Admin Approval: Reject Leave & Trigger Notification to Employee Phone
  const rejectLeaveRequest = (id: string) => {
    let targetReq: LeaveRequest | undefined;

    setLeaveRequests((prev) => {
      targetReq = prev.find((req) => req.id === id);
      const next = prev.map((req) =>
        req.id === id
          ? { ...req, status: "ditolak" as const, statusLabel: "Ditolak HR" }
          : req
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_leave_requests", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // Create Push Notification for the Employee
    const notifTitle = "Pengajuan Cuti Ditolak";
    const notifMessage = `Pengajuan ${targetReq?.leaveType || "Cuti"} Anda (${targetReq?.date || "13 November 2026"}) DITOLAK oleh HR Manager.`;

    const newNotif: AppNotification = {
      id: "notif-" + Date.now(),
      recipientNip: targetReq ? targetReq.nip : user.nip,
      title: notifTitle,
      message: notifMessage,
      type: "leave_rejected",
      timestamp: new Date().toISOString(),
      timeLabel: "Baru saja",
      read: false,
      leaveRequestId: id,
    };

    setNotifications((prev) => {
      const next = [newNotif, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_notifications", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // Display In-App Floating Push Notification Banner
    setActiveBannerNotification(newNotif);

    // Audio chime feedback
    playNotificationTone("rejected");

    // Native Browser Push Notification
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        if (Notification.permission === "granted") {
          new Notification(`hadir. • ${notifTitle}`, {
            body: notifMessage,
            icon: "/icons/icon-192.png",
          });
        }
      } catch (e) {
        console.error("Browser notification error:", e);
      }
    }

    // Telemetri Discord Live
    logHadirApproval({
      employeeName: targetReq?.employeeName || user.name,
      nip: targetReq?.nip || user.nip,
      leaveType: targetReq?.leaveType || "Cuti Tahunan",
      date: targetReq?.date || "13 November 2026",
      decision: "Ditolak",
      approver: "Rina Wijaya (HR Manager)",
    });
  };

  // Notification action handlers
  const dismissBannerNotification = () => {
    setActiveBannerNotification(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_notifications", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
    if (activeBannerNotification?.id === id) {
      setActiveBannerNotification(null);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_notifications", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
    setActiveBannerNotification(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setActiveBannerNotification(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("hadir_notifications");
      } catch (e) {}
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch {
      return false;
    }
  };

  // Admin: Add Employee
  const addEmployee = (newEmp: Omit<EmployeeItem, "id">) => {
    const created: EmployeeItem = {
      id: "emp-" + Date.now(),
      ...newEmp,
    };
    setEmployees((prev) => {
      const next = [created, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_employees", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
  };

  // Switch or set active employee for testing & employee view
  const setActiveEmployee = (id: string, autoSwitchToKaryawan = false) => {
    const target = employees.find((e) => e.id === id);
    if (!target) return;

    setActiveUserId(id);
    const nextUser: UserProfile = {
      name: target.name,
      email: target.email,
      role: target.position,
      division: target.division.startsWith("Divisi ") ? target.division : `Divisi ${target.division}`,
      nip: target.nip,
      status: target.status,
      companyName: "PT Nusantara Digital",
      employmentStatus: "Karyawan tetap",
      joinDate: target.joinDate || "8 Januari 2024",
      workLocation: "UNPAM Viktor 2",
    };
    setUser(nextUser);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hadir_active_user_id", id);
        localStorage.setItem("hadir_active_user", JSON.stringify(nextUser));
      } catch (e) {}
    }

    if (autoSwitchToKaryawan) {
      setCurrentRole("karyawan");
      setActiveTab("beranda");
      setCurrentView("main");
    }
  };

  // Admin: Update Employee
  const updateEmployee = (id: string, updatedData: Partial<EmployeeItem>) => {
    let oldEmp: EmployeeItem | undefined;

    setEmployees((prev) => {
      oldEmp = prev.find((e) => e.id === id);
      const next = prev.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_employees", JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });

    // Check if edited employee is the currently active employee
    const isCurrentActiveUser =
      id === activeUserId ||
      (oldEmp && (user.email.toLowerCase() === oldEmp.email.toLowerCase() || user.nip === oldEmp.nip)) ||
      (!activeUserId && id === "emp-1");

    if (isCurrentActiveUser) {
      setUser((prev) => {
        const nextUser: UserProfile = {
          ...prev,
          name: updatedData.name !== undefined ? updatedData.name : prev.name,
          nip: updatedData.nip !== undefined ? updatedData.nip : prev.nip,
          role: updatedData.position !== undefined ? updatedData.position : prev.role,
          division: updatedData.division !== undefined
            ? (updatedData.division.startsWith("Divisi ") ? updatedData.division : `Divisi ${updatedData.division}`)
            : prev.division,
          email: updatedData.email !== undefined ? updatedData.email : prev.email,
          status: updatedData.status !== undefined ? updatedData.status : prev.status,
        };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("hadir_active_user", JSON.stringify(nextUser));
          } catch (e) {}
        }
        return nextUser;
      });
    }

    // Synchronize leave requests for this employee
    setLeaveRequests((prev) => {
      const nextRequests = prev.map((req) => {
        const match =
          (oldEmp && (req.nip === oldEmp.nip || req.employeeName === oldEmp.name)) ||
          req.nip === updatedData.nip;
        if (match) {
          return {
            ...req,
            employeeName: updatedData.name ?? req.employeeName,
            nip: updatedData.nip ?? req.nip,
            position: updatedData.position ?? req.position,
          };
        }
        return req;
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_leave_requests", JSON.stringify(nextRequests));
        } catch (e) {}
      }
      return nextRequests;
    });

    // Synchronize attendance logs for this employee
    setAdminAttendanceLogs((prev) => {
      const nextLogs = prev.map((log) => {
        const match =
          (oldEmp && (log.nip === oldEmp.nip || log.employeeName === oldEmp.name)) ||
          log.nip === updatedData.nip;
        if (match) {
          return {
            ...log,
            employeeName: updatedData.name ?? log.employeeName,
            nip: updatedData.nip ?? log.nip,
            position: updatedData.position ?? log.position,
          };
        }
        return log;
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_attendance_logs", JSON.stringify(nextLogs));
        } catch (e) {}
      }
      return nextLogs;
    });
  };

  // Admin: Delete Employee
  const deleteEmployee = (id: string) => {
    setEmployees((prev) => {
      const next = prev.filter((emp) => emp.id !== id);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("hadir_employees", JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
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
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hadir_is_logged_in", "true");
        localStorage.setItem("hadir_current_role", "admin");
      } catch (e) {}
    }
  };

  const loginAsKaryawan = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setLoginError(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hadir_is_logged_in", "true");
        localStorage.setItem("hadir_current_role", "karyawan");
      } catch (e) {}
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
    setLoginError(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("hadir_is_logged_in");
        localStorage.removeItem("hadir_current_role");
      } catch (e) {}
    }
  };

  // Reset to default
  const resetToDefault = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("hadir_employees");
        localStorage.removeItem("hadir_active_user");
        localStorage.removeItem("hadir_active_user_id");
        localStorage.removeItem("hadir_leave_requests");
        localStorage.removeItem("hadir_attendance_logs");
        localStorage.removeItem("hadir_notifications");
      } catch (e) {}
    }
    setUser(defaultUser);
    setActiveUserId("emp-1");
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
    setAdminAttendanceLogs(initialAdminLogs);
    setNotifications(initialNotifications);
    setActiveBannerNotification(null);
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
        setUser,
        activeUserId,
        setActiveEmployee,
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
        notifications,
        activeBannerNotification,
        unreadNotificationCount,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        dismissBannerNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        requestNotificationPermission,
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
