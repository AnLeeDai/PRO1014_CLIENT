import { Metadata } from "next";

import TabletContainer from "@/modules/product/tablet-container";

export const metadata: Metadata = {
  title: {
    default: "Máy tính bảng",
    template: `%s - Máy tính bảng"`,
  },
};

export default function TabletPage() {
  return <TabletContainer />;
}
