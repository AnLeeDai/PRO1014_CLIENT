import Cookies from "js-cookie";

import axiosInstance from "../axiosInstance";

export const getUserInfo = async (): Promise<{
  success: boolean;
  message: string;
  user: {
    user_id: number;
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar_url: string;
    password_changed_at: null;
    created_at: string;
    role: string;
  };
}> => {
  const userId = Cookies.get("user_id");

  if (!userId) {
    throw new Error("Không tìm thấy user_id trong cookie");
  }

  const res = await axiosInstance.get(`?request=get-user-by-id&id=${userId}`);

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
