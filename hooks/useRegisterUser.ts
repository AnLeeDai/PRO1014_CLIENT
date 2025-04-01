import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { registerUser } from "@/lib/api/auth";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface RegisterParams {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirm: string;
  address: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const useRegisterUser = (
  options?: UseMutationOptions<
    ResponseSuccess<RegisterResponse>,
    ResponseErr,
    RegisterParams
  >,
) => {
  return useMutation({
    mutationFn: ({
      username,
      full_name,
      email,
      phone_number,
      password,
      password_confirm,
      address,
    }: RegisterParams) =>
      registerUser(
        username,
        full_name,
        email,
        phone_number,
        password,
        password_confirm,
        address,
      ),
    ...options,
  });
};
