import create from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type HistoryStoreType = {
  clinicId: string;

  setClinicId: (id: string) => void;
};
const useHistoryStore = create<HistoryStoreType>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        clinicId: "",

        setClinicId: (id) => set(() => ({ clinicId: id })),
      }),
      { name: "historyStore", getStorage: () => sessionStorage }
    )
  )
);

export default useHistoryStore;
