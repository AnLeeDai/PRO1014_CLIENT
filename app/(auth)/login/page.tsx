import { Metadata } from "next";

import LoginForm from "@/modules/auth/login-form";

export const metadata: Metadata = {
  title: {
    default: "Đăng nhập",
    template: `%s - Đăng nhập"`,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
