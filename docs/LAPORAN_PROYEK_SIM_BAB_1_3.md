# LAPORAN PROYEK SISTEM INFORMASI MANAJEMEN

## PERANCANGAN SISTEM INFORMASI MANAJEMEN PRESENSI GPS DAN KEPEGAWAIAN KARYAWAN BERBASIS WEB MOBILE PADA PT NUSANTARA DIGITAL DENGAN METODE SDLC

```
                      [ LOGO UNIVERSITAS PAMULANG ]
```

**Disusun oleh:**
- **Nama**  : Maulana Hasan Ibrahim
- **NIM**   : 241011402120
- **Kelas** : 05TPLP013

---

**PROGRAM STUDI TEKNIK INFORMATIKA**  
**FAKULTAS ILMU KOMPUTER**  
**UNIVERSITAS PAMULANG**  
**TAHUN 2026**

---

## DAFTAR ISI

```text
BAB I PERENCANAAN SISTEM ................................................ 1
   1.1 Latar Belakang ................................................... 1
   1.2 Profil Organisasi ................................................ 1
   1.3 Rumusan Masalah .................................................. 2
   1.4 Tujuan dan Manfaat ............................................... 2
   1.5 Ruang Lingkup .................................................... 2
   1.6 Studi Kelayakan .................................................. 3
   1.7 Jadwal Proyek .................................................... 3
BAB II ANALISIS SISTEM .................................................. 4
   2.1 Metode Pengumpulan Data .......................................... 4
   2.2 Proses Bisnis yang Berjalan ...................................... 4
   2.3 Identifikasi Masalah ............................................. 5
   2.4 Pengguna dan Kebutuhan Informasi ................................. 5
   2.5 Kebutuhan Fungsional ............................................. 6
   2.6 Kebutuhan Non-Fungsional ......................................... 6
   2.7 Jenis Sistem Informasi yang Dirancang ............................ 7
BAB III DESAIN SISTEM ................................................... 8
   3.1 Gambaran Sistem Usulan dan Komponen SIM .......................... 8
   3.2 Desain Proses .................................................... 9
   3.3 Desain Data ...................................................... 11
   3.4 Desain Output (Laporan) .......................................... 13
   3.5 Desain Antarmuka (Mockup) ........................................ 14
```

---

## BAB I  
## PERENCANAAN SISTEM

### 1.1 Latar Belakang
PT Nusantara Digital merupakan entitas usaha yang bergerak di bidang solusi teknologi informasi dan pengembangan perangkat lunak. Pada kantor operasional Kampus UNPAM Viktor 2, pengelolaan absensi karyawan saat ini masih menggunakan pencatatan manual pada buku presensi cetak dan koordinasi izin via perpesanan instan WhatsApp.

Pola manual ini memicu kendala operasional yang signifikan: tingginya potensi kecurangan presensi (*titip absen*), ketidakakuratan verifikasi fisik karyawan di lokasi kerja, serta alur pengajuan dan persetujuan cuti yang lambat (membutuhkan waktu 3 hingga 5 hari kerja). Dampaknya, divisi *Human Resources* (HR) kesulitan menyajikan rekapitulasi kehadiran yang sahih dan akurat setiap akhir bulan.

Untuk mengatasi permasalahan tersebut, dirancang Sistem Informasi Manajemen Presensi dan Kepegawaian berbasis *Web Mobile / Progressive Web App* (PWA) bernama **hadir.**. Sistem ini mengintegrasikan verifikasi koordinat GPS (*geo-fencing*) dengan batas radius 100 meter di UNPAM Viktor 2, modul persetujuan cuti digital secara *real-time*, dan dasbor pemantauan terpusat bagi manajemen.

### 1.2 Profil Organisasi

Tabel 1.1 Profil Organisasi
| Aspek | Keterangan |
| :--- | :--- |
| **Nama organisasi** | PT Nusantara Digital |
| **Bidang usaha** | Solusi Teknologi Informasi & Rekayasa Perangkat Lunak |
| **Alamat** | Kampus Universitas Pamulang Gedung Viktor 2 Lt. 5, Jl. Puspitek No. 46, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310 |
| **Jumlah karyawan** | 48 Karyawan Aktif |
| **Narasumber** | Rina Wijaya, S.Kom., M.M. (HR & Operations Manager) |
| **Struktur organisasi (ringkas)** | Direktur Utama &rarr; HR & Operations Manager &rarr; Team Lead Divisi (Teknologi, Desain Produk, Operasional) &rarr; Staf Karyawan |

