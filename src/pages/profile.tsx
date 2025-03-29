import {
  Avatar,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Form,
  Skeleton,
} from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import BackLink from "@/components/back-link";
import useGetUserInfo from "@/hooks/api/useGetUserInfo";

export default function ProfilePage() {
  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo();

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

              <p className="text-sm text-muted-foreground mt-2 text-center">
                Thêm ảnh đại diện. Kích thước đề xuất là 176×176px
              </p>

              <div className="mt-auto w-full flex flex-col lg:flex-row gap-5 items-center">
                <Button fullWidth color="danger">
                  Xoá ảnh
                </Button>

                <Button fullWidth color="primary" type="submit">
                  Thay đổi ảnh
                </Button>
              </div>
            </CardBody>
          </Card>

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
