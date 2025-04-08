import axiosInstance from "../axiosInstance";

export const registerUser = async (
  username: string,
  full_name: string,
  email: string,
  phone_number: string,
  password: string,
  password_confirm: string,
  address: string,
) => {
  const res = await axiosInstance.post("?request=post-register", {
    username,
    full_name,
    email,
    phone_number,
    password,
    password_confirm,
    address,
  });

  return res.data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await axiosInstance.post("?request=post-login", {
    username,
    password,
  });

  return res.data;
};

export const forgotPassword = async (
  username: string,
  email: string,
  new_password: string,
) => {
  const res = await axiosInstance.post("?request=post-forgot-password", {
    username,
    email,
    new_password,
  });

  return res.data;
};

// change password
export const changePassword = async (data: {
  old_password: string;
  new_password: string;
  password_confirm: string;
}) => {
  const res = await axiosInstance.post("?request=post-change-password", data);

  return res.data;
};
