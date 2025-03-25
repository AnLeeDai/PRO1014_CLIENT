import { useShallow } from "zustand/react/shallow";

import { useAuthUserSlice } from "./slice/user-slice";

export const useAuthUserStore = () =>
  useAuthUserSlice(
    useShallow((state) => ({
      userData: state.userData,
      setUserData: state.setUser,
      setUserStorageType: state.setUserStorageType,
      logout: state.logout,
    })),
  );
