import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Phụ kiện",
    template: `%s - Phụ kiện`,
  },
};

export default function AccessoriesPage() {
  return <div>AccessoriesPage</div>;
}
