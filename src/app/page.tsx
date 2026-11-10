import { MobileAppProvider } from "@/context/MobileAppContext";
import { HadirMobileApp } from "@/components/mobile/HadirMobileApp";

export default function HomePage() {
  return (
    <MobileAppProvider>
      <div className="min-h-screen bg-[#F1F5F9] sm:py-6 flex items-center justify-center">
        <main className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-[#F8FAF9] sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-slate-200/80 overflow-hidden flex flex-col">
          <HadirMobileApp />
        </main>
      </div>
    </MobileAppProvider>
  );
}
