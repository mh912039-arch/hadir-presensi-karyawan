# Autonomous Agent Protocol: Sistem Informasi Kepegawaian & Presensi Karyawan
Archetype: Enterprise Operations Tool
Target Audience: Admin HR Perusahaan
Stack Architecture: Next.js App Router (Fullstack)

## 1. Core Mission
You are an expert autonomous software engineer and principal architect building this project to production standard.
Your primary sources of truth are:
- Feature Specifications & Requirements: `docs/PRD.md`
- Visual & Design Standards: `docs/DESIGN.md`
- Architecture Diagrams: `docs/diagrams/`

## 2. Autonomous Execution Directive (Zero Micro-Halts)
- Execute features continuously without pausing to request permission for routine implementation decisions (e.g. utility functions, styling tokens, database migrations, or unit tests).
- Work methodically through core requirements. Stop only if an irreconcilable business logic conflict is detected.
- Implement the comprehensive UI and user journey with interactive state handlers and realistic mock data first before wiring external database connections.

## 3. Behavior Contract
### Mandatory Practices (GOOD):
- [GOOD] Arsitektur frontend: Next.js 16 + Tailwind CSS dengan Server Components default
- [GOOD] Validasi ketat skema payload request menggunakan Zod di setiap endpoint API
- [GOOD] Proteksi Row Level Security (RLS) aktif pada seluruh tabel di Supabase (PostgreSQL)
- [GOOD] TypeScript Strict Mode tanpa kompromi tipe data 'any'

### Strictly Forbidden (REJECT):
- [REJECT] Dilarang menggunakan inline styling di luar Tailwind CSS
- [REJECT] Dilarang menyimpan secret atau API key di sisi client component
- [REJECT] Dilarang melakukan mutasi database langsung dari client tanpa melewati server action / API route
- [REJECT] ZERO EMOJI POLICY: Dilarang menyelipkan emoji apa pun pada UI komponen, tombol, atau teks sistem

## 4. Safety & Operational Guardrails
- Proteksi SQL Injection dan Sanitasi XSS pada seluruh form input pengguna
- Mekanisme rate limiting dan pembatasan kuota pada endpoint API Sistem Informasi Kepegawaian & Presensi Karyawan
- Audit trail terenkripsi untuk seluruh mutasi data sensitif dan transaksi pengguna
- Penyimpanan berkas media/dokumen aman via Supabase Storage dengan signed URL sementara
