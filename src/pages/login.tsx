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
import { emailRegex, passwordRegex } from "@/constants/validate";
import { userStore } from "@/zustand/user-store";

export default function LoginPage() {
  const [isError, setIsError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const reloadUser = userStore((state) => state.reloadUser);

  const [isRemember, setIsRemember] = useState<boolean>(false);

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
      // save user data
      if (isRemember) {
        localStorage.setItem("user", JSON.stringify(data.data));
      } else {
        sessionStorage.setItem("user", JSON.stringify(data.data));
      }

      // reload user data
      reloadUser();

      // redirect
      navigate(siteConfig.route.home);
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
      password: formData.password as string,
      remember: formData.remember as string,
    };

    const errors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
      errors.email = "Email không được để trống";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Password validation
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

    // Remember me
    if (data.remember === "") {
      setIsRemember(true);
    }

    // Call api
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
              <Checkbox defaultSelected name="remember" size="md">
                Ghi nhớ tài khoản
              </Checkbox>
              <Link
                className="text-default-500"
                href={siteConfig.route.forgotPassword}
                size="md"
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
