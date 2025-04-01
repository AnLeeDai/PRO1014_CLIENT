import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { logoutUser } from "@/lib/api/auth";
import { ResponseErr, ResponseSuccess } from "@/types/api";

export const useLogoutUser = (
  options?: UseMutationOptions<ResponseSuccess<any>, ResponseErr, any>,
) => {
  return useMutation({
    mutationFn: () => logoutUser(),
    ...options,
  });
};
