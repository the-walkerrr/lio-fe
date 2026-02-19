"use client";

import { create } from "zustand";

export const useDesktopNavStore = create((set) => ({
  isDesktopNavOpen: true,
  toggleDesktopNav: () =>
    set((state) => ({ isDesktopNavOpen: !state.isDesktopNavOpen })),
}));
