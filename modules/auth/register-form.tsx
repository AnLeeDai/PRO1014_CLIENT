"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

import {
  regexUsername,
  regexPassword,
  regexEmail,
  regexPhone,
} from "@/helpers/regex";
import PasswordInput from "@/components/password-input";

export default function RegisterForm() {
  const [isError, setIsError] = useState<{
    username?: string;
    full_name?: string;
    email?: string;
    phone_number?: string;
    password?: string;
    password_confirm?: string;
    address?: string;
  }>({});

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = {
      username: formData.username as string,
      password: formData.password as string,
      password_confirm: formData.password_confirm as string,
      full_name: formData.full_name as string,
      email: formData.email as string,
      phone_number: formData.phone_number as string,
      role: "user",
      address: formData.address as string,
    };

    const errors: Record<string, string> = {};

    if (!data.username || !regexUsername.test(data.username)) {
      errors.username =
        "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số";
    }

    if (!data.full_name) {
      errors.full_name = "Họ tên không được để trống";
    }

    if (!data.email || !regexEmail.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    // chỉ validate số điện thoại nếu có
    if (data.phone_number && !regexPhone.test(data.phone_number)) {
      errors.phone_number = "Số điện thoại không hợp lệ";
    }

    if (!data.password || !regexPassword.test(data.password)) {
      errors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    if (data.password !== data.password_confirm) {
      errors.password_confirm = "Mật khẩu xác nhận không khớp";
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    // Submit thành công
    console.log("Đăng ký:", data);
  };

  return (
    <Form
      className="space-y-5"
      validationBehavior="aria"
      validationErrors={isError}
      onSubmit={handleSubmitForm}
    >
      <div className="flex gap-2 w-full">
        <Input isRequired label="Tên đăng nhập" name="username" />
        <Input isRequired label="Họ và tên" name="full_name" />
      </div>

      <div className="flex gap-2 w-full">
        <Input isRequired label="Email" name="email" type="email" />
        <Input label="Số điện thoại" name="phone_number" />
      </div>

      <div className="flex gap-2">
        <PasswordInput isRequired label="Mật khẩu" name="password" />
        <PasswordInput
          isRequired
          label="Xác nhận mật khẩu"
          name="password_confirm"
        />
      </div>
      <Input label="Địa chỉ" name="address" />

      <Button className="w-full" color="primary" size="lg" type="submit">
        Đăng ký
      </Button>
    </Form>
  );
}
