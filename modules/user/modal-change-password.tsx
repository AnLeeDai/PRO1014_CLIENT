import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Form,
} from "@heroui/react";
import { useState } from "react";

import PasswordInput from "@/components/password-input";
import { regexPassword, regexUsername } from "@/helpers/regex";

interface IModalChangePasswordProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ModalChangePassword({
  isOpen,
  onOpenChange,
}: IModalChangePasswordProps) {
  const [isError, setIsError] = useState<{
    username?: string;
    old_password?: string;
    new_password?: string;
  }>({});

  const validatePassword = (value: string, fieldName = "Mật khẩu") => {
    if (!value) return `${fieldName} không được để trống`;
    if (!regexPassword.test(value))
      return `${fieldName} phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt`;

    return null;
  };

  const handleSubmitForm = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    if (!e.currentTarget) return;

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = {
      username: formData.username as string,
      old_password: formData.old_password as string,
      new_password: formData.new_password as string,
    };

    const errors: Record<string, string> = {};

    // Validate username
    if (!data.username) {
      errors.username = "Tên đăng nhập không được để trống";
    } else if (!regexUsername.test(data.username)) {
      errors.username =
        "Tên đăng nhập phải có ít nhất 6 ký tự, chỉ chứa chữ cái và số";
    }

    // Validate mật khẩu
    const oldPasswordError = validatePassword(data.old_password, "Mật khẩu cũ");

    if (oldPasswordError) {
      errors.old_password = oldPasswordError;
    }

    const newPasswordError = validatePassword(
      data.new_password,
      "Mật khẩu mới",
    );

    if (newPasswordError) {
      errors.new_password = newPasswordError;
    }

    if (Object.keys(errors).length > 0) {
      setIsError(errors);

      return;
    }

    console.log("Submit form:", data);
  };

  return (
    <>
      <Modal
        backdrop="blur"
        classNames={{
          header: "border-b-[1px] border-[#292f46]",
          body: "mt-5",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thay đổi mật khẩu
              </ModalHeader>

              <ModalBody>
                <Form
                  className="space-y-5 mb-5"
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

                  <PasswordInput
                    isRequired
                    label="Mật khẩu cũ"
                    name="old_password"
                    size="md"
                    type="password"
                  />

                  <PasswordInput
                    isRequired
                    label="Mật khẩu mới"
                    name="new_password"
                    size="md"
                    type="password"
                  />

                  <div className="w-full flex justify-end gap-5 mt-5">
                    <Button
                      fullWidth
                      color="danger"
                      size="lg"
                      onPress={onClose}
                    >
                      Hủy
                    </Button>

                    <Button fullWidth color="primary" size="lg" type="submit">
                      Đổi mật khẩu
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
