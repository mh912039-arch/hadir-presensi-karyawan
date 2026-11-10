import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/mobile/PwaRegister";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hadir. — HR & Presensi",
  description: "Informasi kerja dan presensi Anda dalam satu genggaman.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
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
      <body className={`${inter.className} min-h-screen bg-[#F1F5F9] text-slate-900 antialiased selection:bg-[#0D7A57] selection:text-white`}>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
