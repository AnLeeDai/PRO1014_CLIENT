import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { forgotPassword, ForgotPasswordData } from "@/api/routes/auth-routes";

type Res = {
  success: boolean;
  message: string;
};

export default function useForgotPassword(
  options?: UseMutationOptions<
    AxiosResponse<Res>,
    Error,
    ForgotPasswordData,
    unknown
  >,
): UseMutationResult<AxiosResponse<Res>, Error, ForgotPasswordData, unknown> {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (forgotPasswordData: ForgotPasswordData) =>
      forgotPassword(forgotPasswordData),
    ...options,
  });
}
