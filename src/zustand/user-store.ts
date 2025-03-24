import { create } from "zustand";

interface IUser {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
}

interface UserStoreState {
  userData: IUser | null;
  reloadUser: () => void;
  logout: () => void;
}

function getInitialUser(): IUser | null {
  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");

  return stored ? JSON.parse(stored) : null;
}

export const userStore = create<UserStoreState>((set) => ({
  userData: getInitialUser(),

  reloadUser: () => {
    const newUser = getInitialUser();

    set({ userData: newUser });
  },

  logout: () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    set({ userData: null });
  },
}));
