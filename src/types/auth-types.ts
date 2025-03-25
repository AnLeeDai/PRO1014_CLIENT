export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  password_confirm: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
};

export type ForgotPasswordData = {
  email: string;
  new_password: string;
};

export type AuthUser = {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
  role: string;
};
