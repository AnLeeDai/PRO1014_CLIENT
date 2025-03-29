import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";

import { updateAvatar } from "@/api/routes/user-routes";
import { APIResponse } from "@/types/api-response";
import { IUserInfo } from "@/api/routes/user-routes";

export default function useUploadAvatar(
  options?: UseMutationOptions<
    APIResponse<IUserInfo>,
    Error,
    FormData,
    unknown
  >,
): UseMutationResult<APIResponse<IUserInfo>, Error, FormData, unknown> {
  return useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: async (formData: FormData) => {
      return updateAvatar(formData);
    },
    ...options,
  });
}
