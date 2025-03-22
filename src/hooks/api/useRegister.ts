import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { register, RegisterData } from "@/api/routes/auth-routes";

type RegisterDataRes = {
  success: boolean;
  message: string;
};

export default function useRegister(
  options?: UseMutationOptions<
    AxiosResponse<RegisterDataRes>,
    Error,
    RegisterData,
    unknown
  >,
): UseMutationResult<
  AxiosResponse<RegisterDataRes>,
  Error,
  RegisterData,
  unknown
> {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (registerData: RegisterData) => register(registerData),
    ...options,
  });
}
