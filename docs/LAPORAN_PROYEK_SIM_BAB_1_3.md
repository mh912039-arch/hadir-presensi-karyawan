# LAPORAN PROYEK SISTEM INFORMASI MANAJEMEN (SIM)
## PENGEMBANGAN SISTEM INFORMASI PRESENSI BERBASIS GPS MOBILE "hadir." PADA PT NUSANTARA DIGITAL (KAMPUS UNPAM VIKTOR 2)
### LAPORAN TAHAP BAB I S.D. BAB III

---

**Disusun Oleh:**  
- **Nama Mahasiswa** : Maulana Hasan Ibrahim  
- **NIM** : 241011402120  
- **Kelas** : 05TPLP013  
- **Mata Kuliah** : Sistem Informasi Manajemen (SIM)  
- **Dosen Pengampu** : Dosen Pengampu Mata Kuliah SIM  
- **Program Studi** : Teknik Informatika  
- **Fakultas** : Ilmu Komputer  
- **Universitas** : Universitas Pamulang  
- **Tahun Akademik** : 2026/2027  

---

## DAFTAR ISI

```text
DAFTAR ISI ........................................................ i
BAB I PERENCANAAN SISTEM .......................................... 1
   1.1 Latar Belakang ............................................. 1
   1.2 Profil Organisasi .......................................... 1
   1.3 Rumusan Masalah ............................................ 2
   1.4 Tujuan dan Manfaat ......................................... 2
   1.5 Ruang Lingkup .............................................. 2
   1.6 Studi Kelayakan ............................................ 3
   1.7 Jadwal Proyek .............................................. 3
BAB II ANALISIS SISTEM ............................................ 4
   2.1 Metode Pengumpulan Data .................................... 4
   2.2 Proses Bisnis yang Berjalan ................................ 4
   2.3 Identifikasi Masalah ....................................... 5
   2.4 Pengguna dan Kebutuhan Informasi ........................... 5
   2.5 Kebutuhan Fungsional ....................................... 6
   2.6 Kebutuhan Non-Fungsional ................................... 6
   2.7 Jenis Sistem Informasi yang Dirancang ...................... 7
BAB III DESAIN SISTEM ............................................. 8
   3.1 Gambaran Sistem Usulan dan Komponen SIM .................... 8
   3.2 Desain Proses .............................................. 9
   3.3 Desain Data ................................................ 11
   3.4 Desain Output (Laporan) .................................... 13
   3.5 Desain Antarmuka (Mockup) .................................. 14
```

---

## BAB I  
## PERENCANAAN SISTEM

### 1.1 Latar Belakang
PT Nusantara Digital merupakan entitas usaha yang bergerak di bidang solusi teknologi informasi dan rekayasa perangkat lunak. Pada kantor operasional Kampus Universitas Pamulang Gedung Viktor 2 Lt. 5, pengelolaan kehadiran karyawan saat ini masih mengandalkan pencatatan tanda tangan manual pada buku presensi cetak dan koordinasi permohonan izin/cuti melalui pesan obrolan instan WhatsApp.

Pola manual konvensional tersebut memicu 3 (tiga) masalah utama yang menghambat efisiensi operasional organisasi:
1. **Tingginya potensi kecurangan presensi (*titip absen*)**, karena ketiadaan validasi koordinat lokasi fisik karyawan saat mencatat kehadiran di kantor.
2. **Alur pengajuan dan persetujuan cuti yang memakan waktu lama (3 hingga 5 hari kerja)**, akibat formulir kertas dan riwayat obrolan WhatsApp personal sering terselip atau lambat direspons.
3. **Proses rekapitulasi laporan kehadiran bulanan yang lambat dan rawan *human error***, karena staf Human Resources (HR) harus memindahkan data tanda tangan fisik satu per satu ke lembar kerja Microsoft Excel di setiap akhir bulan.

