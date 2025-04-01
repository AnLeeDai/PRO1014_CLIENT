import axiosInstance from "../axiosInstance";

import { ResponseSuccess } from "@/types/api";

export const getUserInfo = async (): Promise<
  ResponseSuccess<{
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar_url: string;
  }>
> => {
  const res = await axiosInstance.get("?request=get-user-by-id");

  return res.data;
};

export const updateUserInfo = async (
  full_name: string,
  email: string,
  phone_number: string,
  address: string,
) => {
  const res = await axiosInstance.put("?request=put-update-user", {
    full_name,
    email,
    phone_number,
    address,
  });

  return res.data;
};

export const editAvatar = async (avatar: File) => {
  const formData = new FormData();

  formData.append("avatar", avatar);

  const res = await axiosInstance.post("?request=put-edit-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
