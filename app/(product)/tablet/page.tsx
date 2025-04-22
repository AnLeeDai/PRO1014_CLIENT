import { Metadata } from "next";
import { Suspense } from "react";

import TabletContainer from "@/modules/product/tablet-container";

export const metadata: Metadata = {
  title: {
    default: "Máy tính bảng",
    template: `%s - Máy tính bảng"`,
  },
};

export default function TabletPage() {
  return (
    <Suspense>
      <TabletContainer />
    </Suspense>
  );
}