Untuk menyelesaikan ketiga permasalahan tersebut secara berkesinambungan, dirancang Sistem Informasi Manajemen Presensi dan Kepegawaian berbasis *Web Mobile / Progressive Web App* (PWA) bernama **hadir.**. Sistem ini mengintegrasikan verifikasi sensor GPS (*geo-fencing*) berjarak radius aman maksimal 100 meter dari Kampus UNPAM Viktor 2, modul pengajuan dan persetujuan cuti digital (*paperless*) dengan notifikasi seketika di ponsel pemohon, serta dasbor rekapitulasi data kehadiran otomatis dan terpusat bagi manajemen.

### 1.2 Profil Organisasi

Tabel 1.1 Profil Organisasi
| Aspek | Keterangan |
| :--- | :--- |
| **Nama organisasi** | PT Nusantara Digital |
| **Bidang usaha** | Solusi Teknologi Informasi & Rekayasa Perangkat Lunak |
| **Alamat** | Kampus Universitas Pamulang Gedung Viktor 2 Lt. 5, Jl. Puspitek No. 46, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310 |
| **Jumlah karyawan** | 48 Karyawan Aktif |
| **Narasumber** | Rina Wijaya, S.Kom., M.M. (HR & Operations Manager) |
| **Struktur organisasi** | Direktur Utama &rarr; HR & Operations Manager &rarr; Team Lead Divisi (Teknologi, Desain Produk, Operasional) &rarr; Staf Karyawan |

### 1.3 Rumusan Masalah
1. Bagaimana merancang mekanisme presensi digital berbasis GPS (*geo-fencing*) yang dapat memvalidasi posisi fisik karyawan di dalam batas radius 100 meter Kampus UNPAM Viktor 2 guna mencegah kecurangan *titip absen*?
2. Bagaimana membangun modul pengajuan izin dan cuti karyawan secara *paperless* dengan notifikasi persetujuan instan langsung ke perangkat ponsel pemohon?
3. Bagaimana menyajikan informasi log kehadiran dan rekapitulasi data kepegawaian secara otomatis dan *real-time* bagi Admin HR untuk menggantikan proses rekapitulasi manual di Excel?

### 1.4 Tujuan dan Manfaat

#### 1.4.1 Tujuan Proyek
1. Mencegah manipulasi kehadiran (*titip absen*) dengan menerapkan validasi sensor GPS ponsel pada radius aman maksimal 100 meter dari Kampus UNPAM Viktor 2.
2. Mempercepat siklus pengajuan dan persetujuan cuti karyawan dari 3–5 hari menjadi hitungan menit melalui formulir digital dan notifikasi putusan instan.
3. Mengotomatiskan proses rekapitulasi kehadiran dan pemantauan sisa hak cuti karyawan sehingga laporan dapat tersaji secara langsung bagi Admin HR dan pimpinan tanpa perlu salin manual ke Excel.

#### 1.4.2 Manfaat Proyek
* **Bagi Karyawan:** Memberikan kepastian validasi kehadiran yang adil dan transparan, proses pengajuan cuti yang praktis tanpa formulir kertas, serta notifikasi keputusan langsung di layar ponsel.
* **Bagi Admin HR:** Mengeliminasi beban kerja rekapitulasi lembar absensi di akhir bulan hingga 80%, memastikan keaslian lokasi presensi staf, serta mengelola arsip kepegawaian secara terpadu.
* **Bagi Organisasi:** Meningkatkan kedisiplinan kerja, meniadakan biaya pengadaan kertas formulir presensi, serta menyediakan data absensi yang sahih untuk dasar evaluasi kinerja.
* **Bagi Penulis:** Mengaplikasikan konsep mata kuliah Sistem Informasi Manajemen (SIM) dan tahapan *System Development Life Cycle* (SDLC) dalam merancang solusi perangkat lunak yang solutif.

### 1.5 Ruang Lingkup

