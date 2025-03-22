import { AxiosResponse } from "axios";

import axiosInstance from "../axiosInstance";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  password_confirm: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
};

export const login = (data: LoginData): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("public.php?request=post-login", data);
};

export const register = (data: RegisterData): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("public.php?request=post-register", data);
};
