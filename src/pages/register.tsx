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
import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import useRegister from "@/hooks/api/useRegister";

export default function RegisterPage() {
  const [isError, setIsError] = useState<{
    email?: string;
    username?: string;
    full_name?: string;
    password?: string;
    password_confirm?: string;
  }>({});

  const navigate = useNavigate();

  const { mutate, isPending } = useRegister({
    onError: (error) => {
      addToast({
        title: "Đăng ký thất bại",
        description: error.message,
        color: "danger",
      });
    },

    onSuccess: () => {
      // redirect
      navigate(siteConfig.route.login);
    },
  });

  const handleSubmitForm = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.currentTarget));

    let data = {
      username: formData.username as string,
      full_name: formData.full_name as string,
      email: formData.email as string,
      phone_number: formData.phone_number as string,
      address: formData.address as string,
      password: formData.password as string,
      password_confirm: formData.password_confirm as string,
    };

    if (!data.username) {
      const usernameRegex = /^[a-zA-Z0-9]{6,}$/;

      if (!usernameRegex.test(data.username)) {
        setIsError({
          username:
            "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số",
        });

        return;
      }
    }

    if (!data.full_name) {
      setIsError({ full_name: "Họ và tên không được để trống" });

      return;
    }

    if (!data.password) {
      setIsError({ password: "Mật khẩu không được để trống" });

      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    if (!passwordRegex.test(data.password)) {
      setIsError({
        password:
          "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
      });

      return;
    }

    if (!data.password_confirm) {
      setIsError({ password_confirm: "Vui lòng nhập lại mật khẩu" });

      return;
    }

    if (data.password !== data.password_confirm) {
      setIsError({ password_confirm: "Mật khẩu không khớp" });

      return;
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(data.email)) {
        setIsError({ email: "Email không hợp lệ" });

        return;
      }
    }

    // call api register
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
          <h2 className="text-3xl w-full font-semibold text-center">Đăng ký</h2>
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
              label="Tên đăng nhập"
              name="username"
              size="md"
              type="text"
            />

            <Input
              isRequired
              label="Họ và tên"
              name="full_name"
              size="md"
              type="text"
            />

            <Input label="Email" name="email" size="md" type="email" />

            <Input
              label="Số điện thoại"
              name="phone_number"
              size="md"
              type="tel"
            />

            <Input label="Địa chỉ" name="address" size="md" type="text" />

            <PasswordInput
              isRequired
              label="Mật khẩu"
              name="password"
              size="md"
            />

            <PasswordInput
              isRequired
              label="Nhập lại mật khẩu"
              name="password_confirm"
              size="md"
            />

            <Button
              className="w-full"
              color="primary"
              isLoading={isPending}
              size="lg"
              type="submit"
            >
              Đăng ký
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
