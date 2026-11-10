import { MobileAppProvider } from "@/context/MobileAppContext";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";

export default function HomePage() {
  return (
    <MobileAppProvider>
      <DeviceFrame />
    </MobileAppProvider>
  );
}
