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

  // GPS Simulation
  gps: GPSStatus;
  toggleGpsLocation: (inside: boolean) => void;
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

  // Auth
  login: (email?: string, password?: string) => void;
  loginAsAdmin: () => void;
  loginAsKaryawan: () => void;
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
    locationName: "Kantor Jakarta",
    distanceMeters: 24,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.2088, 106.8456",
    status: "tepat_waktu",
  },
  {
    id: "log-2",
    employeeName: "Budi Santoso",
    nip: "20240019",
    position: "Frontend Developer",
    time: "07.45 WIB",
    date: "9 Nov 2026",
    locationName: "Kantor Jakarta",
    distanceMeters: 35,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.2089, 106.8454",
    status: "tepat_waktu",
  },
  {
    id: "log-3",
    employeeName: "Fajar Nugraha",
    nip: "20240021",
    position: "Backend Engineer",
    time: "08.15 WIB",
    date: "9 Nov 2026",
    locationName: "Jl. Gatot Subroto No. 44 (Luar Area)",
    distanceMeters: 245,
    maxRadiusMeters: 100,
    isWithinRadius: false,
    coordinates: "-6.2301, 106.8211",
    status: "terlambat",
  },
  {
    id: "log-4",
    employeeName: "Siti Rahma",
    nip: "20240020",
    position: "UI/UX Researcher",
    time: "07.50 WIB",
    date: "9 Nov 2026",
    locationName: "Kantor Jakarta",
    distanceMeters: 18,
    maxRadiusMeters: 100,
    isWithinRadius: true,
    coordinates: "-6.2087, 106.8457",
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

  // GPS State
  const [isInsideOffice, setIsInsideOffice] = useState(true);

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

    // Update today's attendance in history
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

    // Also push to Admin Live Logs
    const newAdminLog: AdminAttendanceLog = {
      id: "log-" + Date.now(),
      employeeName: user.name,
      nip: user.nip,
      position: user.division,
      time: "07.52 WIB",
      date: "9 Nov 2026",
      locationName: "Kantor Jakarta",
      distanceMeters: 24,
      maxRadiusMeters: 100,
      isWithinRadius: true,
      coordinates: "-6.2088, 106.8456",
      status: "tepat_waktu",
    };
    setAdminAttendanceLogs((prev) => [newAdminLog, ...prev]);

    setCurrentView("presensi_sukses");
    return { success: true, queued: isOffline, message: "Presensi berhasil" };
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
    // If it's Aditya's request, decrement quota
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

  // Auto-sync when coming back online
  useEffect(() => {
    if (!isOffline && localQueue.length > 0) {
      const timer = setTimeout(() => {
        syncLocalQueue();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOffline, localQueue.length]);

  // Auth Helpers
  const login = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const loginAsAdmin = () => {
    setIsLoggedIn(true);
    setCurrentRole("admin");
    setAdminTab("cuti");
    setCurrentView("admin_portal");
  };

  const loginAsKaryawan = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  // Reset to default
  const resetToDefault = () => {
    setIsLoggedIn(true);
    setCurrentRole("karyawan");
    setActiveTab("beranda");
    setCurrentView("main");
    setHasClockedIn(false);
    setIsInsideOffice(true);
    setRemainingLeaveDays(8);
    setLatestLeaveRequest(null);
    setLocalQueue([]);
    setIsOffline(false);
    setAttendanceHistory(initialAttendanceHistory);
    setEmployees(initialEmployees);
    setLeaveRequests(initialLeaveRequests);
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
        toggleGpsLocation,
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
