import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Laptop",
    template: `%s - Laptop`,
  },
};

export default function LaptopPage() {
  return <div>LaptopPage</div>;
}
