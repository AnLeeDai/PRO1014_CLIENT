import { Metadata } from "next";

import RegisterForm from "@/modules/auth/register-form";

export const metadata: Metadata = {
  title: {
    default: "Đăng ký",
    template: `%s - Đăng ký"`,
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
