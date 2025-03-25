import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IUser } from "../types/user";

type StorageType = "localStorage" | "sessionStorage";

let currentStorageType: StorageType = "localStorage";

export function setGlobalUserStorageType(type: StorageType) {
  currentStorageType = type;
}

interface AuthUserState {
  userData: IUser | null;
  userStorageType: StorageType;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  setUserStorageType: (type: StorageType) => void;
}

export const useAuthUserSlice = create<AuthUserState>()(
  persist(
    (set) => ({
      userData: null,
      userStorageType: currentStorageType,
      setUser: (user) => set({ userData: user }),
      logout: () => set({ userData: null }),

      setUserStorageType: (type) => {
        set({ userStorageType: type });
        setGlobalUserStorageType(type);
      },
    }),
    {
      name: "auth-user",
      storage: createJSONStorage(() =>
        currentStorageType === "sessionStorage" ? sessionStorage : localStorage,
      ),
    },
  ),
);