### 1.3 Rumusan Masalah
1. Bagaimana merancang mekanisme pencatatan presensi digital berbasis GPS yang dapat memvalidasi posisi fisik karyawan di dalam radius 100 meter Kampus UNPAM Viktor 2 secara akurat?
2. Bagaimana membangun modul pengajuan izin dan cuti kerja karyawan secara *paperless* dengan sistem notifikasi putusan (*approval/rejection*) langsung ke perangkat pemohon?
3. Bagaimana menyajikan informasi log kehadiran dan rekapitulasi kepegawaian secara *real-time* bagi Admin HR dan manajemen untuk mendukung pengambilan keputusan?

### 1.4 Tujuan dan Manfaat

#### 1.4.1 Tujuan Proyek
1. Merancang dan mengimplementasikan sistem presensi digital berbasis *geo-fencing* GPS dengan radius validasi 100 meter di UNPAM Viktor 2 guna mencegah manipulasi kehadiran.
2. Mengembangkan alur kerja digital untuk pengajuan, validasi, dan persetujuan cuti/izin karyawan secara transparan dan otomatis.
3. Membangun modul pelaporan dan pemantauan terpusat yang menghasilkan data kehadiran siap saji untuk Admin HR dan pimpinan.

#### 1.4.2 Manfaat Proyek
- **Bagi Organisasi (PT Nusantara Digital):** Meningkatkan integritas data absensi, menghemat biaya operasional kertas formulir, serta mereduksi waktu rekapitulasi kehadiran hingga 70%.
- **Bagi Pengguna (Karyawan & HR):** Karyawan memperoleh kepastian status presensi dan notifikasi cuti secara instan melalui ponsel pintar; Admin HR dapat mengelola data staf dan log audit dengan cepat.
- **Bagi Penulis:** Mengaplikasikan teori mata kuliah Sistem Informasi Manajemen dan metodologi *System Development Life Cycle* (SDLC) dalam memecahkan masalah nyata di industri.

### 1.5 Ruang Lingkup

#### 1.5.1 Batasan Sistem (In-Scope)
1. Modul autentikasi multi-peran (*Role-Based Access Control*) untuk Karyawan dan Admin HR.
2. Validasi presensi masuk berbasis koordinat GPS riil perangkat dengan batas radius 100 meter dari titik UNPAM Viktor 2 (Latitude: -6.3458, Longitude: 106.6917), dilengkapi akun uji coba (*test account*).
3. Pengajuan izin dan cuti mandiri oleh karyawan beserta pemotongan kuota cuti tahunan otomatis.
4. Persetujuan atau penolakan pengajuan cuti oleh Admin HR disertai notifikasi *floating banner* dan *audio chime*.
5. Manajemen data master karyawan (tambah, perbarui profil jabatan/divisi, dan pengaturan status aktif).
6. Dasbor pemantauan log presensi GPS dan laporan rekapitulasi kehadiran (MIS/DSS).

#### 1.5.2 Hal yang Tidak Termasuk (Out-of-Scope)
1. Modul perhitungan penggajian (*payroll*) dan integrasi transfer perbankan.
2. Integrasi mesin fisik biometrik sidik jari (*fingerprint hardware*).
3. Pengelolaan potongan pajak penghasilan (PPh 21) dan jaminan ketenagakerjaan.

### 1.6 Studi Kelayakan

