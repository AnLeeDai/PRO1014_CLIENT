import { Metadata } from "next";

import PhoneContainer from "@/modules/product/phone-container";

export const metadata: Metadata = {
  title: {
    default: "Điện thoại",
    template: `%s - Điện thoại"`,
  },
};

export default function PhonePage() {
  return <PhoneContainer />;
}
