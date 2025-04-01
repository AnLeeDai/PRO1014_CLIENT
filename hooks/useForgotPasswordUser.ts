import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { forgotPassword } from "@/lib/api/auth";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface ForgotPasswordParams {
  username: string;
  email: string;
  new_password: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const useForgotPasswordUser = (
  options?: UseMutationOptions<
    ResponseSuccess<ForgotPasswordResponse>,
    ResponseErr,
    ForgotPasswordParams
  >,
) => {
  return useMutation({
    mutationFn: ({ username, email, new_password }: ForgotPasswordParams) =>
      forgotPassword(username, email, new_password),
    ...options,
  });
};
