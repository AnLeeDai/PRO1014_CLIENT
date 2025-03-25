import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { login, LoginData } from "@/api/routes/auth-routes";

export default function useLogin(
  options?: UseMutationOptions<AxiosResponse<any>, Error, LoginData, unknown>,
): UseMutationResult<AxiosResponse<any>, Error, LoginData, unknown> {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      return login(data);
    },
    ...options,
  });
}
