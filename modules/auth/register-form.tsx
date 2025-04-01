"use client";

import React from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

import PasswordInput from "@/components/password-input";
import {
  regexUsername,
  regexPassword,
  regexEmail,
  regexPhone,
} from "@/helpers/regex";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { siteConfig } from "@/config/site";

interface RegisterFormData {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirm: string;
  address: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirm: "",
      address: "",
    },
  });

  const { mutate, isPending } = useRegisterUser({
    onSuccess: () => {
      addToast({
        title: "Đăng ký thành công",
        description: "Vui lòng đăng nhập để tiếp tục",
        color: "success",
      });

      router.replace(siteConfig.routes.login);
    },

    onError: (error) => {
      addToast({
        title: "Đã xảy ra sự cố",
        description: error.message,
        color: "danger",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    let hasError = false;

    if (!regexUsername.test(data.username)) {
      setError("username", {
        message:
          "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số",
      });
      hasError = true;
    }

    if (!data.full_name) {
      setError("full_name", {
        message: "Họ tên không được để trống",
      });
      hasError = true;
    }

    if (!regexEmail.test(data.email)) {
      setError("email", {
        message: "Email không hợp lệ",
      });
      hasError = true;
    }

    if (data.phone_number && !regexPhone.test(data.phone_number)) {
      setError("phone_number", {
        message: "Số điện thoại không hợp lệ",
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

    if (data.password !== data.password_confirm) {
      setError("password_confirm", {
        message: "Mật khẩu xác nhận không khớp",
      });
      hasError = true;
    }

    if (hasError) return;

    // Submit thành công
    mutate(data);
  };

  return (
    <Form
      className="space-y-5"
      validationBehavior="aria"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-4 w-full">
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
              validationBehavior="aria"
            />
          )}
          rules={{ required: "Tên đăng nhập không được để trống" }}
        />
        <Controller
          control={control}
          name="full_name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isRequired
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              label="Họ và tên"
              validationBehavior="aria"
            />
          )}
          rules={{ required: "Họ tên không được để trống" }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
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
              validationBehavior="aria"
            />
          )}
          rules={{ required: "Email không được để trống" }}
        />
        <Controller
          control={control}
          name="phone_number"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              label="Số điện thoại"
              validationBehavior="aria"
            />
          )}
        />
      </div>

      <div className="flex gap-2">
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
              validationBehavior="aria"
            />
          )}
          rules={{ required: "Mật khẩu không được để trống" }}
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
              validationBehavior="aria"
            />
          )}
          rules={{ required: "Xác nhận mật khẩu không được để trống" }}
        />
      </div>

      <Controller
        control={control}
        name="address"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            label="Địa chỉ"
            validationBehavior="aria"
          />
        )}
      />

      <Button
        className="w-full"
        color="primary"
        isLoading={isPending}
        size="lg"
        startContent={<UserPlus />}
        type="submit"
      >
        Đăng ký
      </Button>
    </Form>
  );
}
