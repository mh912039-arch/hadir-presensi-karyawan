import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/mobile/PwaRegister";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hadir. — HR & Presensi Karyawan",
  description: "Sistem Informasi Kepegawaian & Presensi Karyawan PT Nusantara Digital",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "hadir.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C2B22",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-[#0E1318] antialiased selection:bg-[#0D7A57] selection:text-white`}>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
