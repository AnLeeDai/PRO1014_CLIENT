import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { updateCart } from "@/lib/api/cart";
import { ResponseErr, ResponseSuccess } from "@/types/api";

interface UpdateCartParams {
  product_id: number;
  quantity: number;
}

interface UpdateCartResponse {
  success: boolean;
  message: string;
}

export const useUpdateCart = (
  options?: UseMutationOptions<
    ResponseSuccess<UpdateCartResponse>,
    ResponseErr,
    UpdateCartParams
  >,
) => {
  return useMutation({
    mutationKey: ["update-cart"],
    mutationFn: (data: UpdateCartParams) =>
      updateCart(data.product_id, data.quantity),
    ...options,
  });
};