#### 1.5.1 Batasan Sistem (*In-Scope*)
1. Modul autentikasi multi-peran (*Role-Based Access Control*) untuk Karyawan dan Admin HR.
2. Validasi presensi masuk berbasis koordinat GPS riil perangkat dengan batas radius 100 meter dari titik Kampus UNPAM Viktor 2 (Lat: -6.3458, Lng: 106.6917), dilengkapi akun uji coba (*test account*).
3. Pengajuan izin dan cuti mandiri oleh karyawan beserta pemotongan kuota cuti tahunan otomatis.
4. Persetujuan atau penolakan pengajuan cuti oleh Admin HR disertai notifikasi *floating banner* dan nada *audio chime*.
5. Manajemen data master karyawan (tambah karyawan, edit nama, jabatan, divisi, dan status aktif).
6. Dasbor pemantauan log presensi GPS dan laporan rekapitulasi kehadiran (*MIS/DSS*).

#### 1.5.2 Hal yang Tidak Termasuk (*Out-of-Scope*)
1. Modul perhitungan penggajian (*payroll*) dan integrasi transfer perbankan.
2. Integrasi mesin fisik biometrik sidik jari (*fingerprint hardware*).
3. Pengelolaan potongan pajak penghasilan (PPh 21) dan jaminan ketenagakerjaan.

### 1.6 Studi Kelayakan

Tabel 1.2 Hasil Penilaian Studi Kelayakan
| Aspek | Pertanyaan Panduan | Hasil Penilaian Kelayakan |
| :--- | :--- | :--- |
| **Teknis** | Apakah teknologi tersedia dan mampu diterapkan? | **Layak**. Sistem dirancang berbasis Web Mobile / PWA (Next.js 16, TypeScript, Tailwind CSS) yang dapat diakses melalui peramban ponsel pintar modern tanpa instalasi rumit, memanfaatkan Geolocation API bawaan perangkat. |
| **Ekonomi** | Apakah manfaat yang diperoleh sebanding dengan biaya? | **Layak**. Mengeliminasi biaya pengadaan mesin absensi fisik, menghemat kertas formulir, serta mengurangi waktu lembur admin HR dalam merekap absensi bulanan. |
| **Operasional** | Apakah pengguna mampu dan bersedia mengoperasikan sistem? | **Layak**. Tampilan antarmuka berorientasi mobile-first, intuitif, minimalis, dan mudah digunakan oleh staf lintas generasi dengan pelatihan singkat. |
| **Jadwal** | Apakah proyek dapat diselesaikan tepat waktu? | **Layak**. Pengembangan direncanakan berlangsung selama 5 pertemuan/minggu (P9 hingga P13) sesuai kalender akademik perkuliahan SIM. |

### 1.7 Jadwal Proyek

Tabel 1.3 Jadwal Pelaksanaan Proyek (SDLC)
| Tahap SDLC | P9 | P10 | P11 | P12 | P13 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Perencanaan (*Planning*) | [X] | | | | |
| Analisis Sistem (*Analysis*) | | [X] | | | |
| Desain Sistem (*Design*) | | | [X] | | |
| Rencana Implementasi & Pengujian | | | | [X] | |
| Penyusunan Laporan & Presentasi | | | | | [X] |

---

## BAB II  
## ANALISIS SISTEM

### 2.1 Metode Pengumpulan Data
1. **Observasi Langsung:** Mengamati proses pencatatan kehadiran manual karyawan saat jam masuk kerja (07.30–08.00 WIB) di kantor operasional UNPAM Viktor 2 pada tanggal 3–6 November 2026.
2. **Wawancara Terstruktur:** Dilakukan bersama Rina Wijaya (HR & Operations Manager) pada 5 November 2026 untuk mengidentifikasi titik lemah verifikasi absensi manual dan alur disposisi cuti.
3. **Studi Dokumen:** Memeriksa format buku kehadiran fisik, formulir permohonan cuti kertas, dan berkas rekapitulasi Excel divisi HR periode September–Oktober 2026.

### 2.2 Proses Bisnis yang Berjalan

