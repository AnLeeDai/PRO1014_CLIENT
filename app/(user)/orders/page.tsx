import { Metadata } from "next";

import OrderContainer from "@/modules/user/order-container";

export const metadata: Metadata = {
  title: {
    default: "Đơn hàng của tôi",
    template: `%s - Đơn hàng của tôi`,
  },
};

export default function OrderPage() {
  return <OrderContainer />;
}
