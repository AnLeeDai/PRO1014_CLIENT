import { Metadata } from "next";

import MyCartContainer from "@/modules/user/my-cart-container";

export const metadata: Metadata = {
  title: {
    default: "Giỏ hàng của tôi",
    template: `%s - Giỏ hàng của tôi`,
  },
};

export default function CartPage() {
  return <MyCartContainer />;
}