Tabel 1.2 Hasil Penilaian Studi Kelayakan
| Aspek | Pertanyaan | Hasil Penilaian |
| :--- | :--- | :--- |
| **Teknis** | Apakah teknologi tersedia dan mampu diterapkan? | **Layak.** Sistem dirancang berbasis *Web Mobile / PWA* (Next.js 16, TypeScript, Tailwind CSS) yang dapat diakses melalui peramban ponsel pintar modern tanpa instalasi rumit, memanfaatkan Geolocation API bawaan perangkat. |
| **Ekonomi** | Apakah manfaat yang diperoleh sebanding dengan investasi biaya? | **Layak.** Mengeliminasi biaya pengadaan mesin absensi fisik, menghemat penggunaan kertas formulir, serta mengurangi biaya lembur admin HR dalam merekap absensi bulanan. |
| **Operasional** | Apakah pengguna mampu dan bersedia mengoperasikan sistem? | **Layak.** Tampilan antarmuka berorientasi *mobile-first*, intuitif, minimalis, dan mudah digunakan oleh staf lintas generasi dengan pelatihan singkat. |
| **Jadwal** | Apakah proyek dapat diselesaikan tepat waktu sesuai batas semester? | **Layak.** Pengembangan direncanakan berlangsung selama 5 pertemuan/minggu (P9 hingga P13) sesuai kalender akademik perkuliahan. |

### 1.7 Jadwal Proyek

Tabel 1.3 Jadwal Pelaksanaan Proyek (SDLC)
| Tahap SDLC | P9 | P10 | P11 | P12 | P13 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Perencanaan (*Planning*) | &#9632; | | | | |
| Analisis Sistem (*Analysis*) | | &#9632; | | | |
| Desain Sistem (*Design*) | | | &#9632; | | |
| Rencana Implementasi & Pengujian | | | | &#9632; | |
| Penyusunan Laporan & Presentasi | | | | | &#9632; |

---

## BAB II  
## ANALISIS SISTEM

### 2.1 Metode Pengumpulan Data
Pengumpulan data primer dan sekunder dilakukan dengan tiga metode:
1. **Observasi Langsung:** Mengamati proses pencatatan kehadiran manual karyawan saat jam masuk kerja (07.30–08.00 WIB) di kantor operasional UNPAM Viktor 2 pada tanggal 3–6 November 2026.
2. **Wawancara Terstruktur:** Dilakukan bersama Rina Wijaya (HR & Operations Manager) pada 5 November 2026 untuk mengidentifikasi titik lemah verifikasi absensi manual dan alur disposisi cuti.
3. **Studi Dokumen:** Memeriksa format buku kehadiran fisik, formulir permohonan cuti kertas, dan berkas rekapitulasi Excel divisi HR periode September–Oktober 2026.

### 2.2 Proses Bisnis yang Berjalan

#### 2.2.1 Deskripsi Alur Kerja Manual
1. **Presensi Masuk:** Karyawan tiba di kantor dan membubuhkan tanda tangan fisik pada buku presensi di meja resepsionis/ruang HR.
2. **Pengajuan Izin/Cuti:** Karyawan mengisi formulir kertas permohonan izin/cuti atau mengirimkan pesan WhatsApp ke Admin HR.
3. **Persetujuan HR:** Admin HR memeriksa sisa hak cuti karyawan secara manual di buku catatan lalu menandatangani formulir fisik sebelum diajukan ke manajer operasional.
4. **Rekapitulasi Bulanan:** Setiap akhir bulan, Admin HR memindahkan data tanda tangan fisik ke dalam lembar kerja Microsoft Excel, yang membutuhkan waktu 3 hingga 5 hari kerja dan rawan *human error*.

#### 2.2.2 Flowchart Sistem yang Berjalan

| [ Gambar Diagram: Flowchart Sistem Presensi & Pengajuan Cuti Berjalan ] |
*Gambar 2.1 Flowchart Sistem Presensi dan Pengajuan Cuti yang Sedang Berjalan*

### 2.3 Identifikasi Masalah

Tabel 2.1 Matriks Identifikasi Masalah
| No | Masalah | Penyebab | Dampak |
| :---: | :--- | :--- | :--- |
| 1 | Presensi tidak mencerminkan kehadiran fisik aktual (*titip absen*) | Pencatatan tanda tangan manual tanpa validasi koordinat lokasi | Terjadi kecurangan absensi dan ketidakdisiplinan jam kerja karyawan. |
| 2 | Proses persetujuan cuti memakan waktu lama (3–5 hari) | Pengajuan menggunakan formulir fisik dan perpesanan pribadi | Dokumen sering terselip; karyawan tidak mendapat kepastian hak libur kerja. |
| 3 | Perhitungan sisa kuota cuti sering salah rekap | Pencatatan kuota cuti terpisah di buku arsip personal HR | Potensi klaim cuti melebihi hak tahunan karyawan. |
| 4 | Rekapitulasi laporan kehadiran bulanan lambat | Pemindahan data manual dari kertas ke lembar kerja Excel | Waktu kerja HR tersita 3–5 hari kerja setiap akhir bulan. |

