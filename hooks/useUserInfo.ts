import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getUserInfo } from "../lib/api/user";

import { ResponseSuccess } from "@/types/api";

interface UserInfo {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar_url: string;
}

export const useUserInfo = (): UseQueryResult<
  ResponseSuccess<UserInfo>,
  Error
> => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem("isLogin") === "true");
  }, []);

  return useQuery<ResponseSuccess<UserInfo>, Error>({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    enabled,
  });
};