#### 2.2.1 Deskripsi Alur Kerja Manual
1. **Presensi Masuk:** Karyawan tiba di kantor dan membubuhkan tanda tangan fisik pada buku presensi di meja resepsionis/ruang HR tanpa ada verifikasi lokasi fisik GPS.
2. **Pengajuan Izin/Cuti:** Karyawan mengisi formulir kertas permohonan izin/cuti atau mengirimkan pesan WhatsApp pribadi ke Admin HR.
3. **Persetujuan HR:** Admin HR memeriksa sisa hak cuti karyawan secara manual di buku catatan lalu meminta tanda tangan manajer, memakan waktu 3 hingga 5 hari.
4. **Rekapitulasi Bulanan:** Setiap akhir bulan, Admin HR memindahkan data tanda tangan fisik ke dalam lembar kerja Microsoft Excel, yang membutuhkan waktu 3 hingga 5 hari kerja dan rawan human error.

#### 2.2.2 Flowchart Sistem yang Berjalan

![Gambar 2.1 Flowchart Sistem Presensi dan Pengajuan Cuti yang Sedang Berjalan](/D:/TUGAS/SIM%20SMT5/docs/diagram_images/flowchart_berjalan.png)  
*Gambar 2.1 Flowchart Sistem Presensi dan Pengajuan Cuti yang Sedang Berjalan*

### 2.3 Identifikasi Masalah

Tabel 2.1 Matriks Identifikasi Masalah
| No | Masalah | Penyebab | Dampak |
| :---: | :--- | :--- | :--- |
| **1** | **Presensi tidak mencerminkan kehadiran fisik aktual (*titip absen*)** | Pencatatan tanda tangan manual tanpa validasi koordinat lokasi GPS karyawan | Terjadi manipulasi kehadiran, ketidakhadiran fisik di kantor tidak terdeteksi, dan kedisiplinan jam kerja menurun. |
| **2** | **Proses pengajuan dan persetujuan cuti lambat (3–5 hari kerja)** | Pengajuan memakai formulir kertas fisik dan pesan WhatsApp personal yang sering terselip | Karyawan tidak mendapat kepastian hak libur kerja tepat waktu dan mengganggu koordinasi jadwal kerja divisi. |
| **3** | **Rekapitulasi laporan kehadiran bulanan lambat dan rawan salah hitung** | Pemindahan data presensi dan sisa kuota cuti dari kertas ke Microsoft Excel dilakukan manual oleh HR | Waktu kerja staf HR tersita 3 hingga 5 hari kerja di setiap akhir bulan hanya untuk merekap lembar absensi. |

### 2.4 Pengguna dan Kebutuhan Informasi

Tabel 2.2 Kebutuhan Informasi Berdasarkan Tingkatan Manajemen (Materi P4)
| Pengguna / Peran | Tingkatan Manajemen | Informasi yang Dibutuhkan | Frekuensi |
| :--- | :--- | :--- | :--- |
| **Karyawan** | Operasional | Status presensi hari ini, jam masuk tercatat, sisa kuota cuti tahunan, status persetujuan izin/cuti | Real-time / Harian |
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
| **F-08** | Sistem dapat menyajikan monitoring log presensi GPS live dan mencetak laporan rekapitulasi kehadiran | Admin HR, Pimpinan |

### 2.6 Kebutuhan Non-Fungsional

