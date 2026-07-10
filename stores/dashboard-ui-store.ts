import { create } from "zustand";
import { SideBarItem } from "@/types/dashboard";

interface DashboardUIStore {
  activeSidebarItem: SideBarItem;
  setActiveSidebarItem: (item: SideBarItem) => void;

  isComposeOpen: boolean;
  openCompose: () => void;
  closeCompose: () => void;
}

export const useDashboardUIStore = create<DashboardUIStore>((set) => ({
  activeSidebarItem: "Inbox",

  isComposeOpen: false,

  setActiveSidebarItem: (item) =>
    set({
      activeSidebarItem: item,
    }),

  openCompose: () =>
    set({
      isComposeOpen: true,
    }),

  closeCompose: () =>
    set({
      isComposeOpen: false,
    }),
}));
