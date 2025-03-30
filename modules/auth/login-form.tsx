"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

import { regexUsername, regexPassword } from "@/helpers/regex";
import { siteConfig } from "@/config/site";
import PasswordInput from "@/components/password-input";
import LinkCustom from "@/components/link";

export default function LoginForm() {
  const [isError, setIsError] = useState<{
    username?: string;
    password?: string;
  }>({});

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
    };

    const errors: Record<string, string> = {};

    if (!data.username) {
      errors.username = "Tên đăng nhập không được để trống";
    } else if (!regexUsername.test(data.username)) {
      errors.username =
        "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số";
    }

    if (!data.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (!regexPassword.test(data.password)) {
      errors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    console.log(data);
  };

  return (
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

      <PasswordInput isRequired label="Mật khẩu" name="password" size="md" />

      <div className="flex w-full flex-wrap gap-3 items-center justify-between px-1 py-2">
        <LinkCustom className="text-sm" href={siteConfig.routes.forgotPassword}>
          Quên mật khẩu?
        </LinkCustom>

        <LinkCustom className="text-sm" href={siteConfig.routes.register}>
          Tạo tài khoản mới
        </LinkCustom>
      </div>

      <Button className="w-full" color="primary" size="lg" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
}
