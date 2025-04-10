import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getOrderHistory, OrderHistoryResponse } from "@/lib/api/order";

export const useOrderHistory = (): UseQueryResult<
  OrderHistoryResponse,
  Error
> => {
  return useQuery<OrderHistoryResponse, Error>({
    queryKey: ["order-history"],
    queryFn: getOrderHistory,
  });
};
