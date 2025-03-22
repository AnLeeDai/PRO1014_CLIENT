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
  Checkbox,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import PasswordInput from "@/components/password-input";
import useLogin from "@/hooks/api/useLogin";
import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";

export default function LoginPage() {
  const [isError, setIsError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const { mutate, isPending } = useLogin({
    onError: (error) => {
      addToast({
        title: "Đăng nhập thất bại",
        description: error.message,
        color: "danger",
      });
    },

    onSuccess: (data) => {
      // save data to local storage
      localStorage.setItem("user", JSON.stringify(data.data));

      // redirect
      navigate(siteConfig.route.home);
    },
  });

  const handleSubmitForm = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.currentTarget));

    let data = {
      email: formData.email as string,
      password: formData.password as string,
    };

    if (!data.email) {
      validateEmail(data.email);

      return;
    } else if (!data.password) {
      validatePassword(data.password);

      return;
    }

    // call api login
    mutate(data);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setIsError({ email: "Email không hợp lệ" });
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    if (!passwordRegex.test(value)) {
      setIsError({ password: "Mật khẩu không hợp lệ" });
    }
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
            Đăng nhập
          </h2>
        </CardHeader>

        <CardBody>
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
              label="Mật khẩu"
              name="password"
              size="md"
            />

            <div className="flex w-full items-center justify-between px-1 py-2">
              <Checkbox defaultSelected name="remember" size="sm">
                Ghi nhớ tài khoản
              </Checkbox>
              <Link
                className="text-default-500"
                href={siteConfig.route.forgotPassword}
                size="sm"
              >
                Quên mật khẩu?
              </Link>
            </div>

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
          <p className="text-center w-full">
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
