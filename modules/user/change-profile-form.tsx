"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";

import ModalChangePassword from "./modal-change-password";

import { regexEmail, regexPhone } from "@/helpers/regex";

export default function ChangeProfileForm() {
  const [isError, setIsError] = useState<{
    full_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
  }>({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = {
      full_name: formData.full_name as string,
      email: formData.email as string,
      phone_number: formData.phone_number as string,
      address: formData.address as string,
    };

    const errors: Record<string, string> = {};

    if (data.email && !regexEmail.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (data.phone_number && !regexPhone.test(data.phone_number)) {
      errors.phone_number = "Số điện thoại không hợp lệ";
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    // Submit thành công
    console.log("Đăng ký:", data);
  };

  return (
    <>
      <ModalChangePassword isOpen={isOpen} onOpenChange={onOpenChange} />

      <Card>
        <CardHeader>
          <h1 className="text-lg font-bold">Thông tin cá nhân</h1>
        </CardHeader>

        <CardBody className="flex-1 flex flex-col">
          <Form
            className="flex flex-col h-full w-full"
            validationBehavior="aria"
            validationErrors={isError}
            onSubmit={handleSubmitForm}
          >
            {/* Group input */}
            <div className="flex flex-col gap-5 w-full">
              <Input isDisabled label="Tên đăng nhập" name="username" />
              <Input label="Họ và tên" name="full_name" />
              <Input label="Email" name="email" />
              <Input label="Số điện thoại" name="phone_number" />
              <Input label="Địa chỉ" name="address" />
            </div>

            {/* Nút luôn nằm dưới cùng */}
            <div className="mt-auto pt-8 grid gap-4 lg:grid-cols-2 w-full">
              <Button fullWidth color="default" size="lg" onPress={onOpen}>
                Đổi mật khẩu
              </Button>

              <Button fullWidth color="primary" size="lg" type="submit">
                Thay đổi thông tin
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
