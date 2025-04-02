"use client";

import React from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { LogIn } from "lucide-react";
import Cookies from "js-cookie";

import { regexUsername, regexPassword } from "@/helpers/regex";
import { siteConfig } from "@/config/site";
import PasswordInput from "@/components/password-input";
import LinkCustom from "@/components/link";
import { useLoginUser } from "@/hooks/useLoginUser";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginUser({
    onSuccess: (data) => {
      Cookies.set("role", data.data.role, {
        path: "/",
        secure: true,
        sameSite: "None",
      });

      Cookies.set("isLogin", JSON.stringify(true), {
        path: "/",
        secure: true,
        sameSite: "None",
      });

      addToast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay lại!",
        color: "success",
      });

      router.replace(siteConfig.routes.home);
    },

    onError: (error) => {
      addToast({
        title: "Đã xảy ra sự cố",
        description: error.message,
        color: "danger",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    let hasError = false;

    if (!regexUsername.test(data.username)) {
      setError("username", {
        message:
          "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số",
      });
      hasError = true;
    }

    if (!regexPassword.test(data.password)) {
      setError("password", {
        message:
          "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
      });
      hasError = true;
    }

    if (hasError) return;

    mutate(data);
  };

  return (
    <Form
      className="space-y-5"
      validationBehavior="aria"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Tên đăng nhập"
            size="md"
            type="text"
            validationBehavior="aria"
          />
        )}
        rules={{ required: "Tên đăng nhập không được để trống" }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Mật khẩu"
            size="md"
            validationBehavior="aria"
          />
        )}
        rules={{ required: "Mật khẩu không được để trống" }}
      />

      <div className="flex w-full flex-wrap gap-3 items-center justify-between px-1 py-2">
        <LinkCustom className="text-sm" href={siteConfig.routes.forgotPassword}>
          Quên mật khẩu?
        </LinkCustom>

        <LinkCustom className="text-sm" href={siteConfig.routes.register}>
          Tạo tài khoản mới
        </LinkCustom>
      </div>

      <Button
        className="w-full"
        color="primary"
        isLoading={isPending}
        size="lg"
        startContent={<LogIn />}
        type="submit"
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
