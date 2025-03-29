import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getUserInfo, IUserInfo } from "@/api/routes/user-routes";

export default function useGetUserInfo(
  options?: UseQueryOptions<
    AxiosResponse<any>,
    Error,
    AxiosResponse<any>,
    ["getUserInfo"]
  >,
): UseQueryResult<AxiosResponse<IUserInfo>, Error> {
  return useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      return getUserInfo();
    },
    ...options,
  });
}
