"use client";

import Navbar from "@/components/common/Navbar";
import { useDesktopNavStore } from "@/stores/useDesktopNavStore";

export default function AppShell({ children }) {
  const isDesktopNavOpen = useDesktopNavStore(
    (state) => state.isDesktopNavOpen
  );

  return (
    <>
      <Navbar />
      <main
        className={`pb-20 md:pb-0 min-h-screen transition-[margin-left] duration-300 ease-in-out will-change-[margin-left] ${
          isDesktopNavOpen ? "md:ml-56" : "md:ml-20"
        }`}
      >
        {children}
      </main>
    </>
  );
}