### 2.4 Pengguna dan Kebutuhan Informasi

Tabel 2.2 Kebutuhan Informasi Berdasarkan Tingkatan Manajemen (Materi P4)
| Pengguna / Peran | Tingkatan Manajemen | Informasi yang Dibutuhkan | Frekuensi |
| :--- | :--- | :--- | :--- |
| **Karyawan** | Operasional | Status presensi hari ini, jam masuk tercatat, sisa kuota cuti tahunan, status persetujuan izin/cuti | *Real-time* / Harian |
| **Admin HR** | Taktis (Manajerial) | Log harian presensi GPS, jarak meter dari kampus, daftar pengajuan cuti menunggu persetujuan, data master karyawan | Harian / Mingguan |
| **Direktur Utama / Pimpinan** | Strategis (Eksekutif) | Rekapitulasi persentase kehadiran per divisi, rasio ketepatan waktu, total izin/cuti bulanan | Bulanan / Kuartalan |

### 2.5 Kebutuhan Fungsional

Tabel 2.3 Daftar Kebutuhan Fungsional (*Functional Requirements*)
| Kode | Kebutuhan Fungsional | Pengguna |
| :---: | :--- | :--- |
| **F-01** | Sistem dapat melakukan autentikasi login multi-peran (Karyawan & Admin HR) dengan email/NIP dan kata sandi | Karyawan, Admin HR |
| **F-02** | Sistem dapat mendeteksi sensor GPS perangkat dan memvalidasi posisi dalam radius 100 meter area UNPAM Viktor 2 | Karyawan |
| **F-03** | Sistem dapat melakukan pencatatan presensi masuk dan merekam riwayat jam kedatangan harian | Karyawan |
| **F-04** | Sistem dapat memproses formulir pengajuan cuti kerja (jenis cuti, tanggal, durasi, alasan) secara mandiri | Karyawan |
| **F-05** | Sistem dapat menyetujui (*approve*) atau menolak (*reject*) pengajuan cuti serta memotong kuota cuti secara otomatis | Admin HR |
| **F-06** | Sistem dapat mengirimkan notifikasi *in-app push banner* dan nada audio ke perangkat karyawan saat status cuti diputus | Karyawan |
| **F-07** | Sistem dapat mengelola master data karyawan (tambah karyawan, edit nama, jabatan, divisi, email, dan status aktif) | Admin HR |
| **F-08** | Sistem dapat menyajikan monitoring log presensi GPS *live* dan mencetak laporan rekapitulasi kehadiran | Admin HR, Pimpinan |

### 2.6 Kebutuhan Non-Fungsional

Tabel 2.4 Daftar Kebutuhan Non-Fungsional (*Non-Functional Requirements*)
| Kode | Aspek | Kebutuhan Non-Fungsional |
| :---: | :--- | :--- |
| **NF-01** | **Keamanan** | Akses dibatasi menggunakan *Role-Based Access Control* (RBAC); sandi pengguna tersimpan aman; data formulir disanitasi dari ancaman XSS dan SQL Injection. |
| **NF-02** | **Kinerja & Kecepatan** | Waktu respons deteksi koordinat GPS dan validasi jarak kurang dari 3 detik; pemuatan halaman aplikasi di ponsel di bawah 2 detik. |
| **NF-03** | **Keandalan (*Reliability*)** | Aplikasi berjalan dalam arsitektur PWA (*Progressive Web App*) yang stabil, responsif pada berbagai ukuran layar ponsel, dan mendukung pelacakan koordinat berkesinambungan (*watchPosition*). |
| **NF-04** | **Usabilitas (*Usability*)** | Desain antarmuka minimalis, bersih, bebas elemen membingungkan (*anti-slop*), kontras warna memenuhi standar WCAG AA (rasio &ge; 4.5:1), dan tombol mudah dijangkau satu tangan. |

### 2.7 Jenis Sistem Informasi yang Dirancang

