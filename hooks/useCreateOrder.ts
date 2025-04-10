import { useMutation } from "@tanstack/react-query";

import { createCart } from "@/lib/api/cart";

interface CreateCartParams {
  product_id: number;
  quantity: number;
  discount_code: string;
}

export const useCreateCart = () => {
  return useMutation({
    mutationKey: ["create-cart"],
    mutationFn: (data: CreateCartParams) =>
      createCart(data.product_id, data.quantity, data.discount_code),
  });
};
