import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getAllCart, GetAllCartResponse } from "@/lib/api/cart";

export const useCart = (): UseQueryResult<GetAllCartResponse, Error> => {
  return useQuery<GetAllCartResponse, Error>({
    queryKey: ["user-cart"],
    queryFn: getAllCart,
  });
};
