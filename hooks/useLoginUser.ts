import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { loginUser } from "@/lib/api/auth";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
  role: string;
}

export const useLoginUser = (
  options?: UseMutationOptions<
    ResponseSuccess<LoginResponse>,
    ResponseErr,
    LoginParams
  >,
) => {
  return useMutation({
    mutationFn: ({ username, password }: LoginParams) =>
      loginUser(username, password),
    ...options,
  });
};
