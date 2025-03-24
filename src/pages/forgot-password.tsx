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

  const { mutate } = useForgotPassword({
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

    let formData = Object.fromEntries(new FormData(e.currentTarget));

    let data = {
      email: formData.email as string,
      new_password: formData.new_password as string,
    };

    const errors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Password validation
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

    // call api
    mutate(data);
  };

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
          {isStep === "final" && (
            <h1 className="text-center text-lg font-semibold">
              Yêu cầu đổi mật khẩu đã được ghi nhận, admin sẽ xử lý sơm nhất có
              thể
            </h1>
          )}

          {isStep === "start" && (
            <Form
              className="space-y-4"
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
                size="lg"
                type="submit"
              >
                Gửi yêu cầu
              </Button>
            </Form>
          )}
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
