import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";

interface UpdateCartDiscountParams {
  product_id: number;
  quantity: number;
  discount_code: string;
}

interface UpdateCartDiscountResponse {
  success: boolean;
  message: string;
}

export const useUpdateCartDiscount = () => {
  return useMutation<
    UpdateCartDiscountResponse,
    Error,
    UpdateCartDiscountParams
  >({
    mutationFn: async ({ product_id, quantity, discount_code }) => {
      const res = await axiosInstance.put("?request=put-cart", {
        product_id,
        quantity,
        discount_code,
      });

      return res.data;
    },
  });
};
