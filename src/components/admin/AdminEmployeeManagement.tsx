"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  X,
  Check,
  Shield,
  KeyRound,
} from "lucide-react";
import { useMobileApp } from "@/context/MobileAppContext";
import { EmployeeItem } from "@/types/mobile";

export function AdminEmployeeManagement() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    activeUserId,
    setActiveEmployee,
    switchRole,
  } = useMobileApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeItem | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Password visibility map by employee ID
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    position: "",
    division: "Teknologi",
    email: "",
    password: "",
    status: "Aktif" as "Aktif" | "Nonaktif",
  });

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      nip: String(Math.floor(20240000 + Math.random() * 9999)),
      position: "",
      division: "Teknologi",
      email: "",
      password: "password123",
      status: "Aktif",
    });
    setShowModal(true);
  };

  const openEditModal = (emp: EmployeeItem) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      nip: emp.nip,
      position: emp.position,
      division: emp.division,
      email: emp.email,
      password: emp.password,
      status: emp.status,
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData);
      setSavedNotice(`Data "${formData.name}" berhasil diperbarui! Tampilan aplikasi otomatis diperbarui.`);
    } else {
      addEmployee({
        ...formData,
        joinDate: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });
      setSavedNotice(`Karyawan "${formData.name}" berhasil ditambahkan.`);
    }
    setShowModal(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const q = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(q) ||
      emp.nip.toLowerCase().includes(q) ||
      emp.position.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Success Notification Alert */}
      {savedNotice && (
        <div className="p-3 bg-[#E8F6ED] border border-[#D5EEDC] rounded-2xl flex items-center justify-between text-xs text-[#0D7A57] animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#0D7A57] shrink-0" />
            <span className="font-semibold">{savedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => switchRole("karyawan")}
            className="px-2.5 py-1 bg-[#0D7A57] text-white rounded-lg text-[11px] font-bold shadow-2xs hover:bg-[#0A6447] active:scale-95 shrink-0 ml-2"
          >
            Lihat Tampilan
          </button>
        </div>
      )}
      {/* Top Header Actions */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Karyawan ({employees.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Kelola akun, NIP, jabatan, email & kata sandi.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="h-9 px-3.5 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama, NIP, jabatan, atau email..."
          className="w-full h-10 pl-9 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0D7A57] transition-all shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Employee Cards List */}
      <div className="space-y-3">
        {filteredEmployees.map((emp) => {
          const isPassVisible = !!visiblePasswords[emp.id];

          return (
            <div
              key={emp.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3 transition-all"
            >
              {/* Header: Name, Position & Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0C2B22] text-[#D5F2C8] flex items-center justify-center font-bold text-xs shrink-0">
                    {emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {emp.name}
                    </h4>
                    <p className="text-[11px] text-[#0D7A57] font-semibold mt-0.5">
                      {emp.position} • {emp.division}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg shrink-0 ${
                    emp.status === "Aktif"
                      ? "bg-[#E8F6ED] text-[#0D7A57] border border-[#D5EEDC]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {emp.status}
                </span>
              </div>

              {/* Credential & Work Details */}
              <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs">
                {/* NIP */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">NIP:</span>
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    {emp.nip}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Email Perusahaan:</span>
                  <span className="font-medium text-slate-800 text-xs">
                    {emp.email}
                  </span>
                </div>

                {/* Password with Eye Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Kata Sandi:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-800">
                      {isPassVisible ? emp.password : "••••••••••••"}
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(emp.id)}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                      title={isPassVisible ? "Sembunyikan sandi" : "Lihat sandi"}
                    >
                      {isPassVisible ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Status Active, Edit & Delete */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div>
                  {emp.id === activeUserId ? (
                    <span className="px-2.5 py-1 rounded-lg bg-[#E8F6ED] text-[#0D7A57] text-[11px] font-bold flex items-center gap-1 border border-[#D5EEDC]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Akun Aktif</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveEmployee(emp.id, true)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#E8F6ED] text-slate-700 hover:text-[#0D7A57] text-[11px] font-semibold transition-all cursor-pointer"
                      title="Gunakan akun karyawan ini dan buka tampilannya"
                    >
                      Pilih &amp; Lihat
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(emp)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-slate-500" />
                    <span>Ubah</span>
                  </button>

                  {emp.nip !== "20240018" && (
                    <button
                      type="button"
                      onClick={() => deleteEmployee(emp.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form Tambah / Edit Karyawan */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingEmployee ? "Ubah Data Karyawan" : "Tambah Karyawan Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">NIP</label>
                  <input
                    type="text"
                    required
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Aktif" | "Nonaktif",
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Jabatan</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Contoh: Frontend Developer"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Divisi</label>
                <input
                  type="text"
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  placeholder="Contoh: Teknologi / Operasional"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Perusahaan</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@nusantara.co.id"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Kata Sandi Akun</label>
                <input
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:border-[#0D7A57]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 h-10 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 h-10 rounded-xl bg-[#0D7A57] hover:bg-[#0A6447] text-white font-bold shadow-xs"
                >
                  {editingEmployee ? "Simpan Perubahan" : "Simpan Karyawan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
