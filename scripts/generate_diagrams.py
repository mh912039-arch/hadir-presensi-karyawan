import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

os.makedirs(r"D:\TUGAS\SIM SMT5\docs\diagram_images", exist_ok=True)

# ----------------- 1. Flowchart Sistem Berjalan (Gambar 2.1) -----------------
def generate_flowchart_berjalan():
    fig, ax = plt.subplots(figsize=(9.5, 7.0), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 9.0)
    ax.axis('off')

    # Styles
    box_start = dict(boxstyle="round4,pad=0.5", fc="#E0F2FE", ec="#0284C7", lw=1.5)
    box_blue = dict(boxstyle="round,pad=0.5", fc="#F0F9FF", ec="#0369A1", lw=1.5)
    box_green = dict(boxstyle="round,pad=0.5", fc="#ECFDF5", ec="#047857", lw=1.5)
    box_amber = dict(boxstyle="round,pad=0.5", fc="#FFFBEB", ec="#D97706", lw=1.5)
    box_gray = dict(boxstyle="round,pad=0.5", fc="#F8FAFC", ec="#64748B", lw=1.5)
    diamond = dict(boxstyle="square,pad=0.5", fc="#FEF3C7", ec="#B45309", lw=1.5)

    # Column Titles
    ax.text(2.6, 8.6, "ENTITAS KARYAWAN", ha="center", va="center", fontsize=11, fontweight="bold", color="#0369A1")
    ax.text(7.4, 8.6, "ENTITAS ADMIN HR", ha="center", va="center", fontsize=11, fontweight="bold", color="#047857")
    ax.axvline(x=5.0, ymin=0.03, ymax=0.97, color="#CBD5E1", linestyle="--", lw=1.2)

    # Nodes Karyawan
    ax.text(2.6, 7.8, "Mulai:\nTiba di Kampus UNPAM Viktor 2", ha="center", va="center", fontsize=9, bbox=box_start)
    ax.text(2.6, 6.4, "Tanda Tangan Manual di Buku Absensi\n(Tanpa Verifikasi GPS / Rawan Titip)", ha="center", va="center", fontsize=9, bbox=box_blue)
    ax.text(2.6, 4.8, "Mengisi Formulir Kertas Cuti atau\nKirim Pesan Chat WhatsApp Pribadi", ha="center", va="center", fontsize=9, bbox=box_blue)
    ax.text(2.6, 2.0, "Menerima Jawaban Cuti\n(Menunggu 3 hingga 5 Hari)", ha="center", va="center", fontsize=9, bbox=box_green)

    # Nodes Admin HR
    ax.text(7.4, 4.8, "Menerima Kertas Formulir Cuti /\nPesan Chat dari Karyawan", ha="center", va="center", fontsize=9, bbox=box_green)
    ax.text(7.4, 3.4, "Memeriksa Sisa Kuota Cuti\nsecara Manual di Buku Arsip Catatan", ha="center", va="center", fontsize=9, bbox=box_amber)
    ax.text(7.4, 2.0, "Pengajuan\nDisetujui?", ha="center", va="center", fontsize=9, fontweight="bold", bbox=diamond)
    ax.text(7.4, 0.7, "Akhir Bulan: Salin Manual Data Absensi\nKertas ke Microsoft Excel (Menyita 3-5 Hari)", ha="center", va="center", fontsize=8.5, bbox=box_gray)

    # Arrows
    arrow = dict(arrowstyle="->", color="#334155", lw=1.5)
    ax.annotate("", xy=(2.6, 6.9), xytext=(2.6, 7.4), arrowprops=arrow)
    ax.annotate("", xy=(2.6, 5.3), xytext=(2.6, 5.9), arrowprops=arrow)
    ax.annotate("", xy=(5.9, 4.8), xytext=(4.2, 4.8), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 3.9), xytext=(7.4, 4.3), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.5), xytext=(7.4, 2.9), arrowprops=arrow)
    
    # Decision branches
    ax.annotate("Ya / Tolak", xy=(4.1, 2.0), xytext=(6.3, 2.0), arrowprops=arrow, fontsize=8.5, fontweight="bold")
    ax.annotate("", xy=(7.4, 1.2), xytext=(7.4, 1.6), arrowprops=arrow)

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\flowchart_berjalan.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 2. Flowchart Sistem Usulan - Presensi GPS (Gambar 3.1) -----------------
def generate_flowchart_usulan_presensi():
    fig, ax = plt.subplots(figsize=(9.5, 9.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 12)
    ax.axis('off')

    # Styles
    box_start = dict(boxstyle="round4,pad=0.5", fc="#E0F2FE", ec="#0284C7", lw=1.5)
    box_blue = dict(boxstyle="round,pad=0.5", fc="#F0F9FF", ec="#0369A1", lw=1.5)
    box_green = dict(boxstyle="round,pad=0.5", fc="#ECFDF5", ec="#047857", lw=1.5)
    box_amber = dict(boxstyle="round,pad=0.5", fc="#FFFBEB", ec="#D97706", lw=1.5)
    box_red = dict(boxstyle="round,pad=0.5", fc="#FEF2F2", ec="#DC2626", lw=1.5)
    diamond = dict(boxstyle="square,pad=0.5", fc="#FEF3C7", ec="#B45309", lw=1.5)

    # Column Titles
    ax.text(2.6, 11.5, "KARYAWAN (PONSEL PRIBADI)", ha="center", va="center", fontsize=11, fontweight="bold", color="#0369A1")
    ax.text(7.4, 11.5, "SISTEM hadir. & GPS SERVER", ha="center", va="center", fontsize=11, fontweight="bold", color="#047857")
    ax.axvline(x=5.0, ymin=0.03, ymax=0.96, color="#CBD5E1", linestyle="--", lw=1.2)

    # 1. Mulai
    ax.text(2.6, 10.7, "Mulai:\nBuka Web hadir. di Ponsel", ha="center", va="center", fontsize=9, bbox=box_start)

    # 2. Sistem Deteksi Lokasi
    ax.text(7.4, 10.7, "Deteksi Koordinat GPS HP\n(Geolocation API Ponsel)", ha="center", va="center", fontsize=9, bbox=box_green)

    # 3. Decision GPS Nyala?
    ax.text(7.4, 9.4, "Apakah GPS\nHP Aktif?", ha="center", va="center", fontsize=9, fontweight="bold", bbox=diamond)

    # GPS Mati
    ax.text(2.6, 9.4, "Peringatan: Harap Aktifkan GPS HP\n(Tombol Login & Presensi Dikunci)", ha="center", va="center", fontsize=8.5, bbox=box_red)

    # 4. Hitung Jarak
    ax.text(7.4, 8.0, "Hitung Jarak Koordinat HP\nke Titik Kampus UNPAM Viktor 2", ha="center", va="center", fontsize=9, bbox=box_green)

    # 5. Decision Radius <= 100m?
    ax.text(7.4, 6.6, "Jarak <=\n100 Meter?", ha="center", va="center", fontsize=9, fontweight="bold", bbox=diamond)

    # Di luar radius
    ax.text(2.6, 6.6, "Peringatan: Di Luar Area Kantor\n(Akses Ditolak / Dilarang Absen)", ha="center", va="center", fontsize=8.5, bbox=box_red)

    # 6. Status Siap Login
    ax.text(7.4, 5.2, "Status: Area UNPAM Viktor 2\n(Tombol Presensi Terbuka)", ha="center", va="center", fontsize=9, bbox=box_green)

    # 7. Input Kredensial
    ax.text(2.6, 5.2, "Masukkan Email & Sandi,\nLalu Klik \"Masuk ke Akun\"", ha="center", va="center", fontsize=9, bbox=box_blue)

    # 8. Proses Presensi Masuk
    ax.text(7.4, 3.8, "Simpan Log Presensi Otomatis:\n* NIP Pegawai & Jam Masuk (WIB)\n* Jarak Meter GPS & Tanggal\n* Status Tepat Waktu / Terlambat", ha="center", va="center", fontsize=8.5, bbox=box_amber)

    # 9. Notifikasi Berhasil & Update Dasbor HR
    ax.text(2.6, 2.3, "Notifikasi Presensi Berhasil\nMuncul di Layar HP Karyawan", ha="center", va="center", fontsize=8.5, bbox=box_green)
    ax.text(7.4, 2.3, "Log Kehadiran Otomatis Tampil\ndi Dasbor Admin HR (Real-Time)", ha="center", va="center", fontsize=8.5, bbox=box_green)

    # 10. Selesai
    ax.text(5.0, 1.0, "Selesai", ha="center", va="center", fontsize=9.5, fontweight="bold", bbox=box_start)

    # Arrows
    arrow = dict(arrowstyle="->", color="#334155", lw=1.5)
    ax.annotate("", xy=(5.9, 10.7), xytext=(4.1, 10.7), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 9.9), xytext=(7.4, 10.2), arrowprops=arrow)
    ax.annotate("Tidak", xy=(4.2, 9.4), xytext=(6.3, 9.4), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#DC2626")
    ax.annotate("Ya", xy=(7.4, 8.5), xytext=(7.4, 8.9), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#047857")
    ax.annotate("", xy=(7.4, 7.1), xytext=(7.4, 7.5), arrowprops=arrow)
    ax.annotate("Tidak", xy=(4.2, 6.6), xytext=(6.3, 6.6), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#DC2626")
    ax.annotate("Ya", xy=(7.4, 5.7), xytext=(7.4, 6.1), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#047857")
    ax.annotate("", xy=(4.1, 5.2), xytext=(5.9, 5.2), arrowprops=arrow)
    ax.annotate("", xy=(5.8, 3.8), xytext=(2.6, 4.6), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(7.4, 3.2), arrowprops=arrow)
    ax.annotate("", xy=(4.1, 2.3), xytext=(5.9, 2.3), arrowprops=arrow)
    ax.annotate("", xy=(4.6, 1.2), xytext=(3.0, 1.8), arrowprops=arrow)
    ax.annotate("", xy=(5.4, 1.2), xytext=(7.0, 1.8), arrowprops=arrow)

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\flowchart_usulan_presensi.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 3. Flowchart Sistem Usulan - Pengajuan & Persetujuan Cuti (Gambar 3.2) -----------------
def generate_flowchart_usulan_cuti():
    fig, ax = plt.subplots(figsize=(9.5, 9.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 12)
    ax.axis('off')

    # Styles
    box_start = dict(boxstyle="round4,pad=0.5", fc="#E0F2FE", ec="#0284C7", lw=1.5)
    box_blue = dict(boxstyle="round,pad=0.5", fc="#F0F9FF", ec="#0369A1", lw=1.5)
    box_green = dict(boxstyle="round,pad=0.5", fc="#ECFDF5", ec="#047857", lw=1.5)
    box_amber = dict(boxstyle="round,pad=0.5", fc="#FFFBEB", ec="#D97706", lw=1.5)
    box_red = dict(boxstyle="round,pad=0.5", fc="#FEF2F2", ec="#DC2626", lw=1.5)
    diamond = dict(boxstyle="square,pad=0.5", fc="#FEF3C7", ec="#B45309", lw=1.5)

    # Column Titles
    ax.text(2.6, 11.5, "KARYAWAN (PEMOHON)", ha="center", va="center", fontsize=11, fontweight="bold", color="#0369A1")
    ax.text(7.4, 11.5, "ADMIN HR & SISTEM hadir.", ha="center", va="center", fontsize=11, fontweight="bold", color="#047857")
    ax.axvline(x=5.0, ymin=0.03, ymax=0.96, color="#CBD5E1", linestyle="--", lw=1.2)

    # 1. Mulai
    ax.text(2.6, 10.7, "Mulai:\nPilih Menu Pengajuan Cuti", ha="center", va="center", fontsize=9, bbox=box_start)

    # 2. Isi Formulir Cuti
    ax.text(2.6, 9.3, "Mengisi Formulir Digital:\n* Jenis Cuti (Tahunan/Sakit/Penting)\n* Tanggal & Durasi Hari\n* Alasan Pengajuan Izin", ha="center", va="center", fontsize=8.5, bbox=box_blue)

    # 3. Klik Kirim
    ax.text(2.6, 7.8, "Klik \"Kirim Pengajuan Cuti\"\nsecara Paperless", ha="center", va="center", fontsize=9, bbox=box_blue)

    # 4. Sistem Simpan Status Menunggu
    ax.text(7.4, 7.8, "Sistem Menyimpan Pengajuan\ndengan Status: \"Menunggu\"", ha="center", va="center", fontsize=9, bbox=box_amber)

    # 5. Admin HR Tinjau
    ax.text(7.4, 6.4, "Admin HR Membuka Dasbor &\nMemeriksa Sisa Kuota serta Alasan", ha="center", va="center", fontsize=9, bbox=box_green)

    # 6. Decision Putusan Cuti
    ax.text(7.4, 5.0, "Pengajuan\nDisetujui?", ha="center", va="center", fontsize=9, fontweight="bold", bbox=diamond)

    # 7. Cabang Setuju & Tolak
    ax.text(5.5, 3.6, "Disetujui:\nPotong Kuota Cuti &\nStatus: \"Disetujui\"", ha="center", va="center", fontsize=8.5, bbox=box_green)
    ax.text(8.8, 3.6, "Ditolak:\nCatat Alasan Penolakan &\nStatus: \"Ditolak\"", ha="center", va="center", fontsize=8.5, bbox=box_red)

    # 8. Notifikasi Instan ke HP Karyawan
    ax.text(2.6, 2.3, "Notifikasi Putusan Langsung\nMuncul di Layar HP Karyawan\n(Pemberitahuan ACC / Ditolak)", ha="center", va="center", fontsize=8.5, bbox=box_green)
    ax.text(7.4, 2.3, "Rekap Data Cuti Otomatis\nTersimpan di Laporan Bulanan HR", ha="center", va="center", fontsize=8.5, bbox=box_green)

    # 9. Selesai
    ax.text(5.0, 1.0, "Selesai", ha="center", va="center", fontsize=9.5, fontweight="bold", bbox=box_start)

    # Arrows
    arrow = dict(arrowstyle="->", color="#334155", lw=1.5)
    ax.annotate("", xy=(2.6, 9.9), xytext=(2.6, 10.3), arrowprops=arrow)
    ax.annotate("", xy=(2.6, 8.3), xytext=(2.6, 8.7), arrowprops=arrow)
    ax.annotate("", xy=(5.9, 7.8), xytext=(4.1, 7.8), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 6.9), xytext=(7.4, 7.3), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 5.5), xytext=(7.4, 5.9), arrowprops=arrow)
    
    # Decision branches
    ax.annotate("Ya", xy=(5.8, 4.2), xytext=(6.7, 4.8), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#047857")
    ax.annotate("Tidak", xy=(8.4, 4.2), xytext=(8.0, 4.8), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#DC2626")
    
    # Converge to notification
    ax.annotate("", xy=(4.1, 2.3), xytext=(5.2, 3.1), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(6.0, 3.1), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(8.3, 3.1), arrowprops=arrow)
    
    # End
    ax.annotate("", xy=(4.6, 1.2), xytext=(3.0, 1.8), arrowprops=arrow)
    ax.annotate("", xy=(5.4, 1.2), xytext=(7.0, 1.8), arrowprops=arrow)

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\flowchart_usulan_cuti.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

# ----------------- 4. Simplified ERD (Gambar 3.3) Tanpa Istilah Rumit -----------------
def generate_erd():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis('off')

    entity_head = dict(boxstyle="square,pad=0.4", fc="#047857", ec="#064E3B", lw=1.5)
    entity_body = dict(boxstyle="square,pad=0.5", fc="#F8FAFC", ec="#CBD5E1", lw=1.2)

    # 1. KARYAWAN
    ax.text(2.2, 6.3, "TABEL KARYAWAN", ha="center", va="center", fontsize=9.5, fontweight="bold", color="white", bbox=entity_head)
    karyawan_text = "* ID Pegawai (Kunci Utama)\n* NIP (Teks)\n* Nama Lengkap (Teks)\n* Email Dinas (Teks)\n* Kata Sandi (Teks)\n* Jabatan (Teks)\n* Divisi Kerja (Teks)\n* Status Keaktifan (Teks)"
    ax.text(2.2, 4.7, karyawan_text, ha="left", va="center", fontsize=8.2, family="sans-serif", bbox=entity_body)

    # 2. LOG PRESENSI
    ax.text(7.8, 6.3, "TABEL LOG PRESENSI", ha="center", va="center", fontsize=9.5, fontweight="bold", color="white", bbox=entity_head)
    att_text = "* ID Presensi (Kunci Utama)\n* NIP Pegawai (Penghubung)\n* Titik Kantor (Penghubung)\n* Jam Masuk (Waktu)\n* Tanggal Hadir (Tanggal)\n* Jarak GPS (Angka/Meter)\n* Status Kehadiran (Teks)"
    ax.text(7.8, 4.7, att_text, ha="left", va="center", fontsize=8.2, family="sans-serif", bbox=entity_body)

    # 3. PENGAJUAN CUTI
    ax.text(2.2, 2.5, "TABEL PENGAJUAN CUTI", ha="center", va="center", fontsize=9.5, fontweight="bold", color="white", bbox=entity_head)
    leave_text = "* ID Cuti (Kunci Utama)\n* NIP Pemohon (Penghubung)\n* Jenis Cuti (Teks)\n* Tanggal Izin (Tanggal)\n* Durasi Hari (Teks)\n* Alasan Izin (Teks)\n* Status Putusan (Teks)"
    ax.text(2.2, 1.2, leave_text, ha="left", va="center", fontsize=8.2, family="sans-serif", bbox=entity_body)

    # 4. LOKASI KANTOR
    ax.text(7.8, 2.5, "TABEL LOKASI KANTOR", ha="center", va="center", fontsize=9.5, fontweight="bold", color="white", bbox=entity_head)
    office_text = "* ID Kantor (Kunci Utama)\n* Nama Tempat: UNPAM Viktor 2\n* Titik GPS: Lintang & Bujur\n* Batas Aman: 100 Meter"
    ax.text(7.8, 1.4, office_text, ha="left", va="center", fontsize=8.2, family="sans-serif", bbox=entity_body)

    # Relations
    line = dict(color="#0369A1", lw=1.8)
    ax.plot([3.8, 6.3], [5.0, 5.0], **line)
    ax.text(4.0, 5.2, "1", fontsize=9, fontweight="bold", color="#0369A1")
    ax.text(6.1, 5.2, "M", fontsize=9, fontweight="bold", color="#0369A1")
    ax.text(5.05, 5.25, "mencatat presensi", fontsize=8, ha="center", color="#475569")

    ax.plot([2.2, 2.2], [3.7, 2.7], **line)
    ax.text(2.4, 3.5, "1", fontsize=9, fontweight="bold", color="#0369A1")
    ax.text(2.4, 2.9, "M", fontsize=9, fontweight="bold", color="#0369A1")

    ax.plot([7.8, 7.8], [2.7, 3.6], **line)
    ax.text(8.0, 2.9, "1", fontsize=9, fontweight="bold", color="#0369A1")
    ax.text(8.0, 3.4, "M", fontsize=9, fontweight="bold", color="#0369A1")

    out_path = r"D:\TUGAS\SIM SMT5\docs\diagram_images\erd_diagram.png"
    plt.savefig(out_path, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved:", out_path)

if __name__ == "__main__":
    generate_flowchart_berjalan()
    generate_flowchart_usulan_presensi()
    generate_flowchart_usulan_cuti()
    generate_erd()
