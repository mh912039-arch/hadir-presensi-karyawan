import { MobileAppProvider } from "@/context/MobileAppContext";

export default function KaryawanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileAppProvider>
      <div className="min-h-screen bg-[#0E1318] text-slate-100">
        {children}
      </div>
    </MobileAppProvider>
  );
}
