import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getUserInfo } from "../lib/api/user";

interface UserInfo {
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
}

export const useUserInfo = (): UseQueryResult<UserInfo, Error> => {
  return useQuery<UserInfo, Error>({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });
};
