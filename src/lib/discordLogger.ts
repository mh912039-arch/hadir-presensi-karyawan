/**
 * Telemetri & Pemantauan Project Hadir ke Discord
 * Mengirimkan log aktivitas, presensi GPS, pengajuan cuti, dan alert error
 * langsung ke channel Discord internal (# 🚀﹕deployment-logs & # 🚨﹕security-alerts).
 */

const DISCORD_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL ||
  "https://discord.com/api/webhooks/1572125778248859688/BMS-8wTvP12m7yBMQZvTMY8ExLRvpOUNBU1QSDCnxsZC8tUnHNsyMMHKlL5yb5rKaOKQ";

async function postToDiscord(embed: Record<string, unknown>) {
  if (!DISCORD_WEBHOOK_URL) return;
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (err) {
    // Non-blocking logger: jangan ganggu alur UI jika offline
    console.debug("[Discord Logger] Failed to send telemetry:", err);
  }
}

export function logHadirAttendance(data: {
  employeeName: string;
  nip: string;
  position: string;
  locationName: string;
  distanceMeters: number;
  maxRadiusMeters: number;
  time: string;
}) {
  const embed = {
    title: "[PRESENSI] Presensi Karyawan Berhasil",
    description:
      `**Nama Karyawan:** ${data.employeeName} (${data.nip})\n` +
      `**Jabatan:** ${data.position}\n` +
      `**Lokasi Validasi:** ${data.locationName}\n` +
      `**Jarak GPS:** ${data.distanceMeters}m (Radius Izin: ${data.maxRadiusMeters}m)\n` +
      `**Waktu Tercatat:** ${data.time}\n` +
      `**Status:** Tepat Waktu (Dalam Geofence)`,
    color: 0x10b981, // Emerald Green
    timestamp: new Date().toISOString(),
    footer: { text: "Hadir Mobile App • UNPAM Viktor 2 Geofence" },
  };
  postToDiscord(embed);
}

export function logHadirLeaveRequest(data: {
  employeeName: string;
  nip: string;
  leaveType: string;
  date: string;
  reason: string;
}) {
  const embed = {
    title: "[PENGAJUAN] Pengajuan Cuti / Izin Baru",
    description:
      `**Nama Pemohon:** ${data.employeeName} (${data.nip})\n` +
      `**Jenis Pengajuan:** ${data.leaveType}\n` +
      `**Tanggal Efektif:** ${data.date}\n` +
      `**Alasan:** ${data.reason}\n` +
      `**Status Saat Ini:** Menunggu Persetujuan HR Manager`,
    color: 0xf59e0b, // Amber
    timestamp: new Date().toISOString(),
    footer: { text: "Hadir Mobile App • HR Portal" },
  };
  postToDiscord(embed);
}

export function logHadirApproval(data: {
  employeeName: string;
  nip: string;
  leaveType: string;
  date: string;
  decision: "Disetujui" | "Ditolak";
  approver: string;
}) {
  const isApproved = data.decision === "Disetujui";
  const embed = {
    title: `[KEPUTUSAN HR] Pengajuan Cuti ${data.decision.toUpperCase()}`,
    description:
      `**Karyawan:** ${data.employeeName} (${data.nip})\n` +
      `**Pengajuan:** ${data.leaveType} (${data.date})\n` +
      `**Keputusan HR:** ${data.decision}\n` +
      `**Approver:** ${data.approver}`,
    color: isApproved ? 0x3b82f6 : 0xef4444, // Blue or Red
    timestamp: new Date().toISOString(),
    footer: { text: "Hadir Mobile App • HR Governance" },
  };
  postToDiscord(embed);
}

export function logHadirSystemEvent(title: string, details: string, level: "info" | "warning" | "error" = "info") {
  const colorMap = {
    info: 0x06b6d4, // Cyan
    warning: 0xf59e0b, // Amber
    error: 0xef4444, // Red
  };
  const embed = {
    title: `[SISTEM HADIR] ${title}`,
    description: details,
    color: colorMap[level] || 0x06b6d4,
    timestamp: new Date().toISOString(),
    footer: { text: "Hadir Mobile App • Ops Monitor" },
  };
  postToDiscord(embed);
}
