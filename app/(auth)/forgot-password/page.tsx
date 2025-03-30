import { Metadata } from "next";

import ForgotPasswordForm from "@/modules/auth/forgot-password";

export const metadata: Metadata = {
  title: {
    default: "Quên mật khẩu",
    template: `%s - Quên mật khẩu`,
  },
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
