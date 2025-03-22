import { Card, CardHeader, CardBody, CardFooter, Link } from "@heroui/react";

import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card
        className="w-[500px]"
        classNames={{
          header: "p-6",
          body: "p-6",
          footer: "p-6",
        }}
      >
        <CardHeader>
          <h2 className="text-3xl w-full font-semibold text-center">
            Quên mật khẩu
          </h2>
        </CardHeader>

        <CardBody>
          <h1 className="text-center text-lg font-semibold">
            Vui lòng liên hệ admin để đổi mật khẩu
          </h1>
        </CardBody>

        <CardFooter>
          <p className="text-center w-full">
            Đã có tài khoản?{" "}
            <Link className="text-primary" href={siteConfig.route.login}>
              Đăng nhập ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
