import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { login, LoginData } from "@/api/routes/auth-routes";

type Res = {
  success: boolean;
  message: string;
  data: {
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar_url: string;
  };
};

export default function useLogin(
  options?: UseMutationOptions<AxiosResponse<Res>, Error, LoginData, unknown>,
): UseMutationResult<AxiosResponse<Res>, Error, LoginData, unknown> {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: LoginData) => login(loginData),
    ...options,
  });
}
