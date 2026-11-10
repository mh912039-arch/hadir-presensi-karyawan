import { AdminHrPerusahaanSidebar } from "@/components/admin-hr-perusahaan/Sidebar";

export default function AdminHrPerusahaanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <AdminHrPerusahaanSidebar />
      <main className="flex-1 ml-64 p-6 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
