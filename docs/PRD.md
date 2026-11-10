# Sistem Informasi Kepegawaian & Presensi Karyawan
*Product Requirements Document (Modern PRD Framework for AI Prototyping)*
*Arketipe Produk: Enterprise Operations Tool | Target Audiens: Admin HR Perusahaan*

---

## 1. OPPORTUNITY FRAMING
- **Core Problem:** Admin HR menghadapi kendala operasional dalam memvalidasi kehadiran karyawan yang bekerja secara mobile atau di kantor cabang akibat pencatatan manual yang rentan manipulasi titik koordinat GPS. Proses absensi konvensional menyebabkan tingginya discrepancy data kehadiran saat direkonsiliasi dengan jadwal kerja Fixed Shift, yang berimbas pada ketidakakuratan perhitungan gaji bulanan. Tanpa penerapan sistem Geo-fencing yang ketat dan mekanisme Local Queue untuk mengatasi kendala jaringan internet di area operasional, integritas data kepegawaian akan terus terancam dan memicu kerugian finansial perusahaan.
- **Working Hypothesis:** Jika sistem presensi mengintegrasikan validasi Geo-fencing berbasis GPS otomatis dengan penegakan aturan Fixed Shift dan dukungan Local Queue offline, maka Admin HR dapat mengeliminasi manipulasi data absensi dan mengurangi waktu rekapitulasi manual sebesar 70persen.
- **Strategy Fit:** Inisiatif ini selaras dengan strategi transformasi digital divisi HR untuk memperkuat keamanan data kepegawaian, memastikan kepatuhan terhadap kebijakan perusahaan, dan membangun infrastruktur pencatatan presensi yang akurat dan transparan.

---

## 2. BOUNDARIES & SCOPE
### Deep Feature Architecture (MVP Breakdown)
#### Fitur #1: [P0] Autentikasi Multi-Role
- **User Story:** Sebagai Admin HR, saya ingin melakukan login menggunakan kredensial terenkripsi agar dapat mengakses panel manajemen sistem kepegawaian dengan hak akses yang valid.
- **Alur Kerja (Happy Path):**
  1. Pengguna membuka halaman login dan memasukkan email serta kata sandi.
  2. Sistem mengirimkan permintaan verifikasi kredensial ke Supabase Auth.
  3. Supabase Auth memvalidasi hash password dan mengembalikan token JWT.
  4. Sistem membaca klaim peran pengguna dari token JWT.
  5. Sistem mengarahkan pengguna ke dasbor sesuai peran aktif secara otomatis.
- **Aturan Bisnis & Validasi:**
  - Kata sandi wajib memiliki panjang minimal 8 karakter dengan kombinasi huruf dan angka.
  - Sesi login otomatis kedaluwarsa setelah 8 jam tidak ada aktivitas.
  - Akun terkunci sementara selama 15 menit setelah 5 kali percobaan login gagal.
  - Token JWT wajib disertakan dalam setiap header permintaan API terproteksi.
- **Edge Cases & Solusi Gagal:**
  - Koneksi internet terputus saat proses autentikasi mengirimkan data kredensial.
  - Token JWT kedaluwarsa di tengah sesi penggunaan aktif.
  - Pengguna mencoba mengakses halaman tanpa hak peran yang sesuai.
- **Komponen Teknis Terkait:**
  - Frontend: LoginForm.tsx, AuthProvider.tsx
  - API Endpoints: POST /api/auth/v1/token
  - Tabel Database: auth.users, public.user_profiles
- **Prompt Coding Agent (Cursor / Claude Code):**
```text
Implementasikan modul autentikasi menggunakan Supabase Auth dengan validasi token JWT dan manajemen role-based access control pada Next.js Route Handlers.
```

#### Fitur #2: [P0] Manajemen Jam Kerja Fixed Shift
- **User Story:** Sebagai Admin HR, saya ingin membuat dan menetapkan jadwal Fixed Shift harian agar jam masuk dan jam pulang baku karyawan tercatat secara konsisten di sistem.
- **Alur Kerja (Happy Path):**
  1. Admin HR mengakses menu pengaturan shift dan mengklik tombol tambah shift.
  2. Admin HR mengisi formulir nama shift, jam masuk baku, dan jam pulang baku.
  3. Sistem memvalidasi format waktu dan kelengkapan parameter formulir.
  4. Admin HR menekan tombol simpan untuk mengirim data ke server.
  5. Sistem menyimpan data ke basis data dan menampilkan notifikasi sukses.
