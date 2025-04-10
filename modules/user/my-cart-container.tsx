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
import { useState } from "react";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

export default function MyCartContainer() {
  const { data, isLoading, error } = useCart();

  // local state lưu mã giảm giá cho từng cart item
  const [discountCodes, setDiscountCodes] = useState<Record<number, string>>(
    {},
  );

  const handleDiscountCodeChange = (cartItemId: number, code: string) => {
    setDiscountCodes((prev) => ({
      ...prev,
      [cartItemId]: code,
    }));
  };

  const totalPrice = data?.cart_items.reduce(
    (sum, item) => sum + parseFloat(item.final_price) * item.quantity,
    0,
  );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold">Giỏ hàng của tôi</h1>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cột trái */}
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
                  <p className="text-base italic">
                    Tự đến lấy hàng tại cửa hàng sẽ giúp bạn tiết kiệm phí vận
                    chuyển.
                  </p>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

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

        {/* Cột phải */}
        <div className="flex-[1_1_0%] space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="mr-2 text-xl font-semibold">Tóm tắt đơn hàng</h2>
                <Chip color="primary" size="md" variant="flat">
                  {data?.cart_items.length ?? 0}
                </Chip>
              </div>
            </CardHeader>

            <CardBody className="space-y-5 text-base">
              {isLoading && <p>Đang tải giỏ hàng...</p>}
              {error && <p className="text-red-500">{error.message}</p>}

              {data?.cart_items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="rounded-lg border border-zinc-700 p-4 space-y-3 bg-zinc-900"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      alt={item.product_name}
                      className="rounded-lg object-cover"
                      height={100}
                      src={item.thumbnail}
                      width={100}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-base font-semibold">
                            {item.product_name}
                          </p>
                          <p className="text-sm text-zinc-400">
                            Số lượng: x{item.quantity}
                          </p>
                        </div>
                        <div className="text-right text-base font-semibold whitespace-nowrap">
                          {formatVND(
                            parseFloat(item.final_price) * item.quantity,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Input
                      className="w-full"
                      placeholder="Mã giảm giá cho sản phẩm này"
                      size="md"
                      startContent={<TicketPercent />}
                      value={discountCodes[item.cart_item_id] || ""}
                      variant="bordered"
                      onChange={(e) =>
                        handleDiscountCodeChange(
                          item.cart_item_id,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              <Divider className="my-4" />

              <div className="border-t pt-4 space-y-2 text-base">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(totalPrice ?? 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế (10%)</span>
                  <span>{formatVND((totalPrice ?? 0) * 0.1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatVND(30000)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2">
                  <span>Tổng cộng</span>
                  <span>{formatVND((totalPrice ?? 0) * 1.1 + 30000)}</span>
                </div>
              </div>

              <Button
                fullWidth
                className="mt-4 text-base"
                color="primary"
                size="lg"
                startContent={<CreditCard />}
              >
                Thanh toán {formatVND((totalPrice ?? 0) * 1.1 + 30000)}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
