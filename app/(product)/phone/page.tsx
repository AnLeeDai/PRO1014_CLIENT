import { Metadata } from "next";
import { Suspense } from "react";

import PhoneContainer from "@/modules/product/phone-container";

export const metadata: Metadata = {
  title: {
    default: "Điện thoại",
    template: `%s - Điện thoại"`,
  },
};

export default function PhonePage() {
  return (
    <Suspense>
      <PhoneContainer />
    </Suspense>
  );
}
