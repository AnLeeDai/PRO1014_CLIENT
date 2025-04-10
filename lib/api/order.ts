import axiosInstance from "../axiosInstance";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  discount_code: string;
  product_name: string;
  thumbnail: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_price: string;
  status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderHistoryResponse {
  success: boolean;
  message: string;
  orders: Order[];
}

export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
  const res = await axiosInstance.get<OrderHistoryResponse>(
    "?request=get-order-history",
  );

  return res.data;
};

export const orderFromCart = async (type: string) => {
  const res = await axiosInstance.post("?request=post-checkout", {
    type,
  });

  return res.data;
};

export const orderNow = async (
  type: string,
  product_id: number,
  quantity: number,
  discount_code: string,
) => {
  const res = await axiosInstance.post("?request=post-checkout", {
    type,
    product_id,
    quantity,
    discount_code,
  });

  return res.data;
};