Tabel 2.4 Daftar Kebutuhan Non-Fungsional (*Non-Functional Requirements*)
| Kode | Aspek | Kebutuhan Non-Fungsional |
| :---: | :--- | :--- |
| **NF-01** | Keamanan | Akses dibatasi menggunakan *Role-Based Access Control* (RBAC); sandi tersimpan aman; formulir disanitasi dari ancaman injeksi data. |
| **NF-02** | Kinerja & Kecepatan | Waktu respons deteksi koordinat GPS dan validasi jarak kurang dari 3 detik; pemuatan halaman aplikasi di ponsel di bawah 2 detik. |
| **NF-03** | Keandalan (*Reliability*) | Berjalan dalam arsitektur PWA (*Progressive Web App*) yang stabil, responsif pada berbagai ukuran layar ponsel, dan mendukung pelacakan koordinat berkesinambungan (*watchPosition*). |
| **NF-04** | Usabilitas (*Usability*) | Desain antarmuka minimalis, bersih, bebas elemen membingungkan (*anti-slop*), kontras warna memenuhi standar WCAG AA (rasio &ge; 4.5:1), dan tombol mudah dijangkau satu tangan. |

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
Sistem informasi usulan (**hadir.**) dirancang dengan arsitektur modern berbasis *Web Mobile / Progressive Web App* (PWA). Karyawan mengakses sistem melalui peramban ponsel pintar. Sistem secara otomatis meminta izin sensor lokasi GPS dan menghitung jarak menggunakan rumus matematika Haversine terhadap titik pusat Kampus UNPAM Viktor 2 (-6.3458, 106.6917).

Jika karyawan berada dalam batas radius aman 100 meter dan GPS aktif, presensi dapat dikonfirmasi dalam satu sentuhan. Untuk pengajuan cuti, karyawan mengisi data pada formulir digital, lalu notifikasi langsung masuk ke dasbor Admin HR untuk disetujui atau ditolak secara *real-time*. Hasil persetujuan akan langsung memicu notifikasi visual dan nada audio *chime* pada ponsel karyawan yang bersangkutan.

#### 3.1.2 Enam Komponen SIM Usulan

Tabel 3.1 Komponen SIM Usulan (Materi P2)
| Komponen SIM | Wujud pada Sistem Usulan |
| :--- | :--- |
| **Hardware** | Client: Smartphone Android/iOS milik karyawan dan 1 unit PC/Laptop Admin HR. Server: Server komputasi awan (*Cloud hosting* Vercel). |
| **Software** | Framework: Next.js 16 (React 19, TypeScript), Tailwind CSS, Lucide Icons, Geolocation API, Web Audio API, PWA Service Worker. |
| **Data** | Basis data relasional terstruktur: entitas profil karyawan, jadwal kerja, log presensi GPS, pengajuan cuti, dan log notifikasi. |
| **Prosedur** | SOP Presensi Masuk Berbasis Radius GPS UNPAM Viktor 2, SOP Pengajuan Cuti Mandiri Karyawan, dan SOP Validasi Keputusan Admin HR. |
| **Manusia (*People*)** | Karyawan PT Nusantara Digital (sebagai operator presensi/pemohon), Admin HR (pengelola & validator), dan Direktur (penerima laporan). |
| **Jaringan** | Koneksi internet seluler (4G/5G) pada ponsel pengguna, jaringan Wi-Fi kampus UNPAM Viktor 2, dan protokol komunikasi terenkripsi HTTPS (SSL/TLS). |

### 3.2 Desain Proses

#### 3.2.1 Flowchart Sistem Usulan - Presensi Berbasis GPS (*Geofencing*)

![Gambar 3.1 Flowchart Sistem Usulan - Presensi Berbasis GPS (Geofencing)](/D:/TUGAS/SIM%20SMT5/docs/diagram_images/flowchart_usulan_presensi.png)  
*Gambar 3.1 Flowchart Sistem Usulan - Presensi Berbasis GPS (Geofencing)*

