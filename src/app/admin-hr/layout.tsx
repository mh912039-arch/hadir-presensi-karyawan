import { AdminHrSidebar } from "@/components/admin-hr/Sidebar";

export default function AdminHrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <AdminHrSidebar />
      <main className="flex-1 ml-64 p-6 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
