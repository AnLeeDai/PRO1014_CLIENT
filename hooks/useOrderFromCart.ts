import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { orderFromCart } from "@/lib/api/order";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface OrderFromCartParams {
  type: string;
}

interface OrderFromCartResponse {
  success: boolean;
  message: string;
}

export const useOrderFromCart = (
  options?: UseMutationOptions<
    ResponseSuccess<OrderFromCartResponse>,
    ResponseErr,
    OrderFromCartParams
  >,
) => {
  return useMutation({
    mutationFn: ({ type }: OrderFromCartParams) => orderFromCart(type),
    ...options,
  });
};
