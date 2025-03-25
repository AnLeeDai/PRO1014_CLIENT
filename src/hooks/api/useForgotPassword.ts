import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { forgotPassword, ForgotPasswordData } from "@/api/routes/auth-routes";

export default function useForgotPassword(
  options?: UseMutationOptions<
    AxiosResponse<any>,
    Error,
    ForgotPasswordData,
    unknown
  >,
): UseMutationResult<AxiosResponse<any>, Error, ForgotPasswordData, unknown> {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (data: ForgotPasswordData) => {
      return forgotPassword(data);
    },
    ...options,
  });
}
