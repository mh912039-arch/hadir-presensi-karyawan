export type NavigationTab = "beranda" | "riwayat" | "cuti" | "profil";
export type AdminTab = "cuti" | "presensi" | "karyawan";
export type UserRole = "karyawan" | "admin";

export type AppView =
  | "login"
  | "main"
  | "presensi_gps"
  | "presensi_sukses"
  | "pengajuan_cuti"
  | "pengajuan_sukses"
  | "admin_portal";

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
  employeeName: string;
  nip: string;
  position: string;
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
  isGpsEnabled: boolean;
  isInsideOffice: boolean;
  distanceMeters: number;
  maxRadiusMeters: number;
  accuracyMeters: number;
  officeName: string;
  officeAddress: string;
  officeLat: number;
  officeLng: number;
  userLat: number;
  userLng: number;
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

export interface EmployeeItem {
  id: string;
  name: string;
  nip: string;
  position: string;
  division: string;
  email: string;
  password: string;
  status: "Aktif" | "Nonaktif";
  joinDate: string;
}

export interface AdminAttendanceLog {
  id: string;
  employeeName: string;
  nip: string;
  position: string;
  time: string;
  date: string;
  locationName: string;
  distanceMeters: number;
  maxRadiusMeters: number;
  isWithinRadius: boolean;
  coordinates: string;
  status: "tepat_waktu" | "terlambat";
}

export type NotificationType = "leave_approved" | "leave_rejected" | "system";

export interface AppNotification {
  id: string;
  recipientNip: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  timeLabel: string;
  read: boolean;
  leaveRequestId?: string;
}