Flowchart pada Gambar 3.1 menggambarkan alur kerja presensi mandiri karyawan menggunakan sistem hadir. berbasis validasi sensor lokasi GPS:
1. Karyawan membuka peramban ponsel pintar dan mengakses web mobile hadir. saat tiba di area Kampus UNPAM Viktor 2.
2. Sistem melalui Geolocation API mendeteksi koordinat lintang dan bujur posisi ponsel secara otomatis.
3. Jika sensor GPS ponsel dalam kondisi mati atau izin lokasi ditolak, sistem menampilkan peringatan dan mengunci tombol login/presensi.
4. Jika GPS aktif, sistem menghitung jarak fisik pengguna terhadap titik acuan Kampus UNPAM Viktor 2 (-6.3458, 106.6917).
5. Jika posisi karyawan berada di luar batas radius 100 meter, akses login dan tombol presensi dikunci (akses ditolak guna mencegah titip absen).
6. Jika posisi berada di dalam radius aman (jarak &le; 100 meter), tombol presensi terbuka dan karyawan dapat memasukkan kredensial login serta menekan tombol presensi masuk.
7. Sistem secara otomatis mencatat log presensi (NIP, jam masuk WIB, tanggal, koordinat, jarak meter, dan status tepat waktu) ke database.
8. Notifikasi presensi berhasil muncul di layar ponsel karyawan dan data kehadiran seketika tampil pada dasbor pemantauan Admin HR secara *real-time*.

#### 3.2.2 Flowchart Sistem Usulan - Pengajuan dan Persetujuan Cuti Digital

![Gambar 3.2 Flowchart Sistem Usulan - Pengajuan dan Persetujuan Cuti Digital](/D:/TUGAS/SIM%20SMT5/docs/diagram_images/flowchart_usulan_cuti.png)  
*Gambar 3.2 Flowchart Sistem Usulan - Pengajuan dan Persetujuan Cuti Digital*

Flowchart pada Gambar 3.2 menggambarkan alur pengajuan dan persetujuan izin/cuti karyawan secara *paperless*:
1. Karyawan memilih menu Pengajuan Cuti pada antarmuka aplikasi hadir. di ponsel pribadinya.
2. Karyawan mengisi formulir digital yang meliputi jenis cuti (Tahunan, Sakit, atau Alasan Penting), tanggal cuti, durasi hari, dan uraian alasan izin.
3. Karyawan menekan tombol Kirim Pengajuan, sistem menyimpan data pengajuan dengan status 'Menunggu' dan langsung memperbarui daftar pengajuan di portal Admin HR.
4. Admin HR membuka dasbor pengelola untuk memeriksa alasan pengajuan dan sisa kuota hak cuti tahunan pemohon.
5. Admin HR mengambil keputusan: jika disetujui, kuota cuti dipotong otomatis dan status berubah menjadi 'Disetujui'; jika ditolak, Admin HR mencantumkan catatan penolakan dan status berubah menjadi 'Ditolak'.
6. Sistem secara instan mengirimkan notifikasi putusan langsung ke layar ponsel karyawan pemohon saat itu juga.
7. Data keputusan cuti otomatis terekap ke dalam laporan kepegawaian bulanan tanpa perlu formulir kertas manual.

### 3.3 Desain Data

#### 3.3.1 Entity Relationship Diagram (ERD)

![Gambar 3.3 Entity Relationship Diagram (ERD) Sistem Informasi hadir.](/D:/TUGAS/SIM%20SMT5/docs/diagram_images/erd_diagram.png)  
*Gambar 3.3 Entity Relationship Diagram (ERD) Sistem Informasi hadir.*

#### 3.3.2 Kamus Data (*Data Dictionary*)

Tabel 3.2 Kamus Data Karyawan
| Nama Data | Tipe Data | Ukuran | Keterangan |
| :--- | :--- | :---: | :--- |
| **ID Karyawan (Kunci Utama)** | Teks | 10 karakter | Kode pengenal unik tiap karyawan |
| **NIP** | Teks | 20 karakter | Nomor Induk Pegawai unik |
| **Nama Lengkap** | Teks | 50 karakter | Nama lengkap karyawan |
| **Email Kantor** | Teks | 50 karakter | Alamat email dinas untuk login |
| **Kata Sandi** | Teks | 20 karakter | Kata sandi akses login aplikasi |
| **Jabatan** | Teks | 30 karakter | Jabatan posisi kerja (misal: HR / Staf) |
| **Divisi** | Teks | 30 karakter | Bagian unit kerja karyawan |
| **Status Kerja** | Teks | 15 karakter | Status keaktifan (Aktif / Nonaktif) |

