import axiosInstance from "../axiosInstance";

export interface CartItem {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  original_price: string;
  discount_code: string;
  product_name: string;
  thumbnail: string;
  in_stock: number;
  percent_value: number | null;
  final_price: string;
  cart_id: number;
  status: string;
}

export interface GetAllCartResponse {
  success: boolean;
  message: string;
  cart_items: CartItem[];
}

export const getAllCart = async (): Promise<GetAllCartResponse> => {
  const res = await axiosInstance.get<GetAllCartResponse>("?request=get-cart");

  return res.data;
};

export const createCart = async (product_id: number, quantity: number) => {
  const res = await axiosInstance.post("?request=post-cart", {
    product_id,
    quantity,
  });

  return res.data;
};

export const updateCartDiscount = async (
  product_id: number,
  quantity: number,
) => {
  const res = await axiosInstance.put("?request=put-cart", {
    product_id,
    quantity,
  });

  return res.data;
};
