import docx
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT, WD_TAB_LEADER
from docx.enum.table import WD_TABLE_ALIGNMENT
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

def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="A0A0A0"):
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

    # Helper text functions
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
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(16)
        return p

    def add_heading_2(title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(13)
        return p

    def add_heading_3(title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    def add_image_centered(img_path, width_cm=7.0):
        if os.path.exists(img_path):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(8)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.keep_with_next = True
            run = p.add_run()
            run.add_picture(img_path, width=Cm(width_cm))
            return p
        else:
            print("Warning: Image not found at", img_path)
            return None

    def add_caption(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(8)
        run = p.add_run(text)
        run.italic = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(11)
        return p

    def style_table(table, col_widths, headers, data):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(table, "A0A0A0")
        
        # Header Row
        hdr_cells = table.rows[0].cells
        for i, header_text in enumerate(headers):
            hdr_cells[i].text = header_text
            set_cell_background(hdr_cells[i], "E8F2EC")
            set_cell_margins(hdr_cells[i], top=120, bottom=120, left=160, right=160)
            p = hdr_cells[i].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(0)
            for r in p.runs:
                r.bold = True
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11.5)

        # Data Rows
        for row_idx, row_data in enumerate(data):
            row_cells = table.rows[row_idx + 1].cells
            bg_color = "FFFFFF" if row_idx % 2 == 0 else "F7FAF8"
            for col_idx, cell_value in enumerate(row_data):
                row_cells[col_idx].text = str(cell_value)
                set_cell_background(row_cells[col_idx], bg_color)
                set_cell_margins(row_cells[col_idx], top=110, bottom=110, left=160, right=160)
                p = row_cells[col_idx].paragraphs[0]
                p.paragraph_format.line_spacing = 1.15
                p.paragraph_format.space_after = Pt(0)
                if col_idx == 0 and len(str(cell_value)) <= 5 and str(cell_value).isdigit():
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                else:
                    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                for r in p.runs:
                    r.font.name = 'Times New Roman'
                    r.font.size = Pt(11)

        # Widths
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = width

    # ================= COVER PAGE =================
    add_p("LAPORAN PROYEK SISTEM INFORMASI MANAJEMEN", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=15, space_before=16, space_after=8)
    add_p("PERANCANGAN SISTEM INFORMASI MANAJEMEN PRESENSI GPS DAN KEPEGAWAIAN KARYAWAN BERBASIS WEB MOBILE PADA PT NUSANTARA DIGITAL DENGAN METODE SDLC", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13.5, space_before=4, space_after=24)

    logo_path = r"D:\TUGAS\SIM SMT5\docs\extracted_media\word\media\image1.png"
    if os.path.exists(logo_path):
        add_image_centered(logo_path, width_cm=4.2)
    else:
        add_p("[ LOGO UNIVERSITAS PAMULANG ]", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, italic=True, size=12, space_before=30, space_after=30)

    p_mhs = doc.add_paragraph()
    p_mhs.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_mhs.paragraph_format.space_before = Pt(24)
    p_mhs.paragraph_format.space_after = Pt(28)
    p_mhs.paragraph_format.line_spacing = 1.3
    
    r = p_mhs.add_run("Disusun oleh:\n")
    r.bold = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(12.5)
    
    r = p_mhs.add_run("Nama  : Maulana Hasan Ibrahim\nNIM   : 241011402120\nKelas : 05TPLP013")
    r.font.name = 'Times New Roman'
    r.font.size = Pt(12)

    add_p("PROGRAM STUDI TEKNIK INFORMATIKA\nFAKULTAS ILMU KOMPUTER\nUNIVERSITAS PAMULANG\nTAHUN 2026", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13.5, space_before=16, space_after=0)
    
    doc.add_page_break()

    # ================= DAFTAR ISI =================
    add_heading_1("DAFTAR ISI")
    
    toc_items = [
        ("BAB I PERENCANAAN SISTEM", "1", True, 0),
        ("1.1 Latar Belakang", "1", False, 1),
        ("1.2 Profil Organisasi", "1", False, 1),
        ("1.3 Rumusan Masalah", "2", False, 1),
        ("1.4 Tujuan dan Manfaat", "2", False, 1),
        ("1.5 Ruang Lingkup", "2", False, 1),
        ("1.6 Studi Kelayakan", "3", False, 1),
        ("1.7 Jadwal Proyek", "3", False, 1),
        ("BAB II ANALISIS SISTEM", "4", True, 0),
        ("2.1 Metode Pengumpulan Data", "4", False, 1),
        ("2.2 Proses Bisnis yang Berjalan", "4", False, 1),
        ("2.3 Identifikasi Masalah", "5", False, 1),
        ("2.4 Pengguna dan Kebutuhan Informasi", "5", False, 1),
        ("2.5 Kebutuhan Fungsional", "6", False, 1),
        ("2.6 Kebutuhan Non-Fungsional", "6", False, 1),
        ("2.7 Jenis Sistem Informasi yang Dirancang", "7", False, 1),
        ("BAB III DESAIN SISTEM", "8", True, 0),
        ("3.1 Gambaran Sistem Usulan dan Komponen SIM", "8", False, 1),
        ("3.2 Desain Proses", "9", False, 1),
        ("3.3 Desain Data", "11", False, 1),
        ("3.4 Desain Output (Laporan)", "13", False, 1),
        ("3.5 Desain Antarmuka (Mockup)", "14", False, 1),
    ]

    for title, page_no, is_bold, indent_level in toc_items:
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.space_before = Pt(4 if is_bold else 0)
        
        # Add tab stop with leader dots at 14.0 cm (right aligned)
        tab_stops = p.paragraph_format.tab_stops
        tab_stops.add_tab_stop(Cm(14.0), WD_TAB_ALIGNMENT.RIGHT, WD_TAB_LEADER.DOTS)
        
        prefix = "   " * indent_level
        run1 = p.add_run(f"{prefix}{title}\t")
        run1.font.name = 'Times New Roman'
        run1.font.size = Pt(12.5 if is_bold else 12)
        run1.bold = is_bold
        
        run2 = p.add_run(page_no)
        run2.font.name = 'Times New Roman'
        run2.font.size = Pt(12.5 if is_bold else 12)
        run2.bold = is_bold

    doc.add_page_break()

    # ================= BAB I =================
    add_heading_1("BAB I\nPERENCANAAN SISTEM")

    add_heading_2("1.1 Latar Belakang")
    add_p("PT Nusantara Digital merupakan entitas usaha yang bergerak di bidang solusi teknologi informasi dan pengembangan perangkat lunak. Pada kantor operasional Kampus UNPAM Viktor 2, pengelolaan absensi karyawan saat ini masih menggunakan pencatatan manual pada buku presensi cetak dan koordinasi izin via perpesanan instan WhatsApp.")
    add_p("Pola manual ini memicu kendala operasional yang signifikan: tingginya potensi kecurangan presensi (titip absen), ketidakakuratan verifikasi fisik karyawan di lokasi kerja, serta alur pengajuan dan persetujuan cuti yang lambat (membutuhkan waktu 3 hingga 5 hari kerja). Dampaknya, divisi Human Resources (HR) kesulitan menyajikan rekapitulasi kehadiran yang sahih dan akurat setiap akhir bulan.")
    add_p("Untuk mengatasi permasalahan tersebut, dirancang Sistem Informasi Manajemen Presensi dan Kepegawaian berbasis Web Mobile / Progressive Web App (PWA) bernama hadir.. Sistem ini mengintegrasikan verifikasi koordinat GPS (geo-fencing) dengan batas radius 100 meter di UNPAM Viktor 2, modul persetujuan cuti digital secara real-time, dan dasbor pemantauan terpusat bagi manajemen.")

    add_heading_2("1.2 Profil Organisasi")
    add_p("Tabel 1.1 Profil Organisasi", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 1.2 Hasil Penilaian Studi Kelayakan", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 1.3 Jadwal Pelaksanaan Proyek (SDLC)", bold=True, size=11.5, space_after=3)
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
    diag_flowchart = r"D:\TUGAS\SIM SMT5\docs\diagram_images\flowchart_berjalan.png"
    add_image_centered(diag_flowchart, width_cm=13.5)
    add_caption("Gambar 2.1 Flowchart Sistem Presensi dan Pengajuan Cuti yang Sedang Berjalan")

    add_heading_2("2.3 Identifikasi Masalah")
    add_p("Tabel 2.1 Matriks Identifikasi Masalah", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 2.2 Kebutuhan Informasi Berdasarkan Tingkatan Manajemen (Materi P4)", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 2.3 Daftar Kebutuhan Fungsional (Functional Requirements)", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 2.4 Daftar Kebutuhan Non-Fungsional (Non-Functional Requirements)", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 2.5 Pemetaan Jenis Sistem Informasi (Materi P6)", bold=True, size=11.5, space_after=3)
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
    add_p("Tabel 3.1 Komponen SIM Usulan (Materi P2)", bold=True, size=11.5, space_after=3)
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
    diag_dfd0 = r"D:\TUGAS\SIM SMT5\docs\diagram_images\dfd_level_0.png"
    add_image_centered(diag_dfd0, width_cm=13.5)
    add_caption("Gambar 3.1 Diagram Konteks (DFD Level 0) Sistem Informasi hadir.")

    add_heading_3("3.2.2 DFD Level 1 (Dekomposisi Proses)")
    diag_dfd1 = r"D:\TUGAS\SIM SMT5\docs\diagram_images\dfd_level_1.png"
    add_image_centered(diag_dfd1, width_cm=13.5)
    add_caption("Gambar 3.2 DFD Level 1 / Flowchart Sistem Usulan hadir.")

    add_heading_2("3.3 Desain Data")
    add_heading_3("3.3.1 Entity Relationship Diagram (ERD)")
    diag_erd = r"D:\TUGAS\SIM SMT5\docs\diagram_images\erd_diagram.png"
    add_image_centered(diag_erd, width_cm=13.5)
    add_caption("Gambar 3.3 Entity Relationship Diagram (ERD) Sistem Informasi hadir.")

    add_heading_3("3.3.2 Kamus Data (Data Dictionary)")
    
    add_p("Tabel 3.2 Kamus Data Karyawan", bold=True, size=11.5, space_after=3)
    tbl_3_2 = doc.add_table(rows=9, cols=4)
    col_w_3_2 = [Cm(4.0), Cm(2.2), Cm(2.3), Cm(7.0)]
    headers_3_2 = ["Nama Data", "Tipe Data", "Ukuran", "Keterangan"]
    data_3_2 = [
        ["ID Karyawan (Kunci Utama)", "Teks", "10 karakter", "Kode pengenal unik tiap karyawan"],
        ["NIP", "Teks", "20 karakter", "Nomor Induk Pegawai unik"],
        ["Nama Lengkap", "Teks", "50 karakter", "Nama lengkap karyawan"],
        ["Email Kantor", "Teks", "50 karakter", "Alamat email dinas untuk login"],
        ["Kata Sandi", "Teks", "20 karakter", "Kata sandi akses login aplikasi"],
        ["Jabatan", "Teks", "30 karakter", "Jabatan posisi kerja (misal: HR / Staf)"],
        ["Divisi", "Teks", "30 karakter", "Bagian unit kerja karyawan"],
        ["Status Kerja", "Teks", "15 karakter", "Status keaktifan (Aktif / Nonaktif)"]
    ]
    style_table(tbl_3_2, col_w_3_2, headers_3_2, data_3_2)

    add_p("Tabel 3.3 Kamus Data Log Presensi Kehadiran", bold=True, size=11.5, space_before=8, space_after=3)
    tbl_3_3 = doc.add_table(rows=8, cols=4)
    col_w_3_3 = [Cm(4.0), Cm(2.2), Cm(2.3), Cm(7.0)]
    headers_3_3 = ["Nama Data", "Tipe Data", "Ukuran", "Keterangan"]
    data_3_3 = [
        ["ID Presensi (Kunci Utama)", "Teks", "10 karakter", "Nomor transaksi pencatatan absensi"],
        ["NIP Karyawan", "Teks", "20 karakter", "Relasi ke identitas pegawai yang hadir"],
        ["Jam Masuk", "Waktu", "8 karakter", "Waktu pencatatan kehadiran (WIB)"],
        ["Tanggal Hadir", "Tanggal", "10 karakter", "Tanggal pelaksanaan presensi kerja"],
        ["Lokasi Kantor", "Teks", "30 karakter", "Nama lokasi acuan (UNPAM Viktor 2)"],
        ["Jarak GPS", "Angka", "5 digit", "Jarak posisi HP ke kampus (dalam meter)"],
        ["Status Kehadiran", "Teks", "20 karakter", "Keterangan Tepat Waktu atau Terlambat"]
    ]
    style_table(tbl_3_3, col_w_3_3, headers_3_3, data_3_3)

    add_p("Tabel 3.4 Kamus Data Pengajuan Cuti", bold=True, size=11.5, space_before=8, space_after=3)
    tbl_3_4 = doc.add_table(rows=8, cols=4)
    col_w_3_4 = [Cm(4.0), Cm(2.2), Cm(2.3), Cm(7.0)]
    headers_3_4 = ["Nama Data", "Tipe Data", "Ukuran", "Keterangan"]
    data_3_4 = [
        ["ID Cuti (Kunci Utama)", "Teks", "10 karakter", "Nomor pengenal unik pengajuan cuti"],
        ["NIP Karyawan", "Teks", "20 karakter", "Relasi identitas pegawai pemohon cuti"],
        ["Jenis Cuti", "Teks", "30 karakter", "Kategori cuti (Tahunan, Sakit, Alasan Penting)"],
        ["Tanggal Cuti", "Tanggal", "10 karakter", "Tanggal waktu dimulainya cuti"],
        ["Lama Cuti", "Teks", "15 karakter", "Durasi hari cuti (misal: 1 Hari)"],
        ["Alasan Izin", "Teks", "Bebas", "Uraian keperluan atau alasan izin cuti"],
        ["Status Persetujuan", "Teks", "15 karakter", "Hasil putusan HR (Menunggu, Disetujui, Ditolak)"]
    ]
    style_table(tbl_3_4, col_w_3_4, headers_3_4, data_3_4)

    add_p("Tabel 3.5 Kamus Data Lokasi Kantor Acuan", bold=True, size=11.5, space_before=8, space_after=3)
    tbl_3_5 = doc.add_table(rows=5, cols=4)
    col_w_3_5 = [Cm(4.0), Cm(2.2), Cm(2.3), Cm(7.0)]
    headers_3_5 = ["Nama Data", "Tipe Data", "Ukuran", "Keterangan"]
    data_3_5 = [
        ["ID Lokasi (Kunci Utama)", "Teks", "10 karakter", "Kode pengenal titik lokasi kantor"],
        ["Nama Kantor", "Teks", "30 karakter", "Nama tempat acuan (UNPAM Viktor 2)"],
        ["Titik Koordinat GPS", "Koordinat", "20 karakter", "Posisi lintang dan bujur UNPAM Viktor 2"],
        ["Radius Maksimal", "Angka", "4 digit", "Batas jarak toleransi presensi (100 meter)"]
    ]
    style_table(tbl_3_5, col_w_3_5, headers_3_5, data_3_5)

    add_heading_2("3.4 Desain Output (Laporan)")
    add_p("Tabel 3.6 Rancangan Output Laporan Sistem", bold=True, size=11.5, space_after=3)
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
    
    mockup_dir = r"D:\TUGAS\SIM SMT5\prototype_design"
    
    # 1. Layar Login
    img_login = os.path.join(mockup_dir, "01 - Masuk.png")
    add_image_centered(img_login, width_cm=7.0)
    add_caption("Gambar 3.4 Mockup Layar Login")
    add_p("Fungsi layar: Menyediakan gerbang masuk terpadu dengan input email/NIP, kata sandi, pemilihan segmen peran (Karyawan atau Admin), serta verifikasi koordinat GPS ponsel secara otomatis. • Memenuhi kebutuhan: F-01, NF-01.", italic=False, size=11.5)

    # 2. Layar Dashboard sesuai peran
    img_beranda = os.path.join(mockup_dir, "02 - Beranda.png")
    add_image_centered(img_beranda, width_cm=7.0)
    add_caption("Gambar 3.5 Mockup Layar Dashboard sesuai peran")
    add_p("Fungsi layar: Menampilkan identitas profil staf aktif, kartu status presensi hari ini, indikator radius UNPAM Viktor 2, sisa jatah kuota cuti tahunan, serta akses cepat ke menu presensi dan pengajuan cuti. • Memenuhi kebutuhan: F-03, F-04, OAS.", italic=False, size=11.5)

    # 3. Layar Form input transaksi (TPS)
    img_gps = os.path.join(mockup_dir, "03 - Presensi GPS.png")
    add_image_centered(img_gps, width_cm=7.0)
    add_caption("Gambar 3.6 Mockup Layar Form input transaksi (TPS)")
    add_p("Fungsi layar: Memetakan lokasi fisik pengguna terhadap titik pusat UNPAM Viktor 2 secara grafis, menampilkan indikator jarak riil meter, dan tombol eksekusi kehadiran yang hanya aktif bila GPS berada dalam radius <= 100 meter. • Memenuhi kebutuhan: F-02, F-03, TPS.", italic=False, size=11.5)

    # 4. Layar Daftar / pencarian data
    img_riwayat = os.path.join(mockup_dir, "07 - Riwayat kehadiran.png")
    add_image_centered(img_riwayat, width_cm=7.0)
    add_caption("Gambar 3.7 Mockup Layar Daftar / pencarian data")
    add_p("Fungsi layar: Menyajikan daftar riwayat kehadiran karyawan secara berurutan berdasarkan tanggal, jam masuk, jam pulang, dan status kedatangan (tepat waktu, terlambat, atau cuti) beserta pencarian riwayat presensi. • Memenuhi kebutuhan: F-03, F-08, MIS.", italic=False, size=11.5)

    # 5. Layar Laporan untuk manajer (MIS)
    img_cuti = os.path.join(mockup_dir, "08 - Pengajuan cuti.png")
    add_image_centered(img_cuti, width_cm=7.0)
    add_caption("Gambar 3.8 Mockup Layar Laporan untuk manajer (MIS)")
    add_p("Fungsi layar: Panel formulir dan verifikasi pengajuan cuti kerja karyawan bagi Admin HR/Manajer untuk memeriksa alasan staf, jenis cuti, serta mengeksekusi persetujuan atau penolakan cuti secara real-time. • Memenuhi kebutuhan: F-04, F-05, F-06, MIS.", italic=False, size=11.5)

    # 6. Layar Dashboard pimpinan (ESS/DSS)
    img_sukses = os.path.join(mockup_dir, "05 - Presensi berhasil.png")
    add_image_centered(img_sukses, width_cm=7.0)
    add_caption("Gambar 3.9 Mockup Layar Dashboard pimpinan (ESS/DSS)")
    add_p("Fungsi layar: Menyajikan dasbor konfirmasi dan ringkasan eksekutif pemantauan kepatuhan lokasi presensi GPS karyawan, catatan jam kerja, serta validitas kehadiran secara terpadu. • Memenuhi kebutuhan: F-07, F-08, DSS/ESS.", italic=False, size=11.5)

    # Output paths
    output_docs = r"D:\TUGAS\SIM SMT5\docs\LAPORAN_PROYEK_SIM_BAB_1_SAMPAI_3.docx"
    output_public = r"D:\TUGAS\SIM SMT5\public\LAPORAN_PROYEK_SIM_BAB_1_SAMPAI_3.docx"
    
    os.makedirs(os.path.dirname(output_docs), exist_ok=True)
    os.makedirs(os.path.dirname(output_public), exist_ok=True)

    doc.save(output_docs)
    doc.save(output_public)
    print(f"Successfully updated and saved with images to:\n1. {output_docs}\n2. {output_public}")

if __name__ == "__main__":
    create_report()
