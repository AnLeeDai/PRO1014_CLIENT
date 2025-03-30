import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Điện thoại",
    template: `%s - Điện thoại"`,
  },
};

export default function PhonePage() {
  return <div>PhonePage</div>;
}