- **Aturan Bisnis & Validasi:**
  - Jam masuk baku wajib mendahului jam pulang baku dengan selisih minimal 4 jam.
  - Nama shift bersifat unik dan tidak boleh ada duplikasi dalam satu perusahaan.
  - Penetapan shift wajib mencakup hari kerja aktif dalam sepekan.
  - Penghapusan shift ditolak jika masih ada karyawan aktif yang terikat pada shift tersebut.
- **Edge Cases & Solusi Gagal:**
  - Admin memasukkan format waktu invalid pada formulir shift.
  - Kegagalan penyimpanan data ke basis data akibat gangguan koneksi server.
  - Percobaan duplikasi nama shift yang sudah ada dalam basis data.
- **Komponen Teknis Terkait:**
  - Frontend: ShiftManagementTable.tsx, ShiftFormModal.tsx
  - API Endpoints: POST /api/shifts, GET /api/shifts
  - Tabel Database: public.fixed_shifts, public.employee_shifts
- **Prompt Coding Agent (Cursor / Claude Code):**
```text
Buat komponen antarmuka manajemen Fixed Shift dengan validasi form waktu baku dan integrasi server actions untuk penyimpanan data ke tabel fixed_shifts.
```

#### Fitur #3: [P0] Presensi GPS dan Geo-fencing
- **User Story:** Sebagai Karyawan, saya ingin melakukan pencatatan presensi harian dengan verifikasi koordinat GPS agar kehadiran saya sah tercatat dalam radius kantor yang ditentukan.
- **Alur Kerja (Happy Path):**
  1. Karyawan membuka menu presensi di peramban seluler.
  2. Sistem meminta izin akses sensor lokasi GPS perangkat pengguna.
  3. Perangkat mengembalikan titik koordinat lintang dan bujur terkini.
  4. Sistem menghitung jarak Haversine antara koordinat pengguna dan koordinat titik kantor.
  5. Sistem memverifikasi apakah jarak berada dalam radius maksimum Geo-fencing.
  6. Sistem mencatat transaksi presensi ke basis data dan menampilkan status sukses.
- **Aturan Bisnis & Validasi:**
  - Radius maksimum Geo-fencing ditetapkan sejauh 100 meter dari titik pusat koordinat kantor.
  - Pengguna wajib mengaktifkan akurasi GPS tinggi pada perangkat seluler.
  - Percobaan presensi ditolak jika terdeteksi menggunakan aplikasi tiruan lokasi palsu.
  - Setiap karyawan hanya dapat melakukan satu kali pencatatan presensi masuk per hari.
- **Edge Cases & Solusi Gagal:**
  - Sensor GPS perangkat menolak memberikan izin akses lokasi kepada peramban.
  - Posisi koordinat aktual berada di luar radius 100 meter kantor.
  - Sinyal GPS tidak akurat akibat gangguan cuaca atau berada di dalam gedung bertingkat.
- **Komponen Teknis Terkait:**
  - Frontend: AttendanceCaptureButton.tsx, LocationMapWidget.tsx
  - API Endpoints: POST /api/attendance/clock-in
  - Tabel Database: public.attendance_logs, public.office_locations
- **Prompt Coding Agent (Cursor / Claude Code):**
```text
Kembangkan modul presensi GPS dengan perhitungan Haversine formula di sisi klien dan validasi radius Geo-fencing pada Next.js API route.
```

#### Fitur #4: [P1] Local Queue dan Sinkronisasi Offline
- **User Story:** As a Karyawan, saya ingin data presensi tetap tersimpan secara lokal di perangkat saat koneksi internet terputus agar data kehadiran tidak hilang dan dapat disinkronkan kemudian.
- **Alur Kerja (Happy Path):**
  1. Karyawan melakukan klik tombol presensi saat koneksi internet terputus total.
  2. Sistem mendeteksi status offline melalui event listener jaringan peramban.
  3. Sistem mengenkripsi dan menyimpan data transaksi presensi ke dalam Local Queue di penyimpanan lokal peramban.
  4. Sistem menampilkan indikator visual status antrean offline kepada pengguna.
  5. Sistem mendeteksi pemulihan koneksi internet dan memicu skrip sinkronisasi otomatis.
  6. Sistem mengirimkan seluruh data dalam antrean ke server pusat dan menghapusnya dari penyimpanan lokal setelah sukses.
