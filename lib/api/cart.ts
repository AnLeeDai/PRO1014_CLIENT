import axiosInstance from "../axiosInstance";

export const createCart = async (
  product_id: number,
  quantity: number,
  discount_code: string,
) => {
  const res = await axiosInstance.post("?request=post-cart", {
    product_id,
    quantity,
    discount_code,
  });

  return res.data;
};