Tabel 3.3 Kamus Data Log Presensi Kehadiran
| Nama Data | Tipe Data | Ukuran | Keterangan |
| :--- | :--- | :---: | :--- |
| **ID Presensi (Kunci Utama)** | Teks | 10 karakter | Nomor transaksi pencatatan absensi |
| **NIP Karyawan** | Teks | 20 karakter | Relasi ke identitas pegawai yang hadir |
| **Jam Masuk** | Waktu | 8 karakter | Waktu pencatatan kehadiran (WIB) |
| **Tanggal Hadir** | Tanggal | 10 karakter | Tanggal pelaksanaan presensi kerja |
| **Lokasi Kantor** | Teks | 30 karakter | Nama lokasi acuan (UNPAM Viktor 2) |
| **Jarak GPS** | Angka | 5 digit | Jarak posisi HP ke kampus (dalam meter) |
| **Status Kehadiran** | Teks | 20 karakter | Keterangan Tepat Waktu atau Terlambat |

Tabel 3.4 Kamus Data Pengajuan Cuti
| Nama Data | Tipe Data | Ukuran | Keterangan |
| :--- | :--- | :---: | :--- |
| **ID Cuti (Kunci Utama)** | Teks | 10 karakter | Nomor pengenal unik pengajuan cuti |
| **NIP Karyawan** | Teks | 20 karakter | Relasi identitas pegawai pemohon cuti |
| **Jenis Cuti** | Teks | 30 karakter | Kategori cuti (Tahunan, Sakit, Alasan Penting) |
| **Tanggal Cuti** | Tanggal | 10 karakter | Tanggal waktu dimulainya cuti |
| **Lama Cuti** | Teks | 15 karakter | Durasi hari cuti (misal: 1 Hari) |
| **Alasan Izin** | Teks | Bebas | Uraian keperluan atau alasan izin cuti |
| **Status Persetujuan** | Teks | 15 karakter | Hasil putusan HR (Menunggu, Disetujui, Ditolak) |

Tabel 3.5 Kamus Data Lokasi Kantor Acuan
| Nama Data | Tipe Data | Ukuran | Keterangan |
| :--- | :--- | :---: | :--- |
| **ID Lokasi (Kunci Utama)** | Teks | 10 karakter | Kode pengenal titik lokasi kantor |
| **Nama Kantor** | Teks | 30 karakter | Nama tempat acuan (UNPAM Viktor 2) |
| **Titik Koordinat GPS** | Koordinat | 20 karakter | Posisi lintang dan bujur UNPAM Viktor 2 |
| **Radius Maksimal** | Angka | 4 digit | Batas jarak toleransi presensi (100 meter) |

### 3.4 Desain Output (Laporan)

Tabel 3.6 Rancangan Output Laporan Sistem
| Nama Laporan | Pengguna | Isi / Kolom Laporan | Periode |
| :--- | :--- | :--- | :---: |
| **Laporan Rekapitulasi Presensi Harian** | Admin HR, Team Lead | Tanggal, NIP, Nama Karyawan, Divisi, Jam Masuk, Jarak GPS (Meter), Koordinat Satelit, Status (Sah/Di Luar Area/Terlambat) | Harian |
| **Laporan Pengajuan dan Rekap Cuti Staf** | HR Manager, Direktur | Nomor Registrasi, Nama Pegawai, Divisi, Jenis Cuti, Tanggal Pelaksanaan, Sisa Kuota, Status Keputusan HR, Catatan Putusan | Bulanan |
| **Laporan Analitik Kedisiplinan Kerja (MIS/DSS)** | Direktur Utama, HR Manager | Nama Divisi, Jumlah Personel, Tingkat Kehadiran (%), Rata-rata Keterlambatan (Menit), Rasio Cuti Tahunan | Bulanan / Kuartalan |

### 3.5 Desain Antarmuka (Mockup)

