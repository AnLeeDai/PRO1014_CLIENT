import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { updateUserInfo } from "@/lib/api/user";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface UpdateInfoUserParams {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
}

interface UpdateInfoUserResponse {
  success: boolean;
  message: string;
}

export const useUpdateInfoUser = (
  options?: UseMutationOptions<
    ResponseSuccess<UpdateInfoUserResponse>,
    ResponseErr,
    UpdateInfoUserParams
  >,
) => {
  return useMutation({
    mutationFn: ({
      full_name,
      email,
      phone_number,
      address,
    }: UpdateInfoUserParams) =>
      updateUserInfo(full_name, email, phone_number, address),
    ...options,
  });
};