Tabel 2.5 Pemetaan Jenis Sistem Informasi (Materi P6)
| Jenis SI | Bagian Sistem yang Dirancang | Pengguna |
| :--- | :--- | :--- |
| **TPS** (*Transaction Processing System*) | Modul input presensi GPS masuk harian dan modul pengisian formulir pengajuan cuti mandiri | Karyawan |
| **MIS** (*Management Information System*) | Modul rekapitulasi presensi harian/bulanan, log audit validasi GPS, dan modul riwayat cuti staf | Admin HR |
| **DSS / ESS** (*Decision / Executive Support*) | Dasbor analitik kedisiplinan divisi, rasio kepatuhan jam kerja karyawan, dan statistik utilisasi cuti tahunan | Direktur Utama, HR Manager |
| **OAS** (*Office Automation System*) | Pengiriman notifikasi *floating banner* keputusan cuti otomatis dan pengarsipan data digital tanpa kertas | Karyawan, Admin HR |

---

## BAB III  
## DESAIN SISTEM

### 3.1 Gambaran Sistem Usulan dan Komponen SIM

#### 3.1.1 Gambaran Umum Sistem Usulan
Sistem informasi usulan (**hadir.**) dirancang dengan arsitektur modern berbasis *Web Mobile / PWA*. Karyawan mengakses sistem melalui peramban ponsel pintar. Sistem secara otomatis meminta izin sensor lokasi GPS dan menghitung jarak menggunakan rumus matematika *Haversine* terhadap titik pusat Kampus UNPAM Viktor 2 (-6.3458, 106.6917).

Jika karyawan berada dalam batas radius aman 100 meter dan GPS aktif, presensi dapat dikonfirmasi dalam satu sentuhan. Untuk pengajuan cuti, karyawan mengisi data pada formulir digital, lalu notifikasi langsung masuk ke dasbor Admin HR untuk disetujui atau ditolak secara *real-time*. Hasil persetujuan akan langsung memicu notifikasi visual dan nada *audio chime* pada ponsel karyawan yang bersangkutan.

#### 3.1.2 Enam Komponen SIM Usulan

Tabel 3.1 Komponen SIM Usulan (Materi P2)
| Komponen SIM | Wujud pada Sistem Usulan |
| :--- | :--- |
| **Hardware** | *Client:* Smartphone Android/iOS milik karyawan dan 1 unit PC/Laptop Admin HR. *Server:* Server komputasi awan (*Cloud hosting* Vercel). |
| **Software** | *Framework:* Next.js 16 (React 19, TypeScript), Tailwind CSS, Lucide Icons, Geolocation API, Web Audio API, PWA Service Worker. |
| **Data** | Basis data relasional terstruktur: entitas profil karyawan, jadwal kerja, log presensi GPS, pengajuan cuti, dan log notifikasi. |
| **Prosedur** | SOP Presensi Masuk Berbasis Radius GPS UNPAM Viktor 2, SOP Pengajuan Cuti Mandiri Karyawan, dan SOP Validasi Keputusan Admin HR. |
| **Manusia (*People*)** | Karyawan PT Nusantara Digital (sebagai operator presensi/pemohon), Admin HR (pengelola & validator), dan Direktur (penerima laporan). |
| **Jaringan** | Koneksi internet seluler (4G/5G) pada ponsel pengguna, jaringan Wi-Fi kampus UNPAM Viktor 2, dan protokol komunikasi terenkripsi HTTPS (SSL/TLS). |

### 3.2 Desain Proses

#### 3.2.1 Diagram Konteks (DFD Level 0)
| [ Gambar Diagram: DFD Level 0 / Diagram Konteks Sistem hadir. ] |
*Gambar 3.1 Diagram Konteks (DFD Level 0) Sistem Informasi hadir.*

#### 3.2.2 DFD Level 1 (Dekomposisi Proses)
| [ Gambar Diagram: DFD Level 1 Sistem Informasi hadir. ] |
*Gambar 3.2 DFD Level 1 / Flowchart Sistem Usulan hadir.*

### 3.3 Desain Data

#### 3.3.1 Entity Relationship Diagram (ERD)
| [ Gambar Diagram: Entity Relationship Diagram (ERD) Sistem hadir. ] |
*Gambar 3.3 Entity Relationship Diagram (ERD) Sistem Informasi hadir.*

