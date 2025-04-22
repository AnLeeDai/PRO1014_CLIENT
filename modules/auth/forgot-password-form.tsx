"use client";

import React from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SendHorizonal } from "lucide-react";

import { regexEmail, regexPassword, regexUsername } from "@/helpers/regex";
import PasswordInput from "@/components/password-input";
import { useForgotPasswordUser } from "@/hooks/useForgotPasswordUser";
import { siteConfig } from "@/config/site";

interface ForgotPasswordFormData {
  username: string;
  email: string;
  new_password: string;
  password_confirm: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      username: "",
      email: "",
      new_password: "",
      password_confirm: "",
    },
  });

  const { mutate, isPending } = useForgotPasswordUser({
    onSuccess: () => {
      addToast({
        title: "Yêu cầu quên mật khẩu thành công",
        description: "Bạn đã đổi mật khẩu thành công.",
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

  const onSubmit = (data: ForgotPasswordFormData) => {
    let hasError = false;

    if (!regexUsername.test(data.username)) {
      setError("username", { message: "Tên đăng nhập không hợp lệ" });
      hasError = true;
    }

    if (!regexEmail.test(data.email)) {
      setError("email", { message: "Email không hợp lệ" });
      hasError = true;
    }

    if (!regexPassword.test(data.new_password)) {
      setError("new_password", {
        message: "Mật khẩu phải gồm chữ hoa, thường, số và ký tự đặc biệt",
      });
      hasError = true;
    }

    if (data.new_password !== data.password_confirm) {
      setError("password_confirm", {
        message: "Mật khẩu xác nhận không khớp",
      });
      hasError = true;
    }

    if (hasError) return;

    mutate(data);
  };

  return (
    <Form
      className="flex flex-col space-y-5 max-w-md w-full mx-auto"
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
          />
        )}
        rules={{ required: "Tên đăng nhập không được để trống" }}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Email"
            type="email"
          />
        )}
        rules={{ required: "Email không được để trống" }}
      />

      <Controller
        control={control}
        name="new_password"
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Mật khẩu mới"
          />
        )}
        rules={{ required: "Mật khẩu mới không được để trống" }}
      />

      <Controller
        control={control}
        name="password_confirm"
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Xác nhận mật khẩu"
          />
        )}
        rules={{ required: "Vui lòng nhập lại mật khẩu để xác nhận" }}
      />

      <Button
        className="w-full"
        color="primary"
        isLoading={isPending}
        size="lg"
        startContent={<SendHorizonal />}
        type="submit"
      >
        Gửi yêu cầu
      </Button>
    </Form>
  );
}
