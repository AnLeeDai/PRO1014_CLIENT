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

import useLogin from "@/hooks/api/useLogin";
import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";

export default function ForgotPasswordPage() {
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
            Quên mật khẩu
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

            <Button
              className="w-full"
              color="primary"
              isLoading={isPending}
              size="lg"
              type="submit"
            >
              Đổi mật khẩu
            </Button>
          </Form>
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
