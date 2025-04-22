import { Metadata } from "next";
import { Suspense } from "react";

import HomeContainer from "@/modules/product/home-container";

export const metadata: Metadata = {
  title: {
    default: "Trang chủ",
    template: `%s - Trang chủ`,
  },
};

export default function HomePage() {
  return (
    <Suspense>
      <HomeContainer />
    </Suspense>
  );
}
