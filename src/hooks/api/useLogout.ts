import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";

import { logout } from "@/api/routes/auth-routes";
import { APIResponse } from "@/types/api-response";

export default function useLogout(
  options?: UseMutationOptions<APIResponse, Error, void, unknown>,
): UseMutationResult<APIResponse, Error, void, unknown> {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await logout();

      return {
        success: response.data.success,
        message: response.data.message,
      };
    },
    ...options,
  });
}
