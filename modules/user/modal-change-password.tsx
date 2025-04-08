"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  addToast,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { X, KeyRound } from "lucide-react";
import Cookies from "js-cookie";

import PasswordInput from "@/components/password-input";
import { regexPassword } from "@/helpers/regex";
import { useChangePasswordUser } from "@/hooks/useChangePasswordUser";
import { siteConfig } from "@/config/site";

interface IModalChangePasswordProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface ChangePasswordFormData {
  old_password: string;
  new_password: string;
  password_confirm: string;
}

export default function ModalChangePassword({
  isOpen,
  onOpenChange,
}: IModalChangePasswordProps) {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<ChangePasswordFormData>({
    defaultValues: {
      old_password: "",
      new_password: "",
      password_confirm: "",
    },
  });

  const { mutate, isPending } = useChangePasswordUser({
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("expires_in");
      Cookies.remove("isLogin");
      Cookies.remove("user_id");

      addToast({
        title: "Đổi mật khẩu thành công",
        description: "Vui lòng đăng nhập lại để tiếp tục",
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

      addToast({
        title: "Đã xảy ra sự cố",
        description: Object.values(error.errors || {}).join("\n"),
        color: "danger",
      });
    },
  });

  const validatePassword = (value: string, fieldName = "Mật khẩu") => {
    if (!value) return `${fieldName} không được để trống`;
    if (!regexPassword.test(value))
      return `${fieldName} phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt`;

    return null;
  };

  const onSubmit = (data: ChangePasswordFormData) => {
    let hasError = false;

    const oldPassErr = validatePassword(data.old_password, "Mật khẩu cũ");

    if (oldPassErr) {
      setError("old_password", { message: oldPassErr });
      hasError = true;
    }

    const newPassErr = validatePassword(data.new_password, "Mật khẩu mới");

    if (newPassErr) {
      setError("new_password", { message: newPassErr });
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  control={control}
                  name="old_password"
                  render={({ field, fieldState }) => (
                    <PasswordInput
                      {...field}
                      isRequired
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Mật khẩu cũ"
                      size="md"
                      validationBehavior="aria"
                    />
                  )}
                  rules={{ required: "Mật khẩu cũ không được để trống" }}
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
                      size="md"
                      validationBehavior="aria"
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
                      label="Xác nhận mật khẩu mới"
                      size="md"
                      validationBehavior="aria"
                    />
                  )}
                  rules={{
                    required: "Vui lòng xác nhận lại mật khẩu mới",
                  }}
                />

                <div className="w-full flex justify-end gap-5 mt-5">
                  <Button
                    fullWidth
                    color="danger"
                    size="lg"
                    startContent={<X />}
                    onPress={onClose}
                  >
                    Hủy
                  </Button>

                  <Button
                    fullWidth
                    color="primary"
                    isLoading={isPending}
                    size="lg"
                    startContent={<KeyRound />}
                    type="submit"
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
