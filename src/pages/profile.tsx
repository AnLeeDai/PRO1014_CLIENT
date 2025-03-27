import {
  Avatar,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";

export default function ProfilePage() {
  return (
    <DefaultLayout>
      <div className="space-y-8">
        {/* Tiêu đề + nút quay lại */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            className="cursor-pointer"
            color="foreground"
            href={siteConfig.route.home}
          >
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-6 h-6 mr-1" />

              <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cột trái: Ảnh đại diện */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Ảnh đại diện</h2>
            </CardHeader>

            <CardBody>
              <div className="flex items-center justify-center gap-6">
                <Avatar
                  className="w-44 h-44 text-large"
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />
              </div>

              <p className="text-sm text-muted-foreground mt-2 text-center">
                Thêm ảnh đại diện. Kích thước đề xuất là 176×176px
              </p>
            </CardBody>

            <CardFooter>
              <div className="w-full flex flex-col lg:flex-row gap-5 items-center">
                <Button fullWidth color="danger">
                  Xoá ảnh
                </Button>

                <Button fullWidth color="primary">
                  Thay đổi ảnh
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Cột phải: Thông tin cá nhân */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Thông tin cá nhân</h2>
            </CardHeader>

            <CardBody className="space-y-4">
              <Input defaultValue="Jubéo" label="Tên" />
              <Input defaultValue="Hernandez" label="Họ" />
              <Input
                defaultValue="jubeo.hernandez@scoppe.fr"
                label="Địa chỉ email"
              />
              <Input defaultValue="07 82 26 62 62" label="Số điện thoại" />
            </CardBody>

            <CardFooter>
              <Button className="w-full" color="primary">
                Cập nhật
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
