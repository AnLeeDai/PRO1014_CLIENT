import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Input,
  Button,
  Form,
  addToast,
} from "@heroui/react";

import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import PasswordInput from "@/components/password-input";
import { emailRegex, passwordRegex } from "@/constants/validate";
import useForgotPassword from "@/hooks/api/useForgotPassword";

export default function ForgotPasswordPage() {
  const [isError, setIsError] = useState<{
    email?: string;
    new_password?: string;
  }>({});

  const [isStep, setIsStep] = useState<"start" | "final">("start");

  const { mutate, isPending } = useForgotPassword({
    onError: (error) => {
      addToast({
        title: "Gửi yêu cầu đổi mật khẩu thất bại",
        description: error.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      setIsStep("final");
    },
  });

  const handleSubmitForm = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    if (!e.currentTarget) return;

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = {
      email: formData.email as string,
      new_password: formData.new_password as string,
    };

    const errors: Record<string, string> = {};

    if (!data.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!data.new_password) {
      errors.new_password = "Vui lòng nhập mật khẩu";
    } else if (!passwordRegex.test(data.new_password)) {
      errors.new_password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    mutate(data);
  };

  return (
    <AuthLayout>
      <Card
        className="w-[100%] lg:w-[40%] mx-auto"
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
          {isStep === "final" && (
            <h1 className="text-center text-base sm:text-lg font-medium text-default-700">
              Yêu cầu đổi mật khẩu đã được ghi nhận, admin sẽ xử lý sớm nhất có
              thể
            </h1>
          )}

          {isStep === "start" && (
            <Form
              className="space-y-5"
              validationBehavior="aria"
              validationErrors={isError}
              onSubmit={handleSubmitForm}
            >
              <Input
                isRequired
                label="Email"
                name="email"
                size="md"
                type="email"
              />

              <PasswordInput
                isRequired
                label="Mật khẩu mới"
                name="new_password"
                size="md"
              />

              <Button
                className="w-full"
                color="primary"
                isLoading={isPending}
                size="lg"
                type="submit"
              >
                Gửi yêu cầu
              </Button>
            </Form>
          )}
        </CardBody>

        <CardFooter>
          <p className="text-center text-sm sm:text-base w-full">
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
