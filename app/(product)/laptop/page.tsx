import { Suspense } from "react";
import { Metadata } from "next";

import LaptopContainer from "@/modules/product/laptop-container";

export const metadata: Metadata = {
  title: {
    default: "Laptop",
    template: `%s - Laptop`,
  },
};

export default function LaptopPage() {
  return (
    <Suspense>
      <LaptopContainer />
    </Suspense>
  );
}
