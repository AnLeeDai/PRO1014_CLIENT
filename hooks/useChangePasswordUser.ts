import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { changePassword } from "@/lib/api/auth";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface ChangePasswordParams {
  old_password: string;
  new_password: string;
  password_confirm: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const useChangePasswordUser = (
  options?: UseMutationOptions<
    ResponseSuccess<ChangePasswordResponse>,
    ResponseErr,
    ChangePasswordParams
  >,
) => {
  return useMutation({
    mutationFn: ({
      old_password,
      new_password,
      password_confirm,
    }: ChangePasswordParams) =>
      changePassword({
        old_password,
        new_password,
        password_confirm,
      }),
    ...options,
  });
};