#### 1. Layar Login & Verifikasi GPS
![Gambar 3.4 Mockup Layar Login](/D:/TUGAS/SIM%20SMT5/prototype_design/01%20-%20Masuk.png)  
*Gambar 3.4 Mockup Layar Login*  
* **Fungsi layar:** Menyediakan gerbang masuk terpadu dengan input email/NIP, kata sandi, pemilihan segmen peran (Karyawan atau Admin), serta verifikasi koordinat GPS ponsel secara otomatis. Memenuhi kebutuhan: F-01, NF-01.

#### 2. Layar Dashboard Sesuai Peran
![Gambar 3.5 Mockup Layar Dashboard sesuai peran](/D:/TUGAS/SIM%20SMT5/prototype_design/02%20-%20Beranda.png)  
*Gambar 3.5 Mockup Layar Dashboard sesuai peran*  
* **Fungsi layar:** Menampilkan identitas profil staf aktif, kartu status presensi hari ini, indikator radius UNPAM Viktor 2, sisa jatah kuota cuti tahunan, serta akses cepat ke menu presensi dan pengajuan cuti. Memenuhi kebutuhan: F-03, F-04, OAS.

#### 3. Layar Presensi Masuk Berbasis GPS (TPS)
![Gambar 3.6 Mockup Layar Form input transaksi (TPS)](/D:/TUGAS/SIM%20SMT5/prototype_design/03%20-%20Presensi%20GPS.png)  
*Gambar 3.6 Mockup Layar Form input transaksi (TPS)*  
* **Fungsi layar:** Memetakan lokasi fisik pengguna terhadap titik pusat UNPAM Viktor 2 secara grafis, menampilkan indikator jarak riil meter, dan tombol eksekusi kehadiran yang hanya aktif bila GPS berada dalam radius &le; 100 meter. Memenuhi kebutuhan: F-02, F-03, TPS.

#### 4. Layar Riwayat dan Pencarian Kehadiran
![Gambar 3.7 Mockup Layar Daftar / pencarian data](/D:/TUGAS/SIM%20SMT5/prototype_design/07%20-%20Riwayat%20kehadiran.png)  
*Gambar 3.7 Mockup Layar Daftar / pencarian data*  
* **Fungsi layar:** Menyajikan daftar riwayat kehadiran karyawan secara berurutan berdasarkan tanggal, jam masuk, jam pulang, dan status kedatangan (tepat waktu, terlambat, atau cuti) beserta pencarian riwayat presensi. Memenuhi kebutuhan: F-03, F-08, MIS.

#### 5. Layar Formulir dan Persetujuan Cuti (MIS)
![Gambar 3.8 Mockup Layar Laporan untuk manajer (MIS)](/D:/TUGAS/SIM%20SMT5/prototype_design/08%20-%20Pengajuan%20cuti.png)  
*Gambar 3.8 Mockup Layar Laporan untuk manajer (MIS)*  
* **Fungsi layar:** Panel formulir dan verifikasi pengajuan cuti kerja karyawan bagi Admin HR/Manajer untuk memeriksa alasan staf, jenis cuti, serta mengeksekusi persetujuan atau penolakan cuti secara real-time. Memenuhi kebutuhan: F-04, F-05, F-06, MIS.

#### 6. Layar Dasbor Admin HR & Log Kehadiran (ESS/DSS)
![Gambar 3.9 Mockup Layar Dashboard pimpinan (ESS/DSS)](/D:/TUGAS/SIM%20SMT5/prototype_design/05%20-%20Presensi%20berhasil.png)  
*Gambar 3.9 Mockup Layar Dashboard pimpinan (ESS/DSS)*  
* **Fungsi layar:** Menyajikan dasbor konfirmasi dan ringkasan eksekutif pemantauan kepatuhan lokasi presensi GPS karyawan, catatan jam kerja, serta validitas kehadiran secara terpadu. Memenuhi kebutuhan: F-07, F-08, DSS/ESS.
