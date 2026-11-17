import docx
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="D3D3D3"):
    tblPr = table._tbl.tblPr
    tblBorders = OxmlElement('w:tblBorders')
    for border_name in ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']:
        border = OxmlElement(f'w:{border_name}')
        border.set(qn('w:val'), 'single')
        border.set(qn('w:sz'), '4')
        border.set(qn('w:space'), '0')
        border.set(qn('w:color'), color)
        tblBorders.append(border)
    tblPr.append(tblBorders)

def create_report():
    doc = docx.Document()

    # Set Margins standar UNPAM: Kiri 4cm, Atas 4cm, Kanan 3cm, Bawah 3cm
    sections = doc.sections
    for section in sections:
        section.top_margin = Cm(4)
        section.left_margin = Cm(4)
        section.bottom_margin = Cm(3)
        section.right_margin = Cm(3)

    # Base Style
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(12)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    normal_style.paragraph_format.line_spacing = 1.5
    normal_style.paragraph_format.space_after = Pt(4)

    # Helper functions
    def add_p(text, align=WD_ALIGN_PARAGRAPH.JUSTIFY, bold=False, italic=False, size=12, space_before=0, space_after=4):
        p = doc.add_paragraph()
        p.alignment = align
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.5
        run = p.add_run(text)
        run.bold = bold
        run.italic = italic
        run.font.name = 'Times New Roman'
        run.font.size = Pt(size)
        return p

    def add_heading_1(title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        return p

    def add_heading_2(title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    def add_heading_3(title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    def style_table(table, col_widths, headers, data):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(table, "B0B0B0")
        
        # Header Row
        hdr_cells = table.rows[0].cells
        for i, header_text in enumerate(headers):
            hdr_cells[i].text = header_text
            set_cell_background(hdr_cells[i], "E8F0EC")
            set_cell_margins(hdr_cells[i], top=120, bottom=120, left=140, right=140)
            p = hdr_cells[i].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(0)
            for r in p.runs:
                r.bold = True
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11)

        # Data Rows
        for row_idx, row_data in enumerate(data):
            row_cells = table.rows[row_idx + 1].cells
            bg_color = "FDFDFD" if row_idx % 2 == 0 else "F7FAF8"
            for col_idx, cell_value in enumerate(row_data):
                row_cells[col_idx].text = str(cell_value)
                set_cell_background(row_cells[col_idx], bg_color)
                set_cell_margins(row_cells[col_idx], top=100, bottom=100, left=140, right=140)
                p = row_cells[col_idx].paragraphs[0]
                p.paragraph_format.line_spacing = 1.15
                p.paragraph_format.space_after = Pt(0)
                if col_idx == 0 and len(cell_value) <= 5 and cell_value.isdigit():
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                else:
                    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                for r in p.runs:
                    r.font.name = 'Times New Roman'
                    r.font.size = Pt(10.5)

        # Widths
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = width

    # ================= COVER PAGE =================
    add_p("LAPORAN PROYEK SISTEM INFORMASI MANAJEMEN", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14, space_before=20, space_after=8)
    add_p("PERANCANGAN SISTEM INFORMASI MANAJEMEN PRESENSI GPS DAN KEPEGAWAIAN KARYAWAN BERBASIS WEB MOBILE PADA PT NUSANTARA DIGITAL DENGAN METODE SDLC", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13, space_before=4, space_after=36)

    add_p("[ LOGO UNIVERSITAS PAMULANG ]", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, italic=True, size=12, space_before=40, space_after=60)

    add_p("Disusun oleh:", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=12, space_before=30, space_after=4)
    add_p("Nama  : Aditya Pratama", align=WD_ALIGN_PARAGRAPH.CENTER, bold=False, size=12, space_after=2)
    add_p("NIM   : 20240018", align=WD_ALIGN_PARAGRAPH.CENTER, bold=False, size=12, space_after=2)
    add_p("Kelas : 05TPLP001", align=WD_ALIGN_PARAGRAPH.CENTER, bold=False, size=12, space_after=40)

    add_p("PROGRAM STUDI TEKNIK INFORMATIKA\nFAKULTAS ILMU KOMPUTER\nUNIVERSITAS PAMULANG\nTAHUN 2026", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13, space_before=20, space_after=0)
    
    doc.add_page_break()

    # ================= DAFTAR ISI =================
    add_heading_1("DAFTAR ISI")
    p_di = doc.add_paragraph()
    p_di.paragraph_format.line_spacing = 1.3
    items_di = [
        ("BAB I PERENCANAAN SISTEM", "1"),
        ("   1.1 Latar Belakang", "1"),
        ("   1.2 Profil Organisasi", "1"),
        ("   1.3 Rumusan Masalah", "2"),
        ("   1.4 Tujuan dan Manfaat", "2"),
        ("   1.5 Ruang Lingkup", "2"),
        ("   1.6 Studi Kelayakan", "3"),
        ("   1.7 Jadwal Proyek", "3"),
        ("BAB II ANALISIS SISTEM", "4"),
        ("   2.1 Metode Pengumpulan Data", "4"),
        ("   2.2 Proses Bisnis yang Berjalan", "4"),
        ("   2.3 Identifikasi Masalah", "5"),
        ("   2.4 Pengguna dan Kebutuhan Informasi", "5"),
        ("   2.5 Kebutuhan Fungsional", "6"),
        ("   2.6 Kebutuhan Non-Fungsional", "6"),
        ("   2.7 Jenis Sistem Informasi yang Dirancang", "7"),
        ("BAB III DESAIN SISTEM", "8"),
        ("   3.1 Gambaran Sistem Usulan dan Komponen SIM", "8"),
        ("   3.2 Desain Proses", "9"),
        ("   3.3 Desain Data", "10"),
        ("   3.4 Desain Output (Laporan)", "12"),
        ("   3.5 Desain Antarmuka (Mockup)", "13"),
    ]
    for text, pg in items_di:
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.2
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(text)
        r1.font.name = 'Times New Roman'
        r1.font.size = Pt(11)
        if text.startswith("BAB"):
            r1.bold = True
            
    doc.add_page_break()

    # ================= BAB I =================
    add_heading_1("BAB I\nPERENCANAAN SISTEM")

    add_heading_2("1.1 Latar Belakang")
    add_p("PT Nusantara Digital merupakan entitas usaha yang bergerak di bidang solusi teknologi informasi dan pengembangan perangkat lunak. Pada kantor operasional Kampus UNPAM Viktor 2, pengelolaan absensi karyawan saat ini masih menggunakan pencatatan manual pada buku presensi cetak dan koordinasi izin via perpesanan instan WhatsApp.")
    add_p("Pola manual ini memicu kendala operasional yang signifikan: tingginya potensi kecurangan presensi (titip absen), ketidakakuratan verifikasi fisik karyawan di lokasi kerja, serta alur pengajuan dan persetujuan cuti yang lambat (membutuhkan waktu 3 hingga 5 hari kerja). Dampaknya, divisi Human Resources (HR) kesulitan menyajikan rekapitulasi kehadiran yang sahih dan akurat setiap akhir bulan.")
    add_p("Untuk mengatasi permasalahan tersebut, dirancang Sistem Informasi Manajemen Presensi dan Kepegawaian berbasis Web Mobile / Progressive Web App (PWA) bernama hadir.. Sistem ini mengintegrasikan verifikasi koordinat GPS (geo-fencing) dengan batas radius 100 meter di UNPAM Viktor 2, modul persetujuan cuti digital secara real-time, dan dasbor pemantauan terpusat bagi manajemen.")

    add_heading_2("1.2 Profil Organisasi")
    add_p("Tabel 1.1 Profil Organisasi", bold=True, size=11, space_after=2)
    tbl_1_1 = doc.add_table(rows=7, cols=2)
    col_w_1_1 = [Cm(5), Cm(10)]
    headers_1_1 = ["Aspek", "Keterangan"]
    data_1_1 = [
        ["Nama organisasi", "PT Nusantara Digital"],
        ["Bidang usaha", "Solusi Teknologi Informasi & Rekayasa Perangkat Lunak"],
        ["Alamat", "Kampus Universitas Pamulang Gedung Viktor 2 Lt. 5, Jl. Puspitek No. 46, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310"],
        ["Jumlah karyawan", "48 Karyawan Aktif"],
        ["Narasumber", "Rina Wijaya, S.Kom., M.M. (HR & Operations Manager)"],
        ["Struktur organisasi", "Direktur Utama → HR & Operations Manager → Team Lead Divisi (Teknologi, Desain Produk, Operasional) → Staf Karyawan"]
    ]
    style_table(tbl_1_1, col_w_1_1, headers_1_1, data_1_1)

    add_heading_2("1.3 Rumusan Masalah")
    add_p("1. Bagaimana merancang mekanisme pencatatan presensi digital berbasis GPS yang dapat memvalidasi posisi fisik karyawan di dalam radius 100 meter Kampus UNPAM Viktor 2 secara akurat?")
    add_p("2. Bagaimana membangun modul pengajuan izin dan cuti kerja karyawan secara paperless dengan sistem notifikasi putusan (approval/rejection) langsung ke perangkat pemohon?")
    add_p("3. Bagaimana menyajikan informasi log kehadiran dan rekapitulasi kepegawaian secara real-time bagi Admin HR dan manajemen untuk mendukung pengambilan keputusan?")

    add_heading_2("1.4 Tujuan dan Manfaat")
    add_heading_3("1.4.1 Tujuan Proyek")
    add_p("1. Merancang dan mengimplementasikan sistem presensi digital berbasis geo-fencing GPS dengan radius validasi 100 meter di UNPAM Viktor 2 guna mencegah manipulasi kehadiran.")
    add_p("2. Mengembangkan alur kerja digital untuk pengajuan, validasi, dan persetujuan cuti/izin karyawan secara transparan dan otomatis.")
    add_p("3. Membangun modul pelaporan dan pemantauan terpusat yang menghasilkan data kehadiran siap saji untuk Admin HR dan pimpinan.")

    add_heading_3("1.4.2 Manfaat Proyek")
    add_p("• Bagi Organisasi: Meningkatkan integritas data absensi, menghemat biaya operasional kertas formulir, serta mereduksi waktu rekapitulasi kehadiran hingga 70%.")
    add_p("• Bagi Pengguna: Karyawan memperoleh kepastian status presensi dan notifikasi cuti secara instan melalui ponsel pintar; Admin HR dapat mengelola data staf dan log audit dengan cepat.")
    add_p("• Bagi Penulis: Mengaplikasikan teori mata kuliah Sistem Informasi Manajemen dan metodologi System Development Life Cycle (SDLC) dalam memecahkan masalah nyata di industri.")

    add_heading_2("1.5 Ruang Lingkup")
    add_heading_3("1.5.1 Batasan Sistem (In-Scope)")
    add_p("1. Modul autentikasi multi-peran (Role-Based Access Control) untuk Karyawan dan Admin HR.")
    add_p("2. Validasi presensi masuk berbasis koordinat GPS riil perangkat dengan batas radius 100 meter dari titik UNPAM Viktor 2 (Lat: -6.3458, Lng: 106.6917), dilengkapi akun uji coba (test account).")
    add_p("3. Pengajuan izin dan cuti mandiri oleh karyawan beserta pemotongan kuota cuti tahunan otomatis.")
    add_p("4. Persetujuan atau penolakan pengajuan cuti oleh Admin HR disertai notifikasi floating banner dan nada audio chime.")
    add_p("5. Manajemen data master karyawan (tambah karyawan, edit nama, jabatan, divisi, dan status aktif).")
    add_p("6. Dasbor pemantauan log presensi GPS dan laporan rekapitulasi kehadiran (MIS/DSS).")

    add_heading_3("1.5.2 Hal yang Tidak Termasuk (Out-of-Scope)")
    add_p("1. Modul perhitungan penggajian (payroll) dan integrasi transfer perbankan.")
    add_p("2. Integrasi mesin fisik biometrik sidik jari (fingerprint hardware).")
    add_p("3. Pengelolaan potongan pajak penghasilan (PPh 21) dan jaminan ketenagakerjaan.")

    add_heading_2("1.6 Studi Kelayakan")
    add_p("Tabel 1.2 Hasil Penilaian Studi Kelayakan", bold=True, size=11, space_after=2)
    tbl_1_2 = doc.add_table(rows=5, cols=3)
    col_w_1_2 = [Cm(3.5), Cm(5.5), Cm(6.5)]
    headers_1_2 = ["Aspek", "Pertanyaan", "Hasil Penilaian"]
    data_1_2 = [
        ["Teknis", "Apakah teknologi tersedia dan mampu diterapkan?", "Layak. Sistem dirancang berbasis Web Mobile / PWA (Next.js 16, TypeScript, Tailwind CSS) yang dapat diakses melalui peramban ponsel pintar modern tanpa instalasi rumit, memanfaatkan Geolocation API bawaan perangkat."],
        ["Ekonomi", "Apakah manfaat yang diperoleh sebanding dengan investasi biaya?", "Layak. Mengeliminasi biaya pengadaan mesin absensi fisik, menghemat penggunaan kertas formulir, serta mengurangi biaya lembur admin HR dalam merekap absensi bulanan."],
        ["Operasional", "Apakah pengguna mampu dan bersedia mengoperasikan sistem?", "Layak. Tampilan antarmuka berorientasi mobile-first, intuitif, minimalis, dan mudah digunakan oleh staf lintas generasi dengan pelatihan singkat."],
        ["Jadwal", "Apakah proyek dapat diselesaikan tepat waktu sesuai batas semester?", "Layak. Pengembangan direncanakan berlangsung selama 5 pertemuan/minggu (P9 hingga P13) sesuai kalender akademik perkuliahan."]
    ]
    style_table(tbl_1_2, col_w_1_2, headers_1_2, data_1_2)

    add_heading_2("1.7 Jadwal Proyek")
    add_p("Tabel 1.3 Jadwal Pelaksanaan Proyek (SDLC)", bold=True, size=11, space_after=2)
    tbl_1_3 = doc.add_table(rows=6, cols=6)
    col_w_1_3 = [Cm(6.5), Cm(1.8), Cm(1.8), Cm(1.8), Cm(1.8), Cm(1.8)]
    headers_1_3 = ["Tahap SDLC", "P9", "P10", "P11", "P12", "P13"]
    data_1_3 = [
        ["Perencanaan (Planning)", "[X]", "", "", "", ""],
        ["Analisis Sistem (Analysis)", "", "[X]", "", "", ""],
        ["Desain Sistem (Design)", "", "", "[X]", "", ""],
        ["Rencana Implementasi & Pengujian", "", "", "", "[X]", ""],
        ["Penyusunan Laporan & Presentasi", "", "", "", "", "[X]"]
    ]
    style_table(tbl_1_3, col_w_1_3, headers_1_3, data_1_3)

    doc.add_page_break()

    # ================= BAB II =================
    add_heading_1("BAB II\nANALISIS SISTEM")

    add_heading_2("2.1 Metode Pengumpulan Data")
    add_p("1. Observasi Langsung: Mengamati proses pencatatan kehadiran manual karyawan saat jam masuk kerja (07.30–08.00 WIB) di kantor operasional UNPAM Viktor 2 pada tanggal 3–6 November 2026.")
    add_p("2. Wawancara Terstruktur: Dilakukan bersama Rina Wijaya (HR & Operations Manager) pada 5 November 2026 untuk mengidentifikasi titik lemah verifikasi absensi manual dan alur disposisi cuti.")
    add_p("3. Studi Dokumen: Memeriksa format buku kehadiran fisik, formulir permohonan cuti kertas, dan berkas rekapitulasi Excel divisi HR periode September–Oktober 2026.")

    add_heading_2("2.2 Proses Bisnis yang Berjalan")
    add_heading_3("2.2.1 Deskripsi Alur Kerja Manual")
    add_p("1. Presensi Masuk: Karyawan tiba di kantor dan membubuhkan tanda tangan fisik pada buku presensi di meja resepsionis/ruang HR.")
    add_p("2. Pengajuan Izin/Cuti: Karyawan mengisi formulir kertas permohonan izin/cuti atau mengirimkan pesan WhatsApp ke Admin HR.")
    add_p("3. Persetujuan HR: Admin HR memeriksa sisa hak cuti karyawan secara manual di buku catatan lalu menandatangani formulir fisik sebelum diajukan ke manajer operasional.")
    add_p("4. Rekapitulasi Bulanan: Setiap akhir bulan, Admin HR memindahkan data tanda tangan fisik ke dalam lembar kerja Microsoft Excel, yang membutuhkan waktu 3 hingga 5 hari kerja dan rawan human error.")

    add_heading_3("2.2.2 Flowchart Sistem yang Berjalan")
    add_p("Gambar 2.1 Flowchart Sistem Presensi dan Pengajuan Cuti yang Sedang Berjalan", italic=True, size=11, space_before=4, space_after=6)
    add_p("[Alur Kerja Manual: Karyawan Datang -> Tanda Tangan Buku Absen Fisik -> Isi Formulir Kertas / WhatsApp -> HR Memeriksa Sisa Cuti di Buku Arsip -> Disetujui/Ditolak Manual -> Akhir Bulan Rekapitulasi ke Lembar Kerja Excel]", italic=True, size=11)

    add_heading_2("2.3 Identifikasi Masalah")
    add_p("Tabel 2.1 Matriks Identifikasi Masalah", bold=True, size=11, space_after=2)
    tbl_2_1 = doc.add_table(rows=5, cols=4)
    col_w_2_1 = [Cm(1.2), Cm(4.5), Cm(4.5), Cm(5.3)]
    headers_2_1 = ["No", "Masalah", "Penyebab", "Dampak"]
    data_2_1 = [
        ["1", "Presensi tidak mencerminkan kehadiran fisik aktual (titip absen)", "Pencatatan tanda tangan manual tanpa validasi koordinat lokasi", "Terjadi kecurangan absensi dan ketidakdisiplinan jam kerja karyawan."],
        ["2", "Proses persetujuan cuti memakan waktu lama (3–5 hari)", "Pengajuan menggunakan formulir fisik dan perpesanan pribadi", "Dokumen sering terselip; karyawan tidak mendapat kepastian hak libur kerja."],
        ["3", "Perhitungan sisa kuota cuti sering salah rekap", "Pencatatan kuota cuti terpisah di buku arsip personal HR", "Potensi klaim cuti melebihi hak tahunan karyawan."],
        ["4", "Rekapitulasi laporan kehadiran bulanan lambat", "Pemindahan data manual dari kertas ke lembar kerja Excel", "Waktu kerja HR tersita 3–5 hari kerja setiap akhir bulan."]
    ]
    style_table(tbl_2_1, col_w_2_1, headers_2_1, data_2_1)

    add_heading_2("2.4 Pengguna dan Kebutuhan Informasi")
    add_p("Tabel 2.2 Kebutuhan Informasi Berdasarkan Tingkatan Manajemen (Materi P4)", bold=True, size=11, space_after=2)
    tbl_2_2 = doc.add_table(rows=4, cols=4)
    col_w_2_2 = [Cm(3.5), Cm(3.5), Cm(5.5), Cm(3.0)]
    headers_2_2 = ["Pengguna / Peran", "Tingkatan Manajemen", "Informasi yang Dibutuhkan", "Frekuensi"]
    data_2_2 = [
        ["Karyawan", "Operasional", "Status presensi hari ini, jam masuk tercatat, sisa kuota cuti tahunan, status persetujuan izin/cuti", "Real-time / Harian"],
        ["Admin HR", "Taktis (Manajerial)", "Log harian presensi GPS, jarak meter dari kampus, daftar pengajuan cuti menunggu persetujuan, data master karyawan", "Harian / Mingguan"],
        ["Direktur Utama / Pimpinan", "Strategis (Eksekutif)", "Rekapitulasi persentase kehadiran per divisi, rasio ketepatan waktu, total izin/cuti bulanan", "Bulanan / Kuartalan"]
    ]
    style_table(tbl_2_2, col_w_2_2, headers_2_2, data_2_2)

    add_heading_2("2.5 Kebutuhan Fungsional")
    add_p("Tabel 2.3 Daftar Kebutuhan Fungsional (Functional Requirements)", bold=True, size=11, space_after=2)
    tbl_2_3 = doc.add_table(rows=9, cols=3)
    col_w_2_3 = [Cm(2.0), Cm(9.5), Cm(4.0)]
    headers_2_3 = ["Kode", "Kebutuhan Fungsional", "Pengguna"]
    data_2_3 = [
        ["F-01", "Sistem dapat melakukan autentikasi login multi-peran (Karyawan & Admin HR) dengan email/NIP dan kata sandi", "Karyawan, Admin HR"],
        ["F-02", "Sistem dapat mendeteksi sensor GPS perangkat dan memvalidasi posisi dalam radius 100 meter area UNPAM Viktor 2", "Karyawan"],
        ["F-03", "Sistem dapat melakukan pencatatan presensi masuk dan merekam riwayat jam kedatangan harian", "Karyawan"],
        ["F-04", "Sistem dapat memproses formulir pengajuan cuti kerja (jenis cuti, tanggal, durasi, alasan) secara mandiri", "Karyawan"],
        ["F-05", "Sistem dapat menyetujui (approve) atau menolak (reject) pengajuan cuti serta memotong kuota cuti secara otomatis", "Admin HR"],
        ["F-06", "Sistem dapat mengirimkan notifikasi in-app push banner dan nada audio ke perangkat karyawan saat status cuti diputus", "Karyawan"],
        ["F-07", "Sistem dapat mengelola master data karyawan (tambah karyawan, edit nama, jabatan, divisi, email, dan status aktif)", "Admin HR"],
        ["F-08", "Sistem dapat menyajikan monitoring log presensi GPS live dan mencetak laporan rekapitulasi kehadiran", "Admin HR, Pimpinan"]
    ]
    style_table(tbl_2_3, col_w_2_3, headers_2_3, data_2_3)

    add_heading_2("2.6 Kebutuhan Non-Fungsional")
    add_p("Tabel 2.4 Daftar Kebutuhan Non-Fungsional (Non-Functional Requirements)", bold=True, size=11, space_after=2)
    tbl_2_4 = doc.add_table(rows=5, cols=3)
    col_w_2_4 = [Cm(2.0), Cm(4.0), Cm(9.5)]
    headers_2_4 = ["Kode", "Aspek", "Kebutuhan Non-Fungsional"]
    data_2_4 = [
        ["NF-01", "Keamanan", "Akses dibatasi menggunakan Role-Based Access Control (RBAC); sandi pengguna tersimpan aman; data formulir disanitasi dari ancaman XSS dan SQL Injection."],
        ["NF-02", "Kinerja & Kecepatan", "Waktu respons deteksi koordinat GPS dan validasi jarak kurang dari 3 detik; pemuatan halaman aplikasi di ponsel di bawah 2 detik."],
        ["NF-03", "Keandalan (Reliability)", "Aplikasi berjalan dalam arsitektur PWA (Progressive Web App) yang stabil, responsif pada berbagai ukuran layar ponsel, dan mendukung pelacakan koordinat berkesinambungan (watchPosition)."],
        ["NF-04", "Usabilitas (Usability)", "Desain antarmuka minimalis, bersih, bebas elemen membingungkan (anti-slop), kontras warna memenuhi standar WCAG AA (rasio ≥ 4.5:1), dan tombol mudah dijangkau satu tangan."]
    ]
    style_table(tbl_2_4, col_w_2_4, headers_2_4, data_2_4)

    add_heading_2("2.7 Jenis Sistem Informasi yang Dirancang")
    add_p("Tabel 2.5 Pemetaan Jenis Sistem Informasi (Materi P6)", bold=True, size=11, space_after=2)
    tbl_2_5 = doc.add_table(rows=5, cols=3)
    col_w_2_5 = [Cm(3.5), Cm(8.0), Cm(4.0)]
    headers_2_5 = ["Jenis SI", "Bagian Sistem yang Dirancang", "Pengguna"]
    data_2_5 = [
        ["TPS (Transaction Processing System)", "Modul input presensi GPS masuk harian dan modul pengisian formulir pengajuan cuti mandiri", "Karyawan"],
        ["MIS (Management Information System)", "Modul rekapitulasi presensi harian/bulanan, log audit validasi GPS, dan modul riwayat cuti staf", "Admin HR"],
        ["DSS / ESS (Decision / Executive Support)", "Dasbor analitik kedisiplinan divisi, rasio kepatuhan jam kerja karyawan, dan statistik utilisasi cuti tahunan", "Direktur Utama, HR Manager"],
        ["OAS (Office Automation System)", "Pengiriman notifikasi floating banner keputusan cuti otomatis dan pengarsipan data digital tanpa kertas", "Karyawan, Admin HR"]
    ]
    style_table(tbl_2_5, col_w_2_5, headers_2_5, data_2_5)

    doc.add_page_break()

    # ================= BAB III =================
    add_heading_1("BAB III\nDESAIN SISTEM")

    add_heading_2("3.1 Gambaran Sistem Usulan dan Komponen SIM")
    add_heading_3("3.1.1 Gambaran Umum Sistem Usulan")
    add_p("Sistem informasi usulan (hadir.) dirancang dengan arsitektur modern berbasis Web Mobile / PWA. Karyawan mengakses sistem melalui peramban ponsel pintar. Sistem secara otomatis meminta izin sensor lokasi GPS dan menghitung jarak menggunakan rumus matematika Haversine terhadap titik pusat Kampus UNPAM Viktor 2 (-6.3458, 106.6917).")
    add_p("Jika karyawan berada dalam batas radius aman 100 meter dan GPS aktif, presensi dapat dikonfirmasi dalam satu sentuhan. Untuk pengajuan cuti, karyawan mengisi data pada formulir digital, lalu notifikasi langsung masuk ke dasbor Admin HR untuk disetujui atau ditolak secara real-time. Hasil persetujuan akan langsung memicu notifikasi visual dan nada audio chime pada ponsel karyawan yang bersangkutan.")

    add_heading_3("3.1.2 Enam Komponen SIM Usulan")
    add_p("Tabel 3.1 Komponen SIM Usulan (Materi P2)", bold=True, size=11, space_after=2)
    tbl_3_1 = doc.add_table(rows=7, cols=2)
    col_w_3_1 = [Cm(4.5), Cm(11.0)]
    headers_3_1 = ["Komponen SIM", "Wujud pada Sistem Usulan"]
    data_3_1 = [
        ["Hardware", "Client: Smartphone Android/iOS milik karyawan dan 1 unit PC/Laptop Admin HR. Server: Server komputasi awan (Cloud hosting Vercel)."],
        ["Software", "Framework: Next.js 16 (React 19, TypeScript), Tailwind CSS, Lucide Icons, Geolocation API, Web Audio API, PWA Service Worker."],
        ["Data", "Basis data relasional terstruktur: entitas profil karyawan, jadwal kerja, log presensi GPS, pengajuan cuti, dan log notifikasi."],
        ["Prosedur", "SOP Presensi Masuk Berbasis Radius GPS UNPAM Viktor 2, SOP Pengajuan Cuti Mandiri Karyawan, dan SOP Validasi Keputusan Admin HR."],
        ["Manusia (People)", "Karyawan PT Nusantara Digital (sebagai operator presensi/pemohon), Admin HR (pengelola & validator), dan Direktur (penerima laporan)."],
        ["Jaringan", "Koneksi internet seluler (4G/5G) pada ponsel pengguna, jaringan Wi-Fi kampus UNPAM Viktor 2, dan protokol komunikasi terenkripsi HTTPS (SSL/TLS)."]
    ]
    style_table(tbl_3_1, col_w_3_1, headers_3_1, data_3_1)

    add_heading_2("3.2 Desain Proses")
    add_heading_3("3.2.1 Diagram Konteks (DFD Level 0)")
    add_p("Gambar 3.1 Diagram Konteks (DFD Level 0) Sistem Informasi hadir.", italic=True, size=11, space_before=4, space_after=6)
    add_p("[Diagram Konteks: Entitas Karyawan dan Admin HR berinteraksi dengan Sistem Informasi Presensi dan Kepegawaian (hadir.). Karyawan mengirimkan data koordinat GPS, kredensial, dan pengajuan cuti; menerima status kehadiran dan notifikasi cuti. Admin HR mengirimkan keputusan cuti dan kelola data; menerima log audit GPS dan laporan kehadiran.]", italic=True, size=11)

    add_heading_3("3.2.2 DFD Level 1 (Dekomposisi Proses)")
    add_p("Gambar 3.2 DFD Level 1 Sistem Informasi hadir.", italic=True, size=11, space_before=4, space_after=6)
    add_p("[DFD Level 1 membagi sistem menjadi 4 proses utama: (1.0 Autentikasi Pengguna) terhubung ke data store D1: Profil Karyawan; (2.0 Presensi GPS) menyimpan transaksi ke D2: Log Presensi GPS; (3.0 Pengajuan & Persetujuan Cuti) mengelola data pada D3: Pengajuan Cuti; dan (4.0 Kelola Pegawai & Pelaporan Eksekutif) mengolah data menjadi laporan MIS/DSS.]", italic=True, size=11)

    add_heading_2("3.3 Desain Data")
    add_heading_3("3.3.1 Entity Relationship Diagram (ERD)")
    add_p("Gambar 3.3 Entity Relationship Diagram (ERD) Sistem Informasi hadir.", italic=True, size=11, space_before=4, space_after=6)
    add_p("[ERD terdiri dari 4 entitas utama: KARYAWAN (1:M ke ATTENDANCE_LOGS dan 1:M ke LEAVE_REQUESTS), OFFICE_LOCATIONS (1:M ke ATTENDANCE_LOGS) yang menetapkan batas koordinat dan radius kampus UNPAM Viktor 2.]", italic=True, size=11)

    add_heading_3("3.3.2 Kamus Data (Data Dictionary)")
    
    add_p("Tabel 3.2 Kamus Data Tabel karyawan (user_profiles)", bold=True, size=11, space_after=2)
    tbl_3_2 = doc.add_table(rows=9, cols=4)
    col_w_3_2 = [Cm(3.5), Cm(2.5), Cm(2.0), Cm(7.5)]
    headers_3_2 = ["Nama Field", "Tipe Data", "Panjang", "Keterangan"]
    data_3_2 = [
        ["id (PK)", "VARCHAR", "36", "Pengenal unik karyawan (UUID)"],
        ["nip", "VARCHAR", "20", "Nomor Induk Pegawai unik"],
        ["name", "VARCHAR", "100", "Nama lengkap karyawan"],
        ["email", "VARCHAR", "100", "Alamat email dinas karyawan"],
        ["password", "VARCHAR", "255", "Hash kata sandi terenkripsi"],
        ["role_position", "VARCHAR", "50", "Jabatan struktural karyawan"],
        ["division", "VARCHAR", "50", "Unit kerja / divisi"],
        ["status_active", "VARCHAR", "15", "Status kepegawaian (Aktif / Nonaktif)"]
    ]
    style_table(tbl_3_2, col_w_3_2, headers_3_2, data_3_2)

    add_p("Tabel 3.3 Kamus Data Tabel attendance_logs", bold=True, size=11, space_before=8, space_after=2)
    tbl_3_3 = doc.add_table(rows=10, cols=4)
    col_w_3_3 = [Cm(3.5), Cm(2.5), Cm(2.0), Cm(7.5)]
    headers_3_3 = ["Nama Field", "Tipe Data", "Panjang", "Keterangan"]
    data_3_3 = [
        ["id (PK)", "VARCHAR", "36", "Pengenal unik log presensi"],
        ["user_id (FK)", "VARCHAR", "36", "Kunci relasi ke tabel karyawan"],
        ["office_id (FK)", "VARCHAR", "36", "Kunci relasi ke tabel office_locations"],
        ["time_clock_in", "VARCHAR", "10", "Waktu presensi masuk (WIB)"],
        ["date_entry", "DATE", "-", "Tanggal pelaksanaan presensi"],
        ["user_latitude", "DECIMAL", "10,7", "Koordinat lintang saat presensi"],
        ["user_longitude", "DECIMAL", "10,7", "Koordinat bujur saat presensi"],
        ["distance_meters", "INT", "6", "Jarak meter dari titik acuan kantor"],
        ["status_presence", "VARCHAR", "20", "Status kehadiran (Tepat Waktu / Terlambat)"]
    ]
    style_table(tbl_3_3, col_w_3_3, headers_3_3, data_3_3)

    add_p("Tabel 3.4 Kamus Data Tabel leave_requests", bold=True, size=11, space_before=8, space_after=2)
    tbl_3_4 = doc.add_table(rows=10, cols=4)
    col_w_3_4 = [Cm(3.5), Cm(2.5), Cm(2.0), Cm(7.5)]
    headers_3_4 = ["Nama Field", "Tipe Data", "Panjang", "Keterangan"]
    data_3_4 = [
        ["id (PK)", "VARCHAR", "36", "Pengenal unik pengajuan cuti"],
        ["user_id (FK)", "VARCHAR", "36", "Kunci relasi ke pemohon cuti"],
        ["request_number", "VARCHAR", "25", "Nomor registrasi pengajuan (auto-generated)"],
        ["leave_type", "VARCHAR", "30", "Jenis cuti (Tahunan, Sakit, Alasan Penting)"],
        ["date_effective", "VARCHAR", "30", "Tanggal pelaksanaan cuti"],
        ["duration_days", "VARCHAR", "20", "Lama durasi hari cuti"],
        ["reason_text", "TEXT", "-", "Deskripsi alasan pengajuan cuti"],
        ["status_approval", "VARCHAR", "15", "Status putusan (Menunggu, Disetujui, Ditolak)"],
        ["approver_name", "VARCHAR", "100", "Nama pejabat HR yang memutus"]
    ]
    style_table(tbl_3_4, col_w_3_4, headers_3_4, data_3_4)

    add_p("Tabel 3.5 Kamus Data Tabel office_locations", bold=True, size=11, space_before=8, space_after=2)
    tbl_3_5 = doc.add_table(rows=6, cols=4)
    col_w_3_5 = [Cm(3.5), Cm(2.5), Cm(2.0), Cm(7.5)]
    headers_3_5 = ["Nama Field", "Tipe Data", "Panjang", "Keterangan"]
    data_3_5 = [
        ["id (PK)", "VARCHAR", "36", "Pengenal unik titik kantor"],
        ["office_name", "VARCHAR", "50", "Nama lokasi acuan (UNPAM Viktor 2)"],
        ["center_latitude", "DECIMAL", "10,7", "Koordinat lintang titik pusat (-6.3458000)"],
        ["center_longitude", "DECIMAL", "10,7", "Koordinat bujur titik pusat (106.6917000)"],
        ["max_radius_meter", "INT", "4", "Batas radius validasi toleransi (100 meter)"]
    ]
    style_table(tbl_3_5, col_w_3_5, headers_3_5, data_3_5)

    add_heading_2("3.4 Desain Output (Laporan)")
    add_p("Tabel 3.6 Rancangan Output Laporan Sistem", bold=True, size=11, space_after=2)
    tbl_3_6 = doc.add_table(rows=4, cols=4)
    col_w_3_6 = [Cm(3.5), Cm(3.0), Cm(6.5), Cm(2.5)]
    headers_3_6 = ["Nama Laporan", "Pengguna", "Isi / Kolom Laporan", "Periode"]
    data_3_6 = [
        ["Laporan Rekapitulasi Presensi Harian", "Admin HR, Team Lead", "Tanggal, NIP, Nama Karyawan, Divisi, Jam Masuk, Jarak GPS (Meter), Koordinat Satelit, Status (Sah/Di Luar Area/Terlambat)", "Harian"],
        ["Laporan Pengajuan dan Rekap Cuti Staf", "HR Manager, Direktur", "Nomor Registrasi, Nama Pegawai, Divisi, Jenis Cuti, Tanggal Pelaksanaan, Sisa Kuota, Status Keputusan HR, Catatan Putusan", "Bulanan"],
        ["Laporan Analitik Kedisiplinan Kerja (MIS/DSS)", "Direktur Utama, HR Manager", "Nama Divisi, Jumlah Personel, Tingkat Kehadiran (%), Rata-rata Keterlambatan (Menit), Rasio Cuti Tahunan", "Bulanan / Kuartalan"]
    ]
    style_table(tbl_3_6, col_w_3_6, headers_3_6, data_3_6)

    add_heading_2("3.5 Desain Antarmuka (Mockup)")
    
    add_heading_3("1. Layar Login & Pemilihan Peran (F-01, NF-01)")
    add_p("Fungsi Layar: Menyediakan gerbang masuk terpadu dengan input email/NIP, kata sandi, pemilihan segmen peran (Karyawan atau Admin), serta verifikasi koordinat GPS ponsel secara otomatis.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-01 dan non-fungsional NF-01.")
    add_p("Gambar 3.4 Mockup Layar Login dan Pemilihan Peran", italic=True, size=10.5)

    add_heading_3("2. Layar Dashboard Beranda Karyawan (F-03, F-04, OAS)")
    add_p("Fungsi Layar: Menampilkan identitas profil staf aktif, kartu status presensi hari ini, indikator radius UNPAM Viktor 2, sisa jatah kuota cuti tahunan, serta akses cepat ke menu presensi dan pengajuan cuti.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-03, F-04, dan arketipe sistem OAS.")
    add_p("Gambar 3.5 Mockup Layar Dashboard Beranda Karyawan", italic=True, size=10.5)

    add_heading_3("3. Layar Presensi GPS & Peta Geo-fencing (F-02, F-03, TPS)")
    add_p("Fungsi Layar: Memetakan lokasi fisik pengguna terhadap titik pusat UNPAM Viktor 2 secara grafis, menampilkan indikator jarak riil meter, dan tombol eksekusi kehadiran yang hanya aktif bila GPS berada dalam radius <= 100 meter.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-02, F-03, dan komponen TPS.")
    add_p("Gambar 3.6 Mockup Layar Presensi GPS dan Geo-fencing", italic=True, size=10.5)

    add_heading_3("4. Layar Formulir Pengajuan Cuti Karyawan (F-04, TPS, OAS)")
    add_p("Fungsi Layar: Mengakomodasi formulir permohonan cuti mandiri secara digital tanpa kertas, meliputi pemilihan tipe cuti, tanggal rencana izin, durasi hari, dan penjelasan keperluan.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-04, komponen TPS, dan OAS.")
    add_p("Gambar 3.7 Mockup Layar Formulir Pengajuan Cuti Karyawan", italic=True, size=10.5)

    add_heading_3("5. Layar Persetujuan Cuti & Notifikasi Admin HR (F-05, F-06, MIS)")
    add_p("Fungsi Layar: Panel kerja bagi Admin HR untuk mereview daftar pengajuan cuti yang masuk, memeriksa detail alasan staf, serta mengeksekusi tombol persetujuan atau penolakan yang otomatis memicu notifikasi ke perangkat karyawan.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-05, F-06, dan komponen MIS.")
    add_p("Gambar 3.8 Mockup Layar Persetujuan Cuti Admin HR", italic=True, size=10.5)

    add_heading_3("6. Layar Pemantauan Log GPS & Kelola Karyawan (F-07, F-08, DSS/ESS)")
    add_p("Fungsi Layar: Menyajikan log audit presensi GPS harian (mencakup waktu, jarak meter, status radius, dan koordinat satelit) serta panel administrasi data master akun karyawan.")
    add_p("Kebutuhan yang Dipenuhi: Memenuhi kebutuhan fungsional F-07, F-08, dan komponen DSS/ESS.")
    add_p("Gambar 3.9 Mockup Layar Monitoring Presensi GPS dan Kelola Pegawai", italic=True, size=10.5)

    # Output paths
    output_docs = r"D:\TUGAS\SIM SMT5\docs\LAPORAN_PROYEK_SIM_BAB_1_SAMPAI_3.docx"
    output_public = r"D:\TUGAS\SIM SMT5\public\LAPORAN_PROYEK_SIM_BAB_1_SAMPAI_3.docx"
    
    os.makedirs(os.path.dirname(output_docs), exist_ok=True)
    os.makedirs(os.path.dirname(output_public), exist_ok=True)

    doc.save(output_docs)
    doc.save(output_public)
    print(f"Successfully saved to:\n1. {output_docs}\n2. {output_public}")

if __name__ == "__main__":
    create_report()
