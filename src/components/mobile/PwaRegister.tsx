"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    // Register Service Worker for Chrome PWA Installation
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("ServiceWorker registration failed:", err);
      });
    }
  }, []);

  return null;
}
