import { create } from "zustand";
import { Tab } from "../types";

interface currentTabStore {
  currentTab?: Tab;
  setCurrentTab: (tab: Tab) => void;
}

const useCurrentTabStore = create<currentTabStore>((set) => ({
  currentTab: undefined,
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));

export default useCurrentTabStore;
