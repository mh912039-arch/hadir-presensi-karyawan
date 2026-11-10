import { MobileAppProvider } from "@/context/MobileAppContext";
import { HadirMobileApp } from "@/components/mobile/HadirMobileApp";

export default function HomePage() {
  return (
    <MobileAppProvider>
      <div className="min-h-[100dvh] w-full bg-[#F8FAF9] flex justify-center">
        <main className="w-full max-w-md min-h-[100dvh] flex flex-col bg-[#F8FAF9]">
          <HadirMobileApp />
        </main>
      </div>
    </MobileAppProvider>
  );
}
