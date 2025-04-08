import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getAllProduct, GetAllProductResponse } from "../lib/api/product";

export const useProduct = (
  category_id?: number,
): UseQueryResult<GetAllProductResponse, Error> => {
  return useQuery<GetAllProductResponse, Error>({
    queryKey: ["user-product", category_id],
    queryFn: () => getAllProduct(category_id),
  });
};