#### 3.3.2 Kamus Data (*Data Dictionary*)

Tabel 3.2 Kamus Data Tabel `karyawan` (*user_profiles*)
| Nama Field | Tipe Data | Panjang | Keterangan |
| :--- | :--- | :---: | :--- |
| `id` (PK) | VARCHAR | 36 | Pengenal unik karyawan (UUID) |
| `nip` | VARCHAR | 20 | Nomor Induk Pegawai unik |
| `name` | VARCHAR | 100 | Nama lengkap karyawan |
| `email` | VARCHAR | 100 | Alamat email dinas karyawan |
| `password` | VARCHAR | 255 | Hash kata sandi terenkripsi |
| `role_position` | VARCHAR | 50 | Jabatan struktural karyawan |
| `division` | VARCHAR | 50 | Unit kerja / divisi |
| `status_active` | VARCHAR | 15 | Status kepegawaian (Aktif / Nonaktif) |

Tabel 3.3 Kamus Data Tabel `attendance_logs`
| Nama Field | Tipe Data | Panjang | Keterangan |
| :--- | :--- | :---: | :--- |
| `id` (PK) | VARCHAR | 36 | Pengenal unik log presensi |
| `user_id` (FK) | VARCHAR | 36 | Kunci relasi ke tabel `karyawan` |
| `office_id` (FK) | VARCHAR | 36 | Kunci relasi ke tabel `office_locations` |
| `time_clock_in` | VARCHAR | 10 | Waktu presensi masuk (WIB) |
| `date_entry` | DATE | - | Tanggal pelaksanaan presensi |
| `user_latitude` | DECIMAL | 10,7 | Koordinat lintang saat presensi |
| `user_longitude`| DECIMAL | 10,7 | Koordinat bujur saat presensi |
| `distance_meters`| INT | 6 | Jarak meter dari titik acuan kantor |
| `status_presence`| VARCHAR | 20 | Status kehadiran (Tepat Waktu / Terlambat) |

Tabel 3.4 Kamus Data Tabel `leave_requests`
| Nama Field | Tipe Data | Panjang | Keterangan |
| :--- | :--- | :---: | :--- |
| `id` (PK) | VARCHAR | 36 | Pengenal unik pengajuan cuti |
| `user_id` (FK) | VARCHAR | 36 | Kunci relasi ke pemohon cuti |
| `request_number` | VARCHAR | 25 | Nomor registrasi pengajuan (*auto-generated*) |
| `leave_type` | VARCHAR | 30 | Jenis cuti (Tahunan, Sakit, Alasan Penting) |
| `date_effective` | VARCHAR | 30 | Tanggal pelaksanaan cuti |
| `duration_days` | VARCHAR | 20 | Lama durasi hari cuti |
| `reason_text` | TEXT | - | Deskripsi alasan pengajuan cuti |
| `status_approval`| VARCHAR | 15 | Status putusan (Menunggu, Disetujui, Ditolak) |
| `approver_name` | VARCHAR | 100 | Nama pejabat HR yang memutus |

Tabel 3.5 Kamus Data Tabel `office_locations`
| Nama Field | Tipe Data | Panjang | Keterangan |
| :--- | :--- | :---: | :--- |
| `id` (PK) | VARCHAR | 36 | Pengenal unik titik kantor |
| `office_name` | VARCHAR | 50 | Nama lokasi acuan (UNPAM Viktor 2) |
| `center_latitude`| DECIMAL | 10,7 | Koordinat lintang titik pusat (-6.3458000) |
| `center_longitude`| DECIMAL | 10,7 | Koordinat bujur titik pusat (106.6917000) |
| `max_radius_meter`| INT | 4 | Batas radius validasi toleransi (100 meter) |

### 3.4 Desain Output (Laporan)

