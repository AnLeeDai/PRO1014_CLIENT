import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { register, RegisterData } from "@/api/routes/auth-routes";

export default function useRegister(
  options?: UseMutationOptions<
    AxiosResponse<any>,
    Error,
    RegisterData,
    unknown
  >,
): UseMutationResult<AxiosResponse<any>, Error, RegisterData, unknown> {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterData) => {
      return register(data);
    },
    ...options,
  });
}
