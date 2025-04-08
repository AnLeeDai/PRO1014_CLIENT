"use client";

import {
  addToast,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";

import { useUserInfo } from "@/hooks/useUserInfo";
import { useUpdateAvatarUser } from "@/hooks/useUpdateAvatarUser";

export default function ChangeAvatar() {
  const { data, refetch } = useUserInfo();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useUpdateAvatarUser({
    onSuccess: (res) => {
      addToast({
        title: "Thành công",
        description: res.message,
        color: "success",
      });

      refetch();
      setFile(null);
      setPreview(null);
    },

    onError: (err) => {
      addToast({
        title: "Lỗi",
        description: err.message,
        color: "danger",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setPreview(URL.createObjectURL(selected));
    setFile(selected);
  };

  const handleUpload = () => {
    if (file) {
      mutate({ avatar: file });
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg font-bold">Ảnh đại diện</h1>
      </CardHeader>

      <CardBody className="flex flex-col items-center gap-4">
        <Avatar
          alt="Avatar"
          className="w-44 h-44"
          src={
            preview ||
            data?.user.avatar_url ||
            "https://avatars.githubusercontent.com/u/12345678?v=4"
          }
        />

        <p className="text-sm text-center">
          Kích thước đề xuất: 176 x 176 pixel
        </p>

        <Input
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />

        <div className="mt-auto pt-8 grid gap-4 lg:grid-cols-2 w-full">
          <Button
            color="default"
            disabled={isPending}
            size="lg"
            startContent={<ImagePlus />}
            onPress={() => fileInputRef.current?.click()}
          >
            Chọn ảnh từ thiết bị
          </Button>

          <Button
            color="primary"
            isDisabled={!file}
            isLoading={isPending}
            size="lg"
            startContent={<Upload />}
            onPress={handleUpload}
          >
            Cập nhật ảnh đại diện
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
