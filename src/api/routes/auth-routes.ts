import { AxiosResponse } from "axios";

import axiosInstance from "../axiosInstance";

import { APIResponse } from "@/types/api-response";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  password_confirm: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface ForgotPasswordData {
  email: string;
  new_password: string;
}

// login
export const login = (
  data: LoginData,
): Promise<AxiosResponse<APIResponse<any>>> =>
  axiosInstance.post("?request=post-login", data);

// register
export const register = (
  data: RegisterData,
): Promise<AxiosResponse<APIResponse<any>>> =>
  axiosInstance.post("?request=post-register", data);

// forgot password
export const forgotPassword = (
  data: ForgotPasswordData,
): Promise<AxiosResponse<APIResponse<any>>> =>
  axiosInstance.post("?request=post-forgot-password", data);

// logout
export const logout = (): Promise<APIResponse> =>
  axiosInstance.post("?request=post-logout");
