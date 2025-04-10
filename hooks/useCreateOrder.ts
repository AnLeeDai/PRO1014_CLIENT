import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { createCart } from "@/lib/api/cart";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface CreateCartParams {
  product_id: number;
  quantity: number;
  discount_code: string;
}

interface CreateCartResponse {
  success: boolean;
  message: string;
}

export const useCreateCart = (
  options?: UseMutationOptions<
    ResponseSuccess<CreateCartResponse>,
    ResponseErr,
    CreateCartParams
  >,
) => {
  return useMutation({
    mutationKey: ["create-cart"],
    mutationFn: (data: CreateCartParams) =>
      createCart(data.product_id, data.quantity, data.discount_code),
    ...options,
  });
};
