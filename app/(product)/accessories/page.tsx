import { Metadata } from "next";
import { Suspense } from "react";

import AccessoriesContainer from "@/modules/product/accessories-container";

export const metadata: Metadata = {
  title: {
    default: "Phụ kiện",
    template: `%s - Phụ kiện`,
  },
};

export default function AccessoriesPage() {
  return (
    <Suspense>
      <AccessoriesContainer />
    </Suspense>
  );
}
