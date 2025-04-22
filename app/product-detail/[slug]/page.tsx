import { Metadata } from "next";

import HomeContainer from "@/modules/product/home-container";

export const metadata: Metadata = {
  title: {
    default: "Chi tiết sản phẩm",
    template: `%s - Chi tiết sản phẩm`,
  },
};

export default function ProductSlugPage() {
  return <HomeContainer />;
}
