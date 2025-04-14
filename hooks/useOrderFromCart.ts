import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { orderFromCart } from "@/lib/api/order";
import { ResponseErr, ResponseSuccess } from "@/types/api";
export interface OrderFromCartParams {
  type: string;
  shipping_address: string;
  payment_method: string;
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
    mutationFn: ({ type, shipping_address, payment_method }) =>
      orderFromCart(type, shipping_address, payment_method),
    ...options,
  });
};