- **Aturan Bisnis & Validasi:**
  - Kapasitas maksimum Local Queue dibatasi hingga 50 transaksi tertunda per perangkat.
  - Data dalam antrean lokal wajib dienkripsi menggunakan kunci turunan sesi.
  - Sinkronisasi otomatis berjalan berulang setiap 5 menit atau saat koneksi stabil kembali.
  - Transaksi presensi offline yang melampaui batas waktu 7 hari kedaluwarsa dan ditolak sistem.
- **Edge Cases & Solusi Gagal:**
  - Penyimpanan lokal peramban penuh saat hendak menyimpan antrean presensi baru.
  - Perangkat dimatikan paksa saat proses sinkronisasi antrean sedang berlangsung.
  - Konflik data karena karyawan melakukan presensi ganda secara manual saat offline dan online.
- **Komponen Teknis Terkait:**
  - Frontend: OfflineIndicator.tsx, SyncManagerProvider.tsx
  - API Endpoints: POST /api/attendance/sync-batch
  - Tabel Database: public.attendance_logs, public.sync_audit_trail
- **Prompt Coding Agent (Cursor / Claude Code):**
```text
Implementasikan sistem Local Queue menggunakan IndexedDB untuk menyimpan transaksi presensi offline dan mekanisme batch sync ke API Supabase saat online.
```

### Non-Goals (Explicitly Out of Scope)
- Integrasi otomatis dengan software payroll pihak ketiga eksternal.
- Pembuatan dasbor analitik lanjutan dan laporan kepegawaian lintas departemen.
- Pencatatan presensi menggunakan pemindai sidik jari fisik atau perangkat biometrik eksternal.
- Fitur pengajuan cuti dan izin ketidakhadiran karyawan.
- [Di Luar Cakupan / Tahap Berikutnya] Dukungan untuk perangkat telepon pintar dengan sistem operasi di bawah versi minimum peramban modern untuk menghemat biaya pemeliharaan.
- [Di Luar Cakupan / Tahap Berikutnya] Integrasi dengan perangkat keras absensi berbasis biometrik sidik jari karena keterbatasan anggaran perangkat keras pada fase MVP.

---

## 3. SUCCESS MEASUREMENT
- **Offline Golden Set (Validation):** Pengujian kumpulan data simulasi 1000 percobaan presensi pada perangkat seluler dengan kondisi jaringan terputus total selama 48 jam dan pemulihan mutasi basis data pasca sinkronisasi.
- **Human Review (Qualitative Audit):** Audit bulanan acak terhadap 5 persen log transaksi presensi oleh Tim Compliance untuk memvalidasi akurasi radius Geo-fencing dan kepatuhan Fixed Shift.
- **Online Metrics (KPIs & Thresholds):** Monitoring real-time tingkat error rate pada Supabase Route Handlers dan latensi respons server menggunakan Application Performance Monitoring. | SLO Teknis: Latensi p95 untuk endpoint verifikasi koordinat GPS dan Geo-fencing di bawah 300 milidetik.; Tingkat keberhasilan sinkronisasi Local Queue saat koneksi pulih minimal 99.5persen.; Zero data loss pada mutasi basis data PostgreSQL selama transaksi konkuren tinggi.

---

## 4. ROLLOUT PLAN
- **Exposure:** Fase 1: Uji coba Alpha terbatas pada target persona (Admin HR Perusahaan). Fase 2: Peluncuran Beta publik 100%.
- **Duration:** 14 hari masa evaluasi metrik adopsi dan stabilitas error rate pasca rilis.
- **Segments & Ramp Gates:** Zero critical error di Sentry/log, tingkat keberhasilan alur utama > 99%, dan latensi p95 sesuai SLO.

---

