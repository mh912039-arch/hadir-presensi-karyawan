export type NavigationTab = "beranda" | "riwayat" | "cuti" | "profil";

export type AppView =
  | "login"
  | "main"
  | "presensi_gps"
  | "presensi_sukses"
  | "pengajuan_cuti"
  | "pengajuan_sukses";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  division: string;
  nip: string;
  status: "Aktif" | "Nonaktif";
  companyName: string;
  employmentStatus: string;
  joinDate: string;
  workLocation: string;
}

export type AttendanceStatus = "tepat_waktu" | "terlambat" | "cuti" | "belum";

export interface AttendanceRecord {
  id: string;
  dateNumber: string;
  dayName: string;
  dateLabel: string;
  timeRange: string;
  status: AttendanceStatus;
  statusLabel: string;
  timeIn?: string;
  timeOut?: string;
  location?: string;
  distance?: number;
}

export interface LeaveRequest {
  id: string;
  requestNumber: string;
  leaveType: string;
  date: string;
  duration: string;
  reason: string;
  approver: string;
  status: "menunggu" | "disetujui" | "ditolak";
  statusLabel: string;
  createdAt: string;
}

export interface GPSStatus {
  isInsideOffice: boolean;
  distanceMeters: number;
  maxRadiusMeters: number;
  accuracyMeters: number;
  officeName: string;
  officeAddress: string;
  currentTimeString: string;
  currentDateString: string;
}

export interface LocalQueueItem {
  id: string;
  type: "attendance" | "leave";
  description: string;
  timestamp: string;
  payload: Record<string, unknown>;
}
