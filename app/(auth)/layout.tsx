"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { usePathname } from "next/navigation";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";

interface ILayoutAuthProps {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: ILayoutAuthProps) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <div className="mx-6 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg py-6 px-6 rounded-xl" shadow="md">
        <CardHeader className="flex-col items-center text-center">
          <div className="flex justify-between items-center w-full">
            <Forward
              href={
                isLoginPage
                  ? siteConfig.routes.home
                  : isRegisterPage
                    ? siteConfig.routes.login
                    : siteConfig.routes.login
              }
            />

            <div>
              <h1 className="text-2xl font-bold">
                {isLoginPage
                  ? "Chào mừng trở lại"
                  : isRegisterPage
                    ? "Tạo tài khoản"
                    : "Xác thực"}
              </h1>

              <p className="text-sm mt-1">
                {isLoginPage
                  ? "Đăng nhập vào tài khoản của bạn"
                  : isRegisterPage
                    ? "Tạo tài khoản mới"
                    : "Vui lòng hoàn tất thông tin để tiếp tục"}
              </p>
            </div>

            <div className="min-w-6 max-w-6 max-h-6 min-h-6" />
          </div>
        </CardHeader>

        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}
