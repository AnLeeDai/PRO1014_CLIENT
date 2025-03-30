"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

import { regexEmail, regexPassword, regexUsername } from "@/helpers/regex";
import PasswordInput from "@/components/password-input";

export default function ForgotPasswordForm() {
  const [isError, setIsError] = useState<{
    username?: string;
    email?: string;
    new_password?: string;
  }>({});

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = {
      username: formData.username as string,
      email: formData.email as string,
      new_password: formData.new_password as string,
    };

    const errors: typeof isError = {};

    if (!data.username || !regexUsername.test(data.username)) {
      errors.username = "Tên đăng nhập không hợp lệ";
    }

    if (!data.email || !regexEmail.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!data.new_password || !regexPassword.test(data.new_password)) {
      errors.new_password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    console.log("Gửi yêu cầu quên mật khẩu:", data);
  };

  return (
    <Form
      className="flex flex-col space-y-5 max-w-md w-full mx-auto"
      validationBehavior="aria"
      validationErrors={isError}
      onSubmit={handleSubmitForm}
    >
      <Input isRequired label="Tên đăng nhập" name="username" />
      <Input isRequired label="Email" name="email" type="email" />
      <PasswordInput isRequired label="Mật khẩu mới" name="new_password" />

      <Button className="w-full" color="primary" type="submit">
        Gửi yêu cầu
      </Button>
    </Form>
  );
}
