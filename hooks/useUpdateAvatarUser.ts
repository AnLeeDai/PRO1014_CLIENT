import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { editAvatar } from "@/lib/api/user";
import { ResponseSuccess, ResponseErr } from "@/types/api";

interface EditAvatarParams {
  avatar: File;
}

interface EditAvatarResponse {
  avatar_url: string;
}

export const useUpdateAvatarUser = (
  options?: UseMutationOptions<
    ResponseSuccess<EditAvatarResponse>,
    ResponseErr,
    EditAvatarParams
  >,
) => {
  return useMutation({
    mutationFn: ({ avatar }: EditAvatarParams) => editAvatar(avatar),
    ...options,
  });
};