Tabel 3.6 Rancangan Output Laporan Sistem
| Nama Laporan | Pengguna | Isi / Kolom Laporan | Periode |
| :--- | :--- | :--- | :--- |
| **Laporan Rekapitulasi Presensi Harian** | Admin HR, Team Lead | Tanggal, NIP, Nama Karyawan, Divisi, Jam Masuk, Jarak GPS (Meter), Koordinat Satelit, Status (Sah/Di Luar Area/Terlambat) | Harian |
| **Laporan Pengajuan dan Rekap Cuti Staf** | HR Manager, Direktur | Nomor Registrasi, Nama Pegawai, Divisi, Jenis Cuti, Tanggal Pelaksanaan, Sisa Kuota, Status Keputusan HR, Catatan Putusan | Bulanan |
| **Laporan Analitik Kedisiplinan Kerja (MIS/DSS)** | Direktur Utama, HR Manager | Nama Divisi, Jumlah Personel, Tingkat Kehadiran (%), Rata-rata Keterlambatan (Menit), Rasio Cuti Tahunan | Bulanan / Kuartalan |

### 3.5 Desain Antarmuka (Mockup)

#### 1. Layar Login & Pemilihan Peran (F-01, NF-01)
| [ Gambar Mockup Figma: Layar Login Masuk Karyawan & Admin ] |
*Gambar 3.4 Mockup Layar Login*
Fungsi layar: Menyediakan gerbang masuk terpadu dengan input email/NIP, kata sandi, pemilihan segmen peran (Karyawan atau Admin), serta verifikasi koordinat GPS ponsel secara otomatis. • Memenuhi kebutuhan: F-01, NF-01.

#### 2. Layar Dashboard Beranda Karyawan (F-03, F-04, OAS)
| [ Gambar Mockup Figma: Layar Beranda Karyawan ] |
*Gambar 3.5 Mockup Layar Dashboard sesuai peran*
Fungsi layar: Menampilkan identitas profil staf aktif, kartu status presensi hari ini, indikator radius UNPAM Viktor 2, sisa jatah kuota cuti tahunan, serta akses cepat ke menu presensi dan pengajuan cuti. • Memenuhi kebutuhan: F-03, F-04, OAS.

#### 3. Layar Presensi GPS & Peta Geo-fencing (F-02, F-03, TPS)
| [ Gambar Mockup Figma: Layar Presensi GPS Masuk ] |
*Gambar 3.6 Mockup Layar Form input transaksi (TPS)*
Fungsi layar: Memetakan lokasi fisik pengguna terhadap titik pusat UNPAM Viktor 2 secara grafis, menampilkan indikator jarak riil meter, dan tombol eksekusi kehadiran yang hanya aktif bila GPS berada dalam radius &le; 100 meter. • Memenuhi kebutuhan: F-02, F-03, TPS.

#### 4. Layar Formulir Pengajuan Cuti Karyawan (F-04, TPS, OAS)
| [ Gambar Mockup Figma: Layar Riwayat Kehadiran ] |
*Gambar 3.7 Mockup Layar Daftar / pencarian data*
Fungsi layar: Menyajikan daftar riwayat kehadiran karyawan secara berurutan berdasarkan tanggal, jam masuk, jam pulang, dan status kedatangan (tepat waktu, terlambat, atau cuti) beserta pencarian riwayat presensi. • Memenuhi kebutuhan: F-03, F-08, MIS.

#### 5. Layar Persetujuan Cuti & Notifikasi Admin HR (F-05, F-06, MIS)
| [ Gambar Mockup Figma: Layar Pengajuan Cuti Karyawan ] |
*Gambar 3.8 Mockup Layar Laporan untuk manajer (MIS)*
Fungsi layar: Panel formulir dan verifikasi pengajuan cuti kerja karyawan bagi Admin HR/Manajer untuk memeriksa alasan staf, jenis cuti, serta mengeksekusi persetujuan atau penolakan cuti secara *real-time*. • Memenuhi kebutuhan: F-04, F-05, F-06, MIS.

#### 6. Layar Pemantauan Log GPS & Kelola Karyawan (F-07, F-08, DSS/ESS)
| [ Gambar Mockup Figma: Layar Presensi Berhasil & Dashboard Eksekutif ] |
*Gambar 3.9 Mockup Layar Dashboard pimpinan (ESS/DSS)*
Fungsi layar: Menyajikan dasbor konfirmasi dan ringkasan eksekutif pemantauan kepatuhan lokasi presensi GPS karyawan, catatan jam kerja, serta validitas kehadiran secara terpadu. • Memenuhi kebutuhan: F-07, F-08, DSS/ESS.
