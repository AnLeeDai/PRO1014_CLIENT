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

export type ForgotPasswordData = {
  email: string;
  new_password: string;
};

export const login = (data: LoginData): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("?request=post-login", data);
};

export const register = (data: RegisterData): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("?request=post-register", data);
};

export const forgotPassword = (
  data: ForgotPasswordData,
): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("?request=post-forgot-password", data);
};
