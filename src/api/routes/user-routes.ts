import { AxiosResponse } from "axios";

import axiosInstance from "../axiosInstance";

import { APIResponse } from "@/types/api-response";

export interface IUserInfo {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
}

// get user info
export const getUserInfo = (): Promise<AxiosResponse<APIResponse<IUserInfo>>> =>
  axiosInstance.get("?request=get-user-by-id");
