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
import {
  emailRegex,
  passwordRegex,
  phoneNumRegex,
  usernameRegex,
} from "@/constants/validate";

export default function RegisterPage() {
  const [isError, setIsError] = useState<{
    email?: string;
    username?: string;
    full_name?: string;
    password?: string;
    password_confirm?: string;
    phone_number?: string;
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
      addToast({
        title: "Đăng ký thành công",
        color: "success",
      });

      // redirect
      navigate(siteConfig.route.login);
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
      username: formData.username as string,
      full_name: formData.full_name as string,
      email: formData.email as string,
      phone_number: formData.phone_number as string,
      address: formData.address as string,
      password: formData.password as string,
      password_confirm: formData.password_confirm as string,
    };

    const errors: Record<string, string> = {};

    // Username
    if (!data.username) {
      errors.username = "Tên đăng nhập không được để trống";
    } else if (!usernameRegex.test(data.username)) {
      errors.username =
        "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số";
    }

    // Full name
    if (!data.full_name) {
      errors.full_name = "Họ và tên không được để trống";
    }

    // Email
    if (!data.email) {
      errors.email = "Email không được để trống";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Phone number
    if (data.phone_number && !phoneNumRegex.test(data.phone_number)) {
      errors.phone_number = "Số điện thoại không hợp lệ";
    }

    // Password
    if (!data.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (!passwordRegex.test(data.password)) {
      errors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    // Confirm password
    if (!data.password_confirm) {
      errors.password_confirm = "Vui lòng nhập lại mật khẩu";
    } else if (data.password !== data.password_confirm) {
      errors.password_confirm = "Mật khẩu không khớp";
    }

    // Nếu có lỗi thì set và dừng submit
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
          <h2 className="text-3xl w-full font-semibold text-center">Đăng ký</h2>
        </CardHeader>

        <CardBody>
          <Form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            validationBehavior="aria"
            validationErrors={isError}
            onSubmit={handleSubmitForm}
          >
            <Input
              isRequired
              label="Tên đăng nhập"
              name="username"
              type="text"
            />
            <Input isRequired label="Họ và tên" name="full_name" type="text" />
            <Input isRequired label="Email" name="email" type="email" />
            <Input label="Số điện thoại" name="phone_number" type="tel" />
            <Input
              className="col-span-1 md:col-span-2"
              label="Địa chỉ"
              name="address"
              type="text"
            />

            <PasswordInput
              isRequired
              className="col-span-1 md:col-span-2"
              label="Mật khẩu"
              name="password"
            />

            <PasswordInput
              isRequired
              className="col-span-1 md:col-span-2"
              label="Nhập lại mật khẩu"
              name="password_confirm"
            />

            <Button
              className="col-span-1 md:col-span-2"
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