## 5. RISK MANAGEMENT
- **Detection Mechanism:** Pemantauan otomatis menggunakan sistem logging terpusat untuk mendeteksi lonjakan kegagalan autentikasi, anomali koordinat GPS yang mencurigakan, dan error rate pada endpoint sinkronisasi.
- **Fallback & Kill Switch:** Fitur darurat untuk menonaktifkan validasi Geo-fencing secara terpusat oleh Super Admin apabila terjadi gangguan layanan pemetaan pihak ketiga atau anomali massal pada sensor GPS perangkat.. Mitigasi Layanan: Penyediaan mekanisme fallback penyimpanan lokal (Local Queue) pada perangkat pengguna jika layanan server pusat atau koneksi internet mengalami kegagalan total.. Kebijakan Retensi: Retensi data log transaksi presensi disimpan selama 5 tahun untuk keperluan audit, sementara file lampiran sementara dihapus otomatis setelah 30 hari.

---

## 6. OWNERSHIP & ACTION
- **Primary Owner (PIC):** Lead Product Architect & PIC Operasional (Human Resources & Payroll)
- **Decision Points & Cadence:** Evaluasi mingguan untuk menentukan kelayakan transisi dari Fase 1 (MVP) menuju Fase 2 (Pasca-MVP).

---

## 7. AI-SPECIFIC ADDITIONS
### Behavior Contract
#### [GOOD] Wajib Dilakukan:
- [GOOD] Arsitektur frontend: Next.js 16 + Tailwind CSS dengan Server Components default
- [GOOD] Validasi ketat skema payload request menggunakan Zod di setiap endpoint API
- [GOOD] Proteksi Row Level Security (RLS) aktif pada seluruh tabel di Supabase (PostgreSQL)
- [GOOD] TypeScript Strict Mode tanpa kompromi tipe data 'any'

#### [REJECT] Dilarang Keras:
- [REJECT] Dilarang menggunakan inline styling di luar Tailwind CSS
- [REJECT] Dilarang menyimpan secret atau API key di sisi client component
- [REJECT] Dilarang melakukan mutasi database langsung dari client tanpa melewati server action / API route
- [REJECT] ZERO EMOJI POLICY: Dilarang menyelipkan emoji apa pun pada UI komponen, tombol, atau teks sistem

### Guardrails
- Proteksi SQL Injection dan Sanitasi XSS pada seluruh form input pengguna
- Mekanisme rate limiting dan pembatasan kuota pada endpoint API Sistem Informasi Kepegawaian & Presensi Karyawan
- Audit trail terenkripsi untuk seluruh mutasi data sensitif dan transaksi pengguna
- Penyimpanan berkas media/dokumen aman via Supabase Storage dengan signed URL sementara

---

## 8. ACTIONABLE TASK BREAKDOWN (FOR AI CODING AGENTS)
- [ ] Step 1: [Fase 1 (MVP)] Inisialisasi proyek Next.js 16 dengan konfigurasi Tailwind CSS dan struktur folder modular.
- [ ] Step 2: [Fase 1 (MVP)] Konfigurasi koneksi Supabase Auth dan implementasi middleware autentikasi multi-role.
- [ ] Step 3: [Fase 1 (MVP)] Pembuatan skema tabel migrasi SQL DDL untuk public.user_profiles dan public.fixed_shifts.
- [ ] Step 4: [Fase 1 (MVP)] Pembuatan skema tabel migrasi SQL DDL untuk public.employee_shifts, public.office_locations, dan public.attendance_logs.
- [ ] Step 5: [Fase 1 (MVP)] Implementasi Server Actions untuk manajemen fixed shift dan penetapan jadwal karyawan.
- [ ] Step 6: [Fase 1 (MVP)] Implementasi endpoint pencatatan presensi GPS dan validasi geo-fencing berbasis jarak.
- [ ] Step 7: [Fase 1 (MVP)] Pengaturan Row Level Security (RLS) dan kebijakan akses tabel PostgreSQL.
- [ ] Step 8: [Fase 2 (Pasca-MVP)] Pengembangan antarmuka lokal IndexedDB untuk penyimpanan antrean presensi offline.
- [ ] Step 9: [Fase 2 (Pasca-MVP)] Pembuatan tabel migrasi SQL DDL untuk public.sync_audit_trail.
- [ ] Step 10: [Fase 2 (Pasca-MVP)] Implementasi mekanisme sinkronisasi batch otomatis saat perangkat kembali terhubung ke internet.
- [ ] Step 11: [Fase 2 (Pasca-MVP)] Pengujian end-to-end integrasi presensi online dan offline menggunakan skenario jaringan terputus.
