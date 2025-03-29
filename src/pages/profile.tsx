import {
  Avatar,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Form,
  Skeleton,
  addToast,
} from "@heroui/react";
import { useRef } from "react";

import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import BackLink from "@/components/back-link";
import useGetUserInfo from "@/hooks/api/useGetUserInfo";
import useUploadAvatar from "@/hooks/api/useUploadAvatar";

export default function ProfilePage() {
  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    refetch,
  } = useGetUserInfo();

  const { mutate: uploadAvatar, isPending } = useUploadAvatar({
    onSuccess: (res) => {
      refetch().then(() => {});

      addToast({
        title: "Thành công",
        description: res.message,
        color: "success",
      });
    },
    onError: (err) => {
      addToast({
        title: "Thất bại",
        description: err.message,
        color: "danger",
      });
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    uploadAvatar(formData);
  };

  return (
    <DefaultLayout>
      <div className="space-y-8">
        {/* Tiêu đề + nút quay lại */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <BackLink href={siteConfig.route.home} label="Quay lại trang trước" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cột trái: Ảnh đại diện */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Ảnh đại diện</h2>
            </CardHeader>

            <CardBody>
              <div className="flex items-center justify-center gap-6">
                {isLoadingUserInfo ? (
                  <Skeleton className="w-44 h-44 rounded-full" />
                ) : (
                  <Avatar
                    className="w-44 h-44 text-large"
                    src={userInfo?.data?.avatar_url}
                  />
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-2 mb-5 text-center">
                Thêm ảnh đại diện. Kích thước đề xuất là 176×176px
              </p>

              <input
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleUploadAvatar}
              />

              <div className="mt-auto w-full">
                <Button
                  fullWidth
                  color="primary"
                  isLoading={isPending}
                  onPress={() => fileInputRef.current?.click()}
                >
                  Thay đổi ảnh
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Cột phải: Thông tin cá nhân */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Thông tin cá nhân</h2>
            </CardHeader>

            <CardBody className="space-y-4">
              {isLoadingUserInfo ? (
                <>
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                </>
              ) : (
                <Form>
                  <Input
                    disabled
                    defaultValue={userInfo?.data?.username}
                    label="Tên tài khoản"
                  />

                  <Input
                    defaultValue={userInfo?.data?.full_name}
                    disabled={isLoadingUserInfo}
                    label="Họ và tên"
                  />

                  <Input
                    defaultValue={userInfo?.data?.email}
                    disabled={isLoadingUserInfo}
                    label="Địa chỉ email"
                  />

                  <Input
                    defaultValue={userInfo?.data?.phone_number}
                    disabled={isLoadingUserInfo}
                    label="Số điện thoại"
                  />

                  <Input
                    defaultValue={userInfo?.data?.address}
                    disabled={isLoadingUserInfo}
                    label="Địa chỉ"
                  />

                  <div className="mt-5 w-full flex flex-col lg:flex-row gap-5 items-center">
                    <Button className="w-full" color="secondary">
                      Đổi mật khẩu
                    </Button>

                    <Button className="w-full" color="primary" type="submit">
                      Cập nhật
                    </Button>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
