import { Metadata } from "next";
import { Suspense } from "react";

import LoginForm from "@/modules/auth/login-form";

export const metadata: Metadata = {
  title: {
    default: "Đăng nhập",
    template: `%s - Đăng nhập"`,
  },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
