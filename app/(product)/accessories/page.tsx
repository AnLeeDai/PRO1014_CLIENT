import { Metadata } from "next";

import AccessoriesContainer from "@/modules/product/accessories-container";

export const metadata: Metadata = {
  title: {
    default: "Phụ kiện",
    template: `%s - Phụ kiện`,
  },
};

export default function AccessoriesPage() {
  return <AccessoriesContainer />;
}
