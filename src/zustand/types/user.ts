export interface IUser {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
  role: string;
}

export interface UserStoreState {
  userData: IUser | null;
  setUser: (data: IUser) => void;
  logout: () => void;
}
