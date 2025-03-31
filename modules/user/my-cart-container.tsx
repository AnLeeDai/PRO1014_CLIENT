"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Image,
  Tab,
  Tabs,
  Chip,
  Divider,
} from "@heroui/react";
import { CreditCard, TicketPercent } from "lucide-react";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

export default function MyCartContainer() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold">Giỏ hàng của tôi</h1>
      </div>

      {/* Sử dụng flex thay vì grid */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cột trái chiếm 2 phần */}
        <div className="flex-[2_1_0%] space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Phương thức giao hàng</h2>
            </CardHeader>
            <CardBody>
              <Tabs aria-label="Phương thức giao hàng" variant="bordered">
                <Tab key="delivery" title="Giao hàng">
                  <Input
                    className="mb-4"
                    placeholder="Địa chỉ giao hàng của bạn"
                    size="lg"
                  />

                  <div className="space-y-4 text-base">
                    <Chip color="success" variant="faded">
                      📍 Dùng vị trí hiện tại của bạn
                    </Chip>

                    {[
                      "12 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
                      "45 Lê Duẩn, Quận Hải Châu, Đà Nẵng",
                      "89 Kim Mã, Quận Ba Đình, Hà Nội",
                    ].map((address, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span>🔹</span>
                        <p>{address}</p>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="pickup" title="Tự đến lấy">
                  <p className="text-base text-gray-500 italic">
                    Tự đến lấy hàng tại cửa hàng sẽ giúp bạn tiết kiệm phí vận
                    chuyển.
                  </p>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          {/* Thông tin cá nhân */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
            </CardHeader>
            <CardBody className="space-y-2 text-base">
              <div>👤 Lê Đại An</div>
              <div>📧 ledaian22@gmail.com</div>
              <div>📞 +84 0334920373</div>
            </CardBody>
          </Card>
        </div>

        {/* Cột phải chiếm 1 phần */}
        <div className="flex-[1_1_0%] space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="mr-2 text-xl font-semibold">Tóm tắt đơn hàng</h2>
                <Chip color="primary" size="md" variant="flat">
                  2
                </Chip>
              </div>
            </CardHeader>

            <CardBody className="space-y-5 text-base">
              {[1, 2].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <Image
                    alt="product"
                    className="rounded"
                    src="https://i.imgur.com/2nCt3Sbl.png"
                    width={80}
                  />
                  <div>
                    <p className="font-semibold">iPhone 15 Pro Max - 256GB</p>
                    <p>Số lượng: x1</p>
                    <p>Màu: Titan Xám</p>
                  </div>
                  <div className="ml-auto font-semibold">
                    {formatVND(28000000)}
                  </div>
                </div>
              ))}

              <Divider className="my-4" />

              <Input
                label="Mã giảm giá (voucher)"
                placeholder="Nhập mã giảm giá"
                size="lg"
                startContent={<TicketPercent size={18} />}
              />

              <div className="border-t pt-4 space-y-2 text-base">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(56000000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế (10%)</span>
                  <span>{formatVND(5600000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatVND(30000)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2">
                  <span>Tổng cộng</span>
                  <span>{formatVND(61630000)}</span>
                </div>
              </div>

              <Button
                fullWidth
                className="mt-4 text-base"
                color="primary"
                size="lg"
                startContent={<CreditCard size={18} />}
              >
                Thanh toán {formatVND(61630000)}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
