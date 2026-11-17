import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

os.makedirs(r"D:\TUGAS\SIM SMT5\docs\diagram_images", exist_ok=True)

# ----------------- 1. Flowchart Sistem Berjalan (Gambar 2.1) -----------------
def generate_flowchart_berjalan():
    fig, ax = plt.subplots(figsize=(9, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    # Styles
    box_blue = dict(boxstyle="round,pad=0.5", fc="#E8F1F5", ec="#1B4965", lw=1.5)
    box_green = dict(boxstyle="round,pad=0.5", fc="#EAF6EE", ec="#0D7A57", lw=1.5)
    box_amber = dict(boxstyle="round,pad=0.5", fc="#FFF3E0", ec="#E65100", lw=1.5)
    box_gray = dict(boxstyle="round,pad=0.5", fc="#F5F5F5", ec="#616161", lw=1.5)
    diamond = dict(boxstyle="square,pad=0.6", fc="#FFF8E1", ec="#F57F17", lw=1.5)

    # Column Titles
    ax.text(2.5, 8.1, "ENTITAS KARYAWAN", ha="center", va="center", fontsize=11, fontweight="bold", color="#1B4965")
    ax.text(7.5, 8.1, "ENTITAS ADMIN HR", ha="center", va="center", fontsize=11, fontweight="bold", color="#0D7A57")
    ax.axvline(x=5.0, ymin=0.05, ymax=0.95, color="#D0D0D0", linestyle="--", lw=1.2)

    # Nodes Karyawan
    ax.text(2.5, 7.3, "1. Datang di Kantor\n(UNPAM Viktor 2)", ha="center", va="center", fontsize=9.5, bbox=box_blue)
    ax.text(2.5, 6.0, "2. Tanda Tangan Manual\nBuku Absensi Fisik", ha="center", va="center", fontsize=9.5, bbox=box_blue)
    ax.text(2.5, 4.6, "3. Mengisi Formulir Cuti\nKertas / Chat WhatsApp", ha="center", va="center", fontsize=9.5, bbox=box_blue)
    ax.text(2.5, 2.0, "6. Menerima Keputusan\n& Menjalankan Cuti", ha="center", va="center", fontsize=9.5, bbox=box_green)

    # Nodes Admin HR
    ax.text(7.5, 4.6, "4. Menerima Berkas / Chat\nPengajuan Cuti Karyawan", ha="center", va="center", fontsize=9.5, bbox=box_green)
    ax.text(7.5, 3.4, "5. Cek Sisa Kuota Cuti\ndi Buku Arsip Catatan", ha="center", va="center", fontsize=9.5, bbox=box_amber)
    ax.text(7.5, 2.0, "Disetujui\nManajer?", ha="center", va="center", fontsize=9.5, fontweight="bold", bbox=diamond)
    ax.text(7.5, 0.7, "7. Akhir Bulan: Salin Manual\nRekap Absensi ke Excel", ha="center", va="center", fontsize=9.5, bbox=box_gray)

    # Arrows
    arrow = dict(arrowstyle="->", color="#333333", lw=1.5)
    ax.annotate("", xy=(2.5, 6.4), xytext=(2.5, 6.9), arrowprops=arrow)
    ax.annotate("", xy=(2.5, 5.0), xytext=(2.5, 5.6), arrowprops=arrow)
    ax.annotate("", xy=(6.0, 4.6), xytext=(4.0, 4.6), arrowprops=arrow)
    ax.annotate("", xy=(7.5, 3.8), xytext=(7.5, 4.2), arrowprops=arrow)
    ax.annotate("", xy=(7.5, 2.4), xytext=(7.5, 3.0), arrowprops=arrow)
    
    # Decision branches
    ax.annotate("Ya", xy=(4.0, 2.0), xytext=(6.5, 2.0), arrowprops=arrow, fontsize=9, fontweight="bold")
    ax.annotate("", xy=(7.5, 1.1), xytext=(7.5, 1.6), arrowprops=arrow)
    ax.text(7.7, 1.35, "Laporan", fontsize=8, color="#555555")

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\flowchart_berjalan.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 2. DFD Level 0 / Diagram Konteks (Gambar 3.1) -----------------
def generate_dfd_0():
    fig, ax = plt.subplots(figsize=(9, 5.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6.5)
    ax.axis('off')

    # Entities
    entity_style = dict(boxstyle="square,pad=0.6", fc="#EBF3F8", ec="#1B4965", lw=2)
    center_style = dict(boxstyle="circle,pad=0.8", fc="#E8F6ED", ec="#0D7A57", lw=2.2)

    ax.text(1.5, 3.25, "ENTITAS\nKARYAWAN", ha="center", va="center", fontsize=11, fontweight="bold", bbox=entity_style)
    ax.text(5.0, 3.25, "0.0\nSISTEM INFORMASI\nPRESENSI & KEPEGAWAIAN\n(hadir.)", ha="center", va="center", fontsize=10, fontweight="bold", bbox=center_style, color="#0C2B22")
    ax.text(8.5, 3.25, "ENTITAS\nADMIN HR /\nMANAJEMEN", ha="center", va="center", fontsize=11, fontweight="bold", bbox=entity_style)

    arrow_k_in = dict(arrowstyle="->", color="#0D7A57", lw=1.4)
    arrow_k_out = dict(arrowstyle="->", color="#1B4965", lw=1.4)

    # Karyawan -> Sistem
    ax.annotate("", xy=(3.6, 3.7), xytext=(2.4, 3.7), arrowprops=arrow_k_in)
    ax.text(3.0, 3.85, "Kredensial Login, Titik GPS HP,\nFormulir Pengajuan Cuti", ha="center", va="bottom", fontsize=8, color="#0D7A57")

    # Sistem -> Karyawan
    ax.annotate("", xy=(2.4, 2.8), xytext=(3.6, 2.8), arrowprops=arrow_k_out)
    ax.text(3.0, 2.45, "Status Presensi Sah / Tolak,\nNotifikasi Keputusan Cuti", ha="center", va="top", fontsize=8, color="#1B4965")

    # Admin -> Sistem
    ax.annotate("", xy=(6.4, 3.7), xytext=(7.6, 3.7), arrowprops=arrow_k_in)
    ax.text(7.0, 3.85, "Putusan Cuti (Setujui / Tolak),\nKelola Master Pegawai", ha="center", va="bottom", fontsize=8, color="#0D7A57")

    # Sistem -> Admin
    ax.annotate("", xy=(7.6, 2.8), xytext=(6.4, 2.8), arrowprops=arrow_k_out)
    ax.text(7.0, 2.45, "Log Presensi GPS Real-time,\nLaporan Rekapitulasi Kehadiran", ha="center", va="top", fontsize=8, color="#1B4965")

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\dfd_level_0.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 3. DFD Level 1 (Gambar 3.2) -----------------
def generate_dfd_1():
    fig, ax = plt.subplots(figsize=(9.5, 6.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    proc_style = dict(boxstyle="circle,pad=0.5", fc="#E8F6ED", ec="#0D7A57", lw=1.8)
    store_style = dict(boxstyle="round,pad=0.4", fc="#FFFDE7", ec="#FBC02D", lw=1.6)
    entity_style = dict(boxstyle="square,pad=0.5", fc="#EBF3F8", ec="#1B4965", lw=1.8)

    # Entities
    ax.text(0.9, 5.8, "KARYAWAN", ha="center", va="center", fontsize=10, fontweight="bold", bbox=entity_style)
    ax.text(9.1, 2.2, "ADMIN HR", ha="center", va="center", fontsize=10, fontweight="bold", bbox=entity_style)

    # Processes
    ax.text(3.2, 5.8, "1.0\nAutentikasi\nPengguna", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=proc_style)
    ax.text(6.8, 5.8, "2.0\nPresensi GPS\n& Geo-fencing", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=proc_style)
    ax.text(3.2, 2.2, "3.0\nPengajuan &\nPersetujuan Cuti", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=proc_style)
    ax.text(6.8, 2.2, "4.0\nKelola Pegawai &\nLaporan Eksekutif", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=proc_style)

    # Data Stores
    ax.text(5.0, 7.0, "[ D1: Master Karyawan & Akun ]", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=store_style)
    ax.text(5.0, 4.2, "[ D2: Log Presensi GPS ]", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=store_style)
    ax.text(5.0, 0.6, "[ D3: Pengajuan Izin & Cuti ]", ha="center", va="center", fontsize=8.5, fontweight="bold", bbox=store_style)

    arrow = dict(arrowstyle="->", color="#333333", lw=1.3)
    ax.annotate("", xy=(2.3, 5.8), xytext=(1.6, 5.8), arrowprops=arrow) # Karyawan -> 1.0
    ax.annotate("", xy=(4.2, 6.7), xytext=(3.5, 6.3), arrowprops=arrow) # 1.0 -> D1
    ax.annotate("", xy=(6.0, 5.8), xytext=(4.1, 5.8), arrowprops=arrow) # 1.0 -> 2.0
    ax.annotate("", xy=(5.5, 4.6), xytext=(6.5, 5.3), arrowprops=arrow) # 2.0 -> D2
    ax.annotate("", xy=(3.2, 3.0), xytext=(3.2, 5.0), arrowprops=arrow) # Karyawan flow to 3.0
    ax.annotate("", xy=(4.5, 1.0), xytext=(3.5, 1.7), arrowprops=arrow) # 3.0 -> D3
    ax.annotate("", xy=(6.0, 1.8), xytext=(5.6, 1.0), arrowprops=arrow) # D3 -> 4.0
    ax.annotate("", xy=(8.4, 2.2), xytext=(7.7, 2.2), arrowprops=arrow) # 4.0 -> Admin
    ax.annotate("", xy=(6.8, 3.7), xytext=(6.8, 2.9), arrowprops=arrow) # 4.0 -> D2 query

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\dfd_level_1.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 4. Entity Relationship Diagram (Gambar 3.3) -----------------
def generate_erd():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis('off')

    entity_head = dict(boxstyle="square,pad=0.4", fc="#0D7A57", ec="#0C2B22", lw=1.5)
    entity_body = dict(boxstyle="square,pad=0.5", fc="#F8FAF9", ec="#D0D0D0", lw=1.2)

    # 1. KARYAWAN
    ax.text(2.2, 6.3, "KARYAWAN (user_profiles)", ha="center", va="center", fontsize=9, fontweight="bold", color="white", bbox=entity_head)
    karyawan_text = "PK  id (UUID)\n     nip (VARCHAR)\n     name (VARCHAR)\n     email (VARCHAR)\n     password (VARCHAR)\n     role_position (VARCHAR)\n     division (VARCHAR)\n     status_active (VARCHAR)"
    ax.text(2.2, 4.7, karyawan_text, ha="left", va="center", fontsize=7.8, family="monospace", bbox=entity_body)

    # 2. ATTENDANCE_LOGS
    ax.text(7.8, 6.3, "ATTENDANCE_LOGS", ha="center", va="center", fontsize=9, fontweight="bold", color="white", bbox=entity_head)
    att_text = "PK  id (UUID)\nFK  user_id (UUID)\nFK  office_id (UUID)\n     time_clock_in (VARCHAR)\n     date_entry (DATE)\n     user_latitude (DECIMAL)\n     user_longitude (DECIMAL)\n     distance_meters (INT)\n     status_presence (VARCHAR)"
    ax.text(7.8, 4.6, att_text, ha="left", va="center", fontsize=7.8, family="monospace", bbox=entity_body)

    # 3. LEAVE_REQUESTS
    ax.text(2.2, 2.5, "LEAVE_REQUESTS", ha="center", va="center", fontsize=9, fontweight="bold", color="white", bbox=entity_head)
    leave_text = "PK  id (UUID)\nFK  user_id (UUID)\n     request_number (VARCHAR)\n     leave_type (VARCHAR)\n     date_effective (VARCHAR)\n     duration_days (VARCHAR)\n     reason_text (TEXT)\n     status_approval (VARCHAR)\n     approver_name (VARCHAR)"
    ax.text(2.2, 1.1, leave_text, ha="left", va="center", fontsize=7.8, family="monospace", bbox=entity_body)

    # 4. OFFICE_LOCATIONS
    ax.text(7.8, 2.5, "OFFICE_LOCATIONS", ha="center", va="center", fontsize=9, fontweight="bold", color="white", bbox=entity_head)
    office_text = "PK  id (UUID)\n     office_name (VARCHAR)\n     center_latitude (DECIMAL)\n     center_longitude (DECIMAL)\n     max_radius_meter (INT)"
    ax.text(7.8, 1.4, office_text, ha="left", va="center", fontsize=7.8, family="monospace", bbox=entity_body)

    # Relations
    line = dict(color="#1B4965", lw=1.8)
    # Karyawan (1) --- (M) Attendance
    ax.plot([3.8, 6.3], [5.0, 5.0], **line)
    ax.text(4.0, 5.2, "1", fontsize=9, fontweight="bold", color="#1B4965")
    ax.text(6.1, 5.2, "M", fontsize=9, fontweight="bold", color="#1B4965")
    ax.text(5.05, 5.25, "mencatat presensi", fontsize=8, ha="center", color="#555555")

    # Karyawan (1) --- (M) Leave
    ax.plot([2.2, 2.2], [3.7, 2.7], **line)
    ax.text(2.4, 3.5, "1", fontsize=9, fontweight="bold", color="#1B4965")
    ax.text(2.4, 2.9, "M", fontsize=9, fontweight="bold", color="#1B4965")

    # Office (1) --- (M) Attendance
    ax.plot([7.8, 7.8], [2.7, 3.6], **line)
    ax.text(8.0, 2.9, "1", fontsize=9, fontweight="bold", color="#1B4965")
    ax.text(8.0, 3.4, "M", fontsize=9, fontweight="bold", color="#1B4965")

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\erd_diagram.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

if __name__ == "__main__":
    generate_flowchart_berjalan()
    generate_dfd_0()
    generate_dfd_1()
    generate_erd()
