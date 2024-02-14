import { create } from "zustand";

interface searchButtonTypeStore {
  searchButtonType?: "button" | "bar";
  setSearchButtonType: (buttonType: "button" | "bar") => void;
}

const useSearchButtonTypeStore = create<searchButtonTypeStore>((set) => ({
  searchButtonType: "bar",
  setSearchButtonType: (buttonType) =>  set({ searchButtonType: buttonType })
}));

export default useSearchButtonTypeStore;
