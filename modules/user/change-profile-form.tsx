"use client";

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  useDisclosure,
  Skeleton,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Save, Lock } from "lucide-react";

import ModalChangePassword from "./modal-change-password";

import { regexEmail, regexPhone } from "@/helpers/regex";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUpdateInfoUser } from "@/hooks/useUpdateInfoUser";

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
}

export default function ChangeProfileForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isPending: isPendingUserInfo, refetch } = useUserInfo();

  const { control, handleSubmit, setError, reset } = useForm<FormData>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  const { mutate, isPending } = useUpdateInfoUser({
    onSuccess: () => {
      addToast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân đã được cập nhật",
        color: "success",
      });
      refetch();
    },
    onError: (error) => {
      addToast({
        title: "Đã xảy ra sự cố",
        description: error.message,
        color: "danger",
      });
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        full_name: data.data.full_name || "",
        email: data.data.email || "",
        phone_number: data.data.phone_number || "",
        address: data.data.address || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: FormData) => {
    let hasError = false;

    if (formData.email && !regexEmail.test(formData.email)) {
      setError("email", { message: "Email không hợp lệ" });
      hasError = true;
    }

    if (formData.phone_number && !regexPhone.test(formData.phone_number)) {
      setError("phone_number", { message: "Số điện thoại không hợp lệ" });
      hasError = true;
    }

    if (hasError) return;

    mutate(formData);
  };

  return (
    <>
      <ModalChangePassword isOpen={isOpen} onOpenChange={onOpenChange} />

      <Card>
        <CardHeader>
          <h1 className="text-lg font-bold">Thông tin cá nhân</h1>
        </CardHeader>

        <CardBody className="flex-1 flex flex-col">
          {isPendingUserInfo ? (
            <div className="flex flex-col gap-5 w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
              <div className="grid gap-4 lg:grid-cols-2 w-full mt-8">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          ) : (
            <Form
              className="flex flex-col h-full w-full"
              validationBehavior="aria"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5 w-full">
                <Input
                  isDisabled
                  label="Tên đăng nhập"
                  name="username"
                  value={data?.data.username}
                />

                <Controller
                  control={control}
                  name="full_name"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Họ và tên"
                      validationBehavior="aria"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Email"
                      validationBehavior="aria"
                    />
                  )}
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
              </div>

              <div className="mt-auto pt-8 grid gap-4 lg:grid-cols-2 w-full">
                <Button
                  fullWidth
                  color="default"
                  size="lg"
                  startContent={<Lock />}
                  onPress={onOpen}
                >
                  Đổi mật khẩu
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  isLoading={isPending}
                  size="lg"
                  startContent={<Save />}
                  type="submit"
                >
                  Thay đổi thông tin
                </Button>
              </div>
            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
}
