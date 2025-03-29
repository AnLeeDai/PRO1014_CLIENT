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
import { useNavigate } from "react-router-dom";

import PasswordInput from "@/components/password-input";
import useLogin from "@/hooks/api/useLogin";
import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import { passwordRegex, usernameRegex } from "@/constants/validate";
import BackLink from "@/components/back-link";

export default function LoginPage() {
  const [isError, setIsError] = useState<{
    username?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      navigate(siteConfig.route.home);
    },

    onError: (error) => {
      addToast({
        title: "Đăng nhập thất bại",
        description: error.message,
        color: "danger",
      });
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
      username: formData.username as string,
      password: formData.password as string,
      remember: formData.remember as string,
    };

    const errors: Record<string, string> = {};

    if (!data.username) {
      errors.username = "Tên đăng nhập không được để trống";
    } else if (!usernameRegex.test(data.username)) {
      errors.username = "Tên đăng nhập không hợp lệ";
    }

    if (!data.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (!passwordRegex.test(data.password)) {
      errors.password =
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
        className="w-[100%] lg:w-[30%] mx-auto"
        classNames={{
          header: "p-6",
          body: "p-6",
          footer: "p-6",
        }}
      >
        <CardHeader>
          <BackLink />

          <h2 className="text-3xl w-full font-semibold text-center">
            Đăng nhập
          </h2>

          <div className="min-w-6 min-h-6" />
        </CardHeader>

        <CardBody>
          <Form
            className="space-y-5"
            validationBehavior="aria"
            validationErrors={isError}
            onSubmit={handleSubmitForm}
          >
            <Input
              isRequired
              label="Tên đăng nhập"
              name="username"
              size="md"
              type="text"
            />

            <PasswordInput
              isRequired
              label="Mật khẩu"
              name="password"
              size="md"
            />

            <Link
              className="text-default-500 text-sm ml-auto"
              href={siteConfig.route.forgotPassword}
            >
              Quên mật khẩu?
            </Link>

            <Button
              className="w-full"
              color="primary"
              isLoading={isPending}
              size="lg"
              type="submit"
            >
              Đăng nhập
            </Button>
          </Form>
        </CardBody>

        <CardFooter>
          <p className="text-center text-sm sm:text-base w-full">
            Chưa có tài khoản?{" "}
            <Link className="text-primary" href={siteConfig.route.register}>
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
