"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Image,
  Divider,
  Skeleton,
} from "@heroui/react";
import { Truck, CheckCircle, XCircle, Clock } from "lucide-react";

import { siteConfig } from "@/config/site";
import Forward from "@/components/forward";
import { useOrderHistory } from "@/hooks/useOrderHistory";

export default function OrderContainer() {
  const { data, isLoading } = useOrderHistory();

  const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);

  const getStatusChip = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Chip color="warning" startContent={<Clock size={16} />}>
            Đang chờ xử lý
          </Chip>
        );
      case "delivered":
        return (
          <Chip color="primary" startContent={<Truck size={16} />}>
            Đã giao hàng
          </Chip>
        );
      case "completed":
        return (
          <Chip color="success" startContent={<CheckCircle size={16} />}>
            Hoàn thành
          </Chip>
        );
      case "cancelled":
        return (
          <Chip color="danger" startContent={<XCircle size={16} />}>
            Đã hủy
          </Chip>
        );
      default:
        return (
          <Chip color="default" startContent={<Clock size={16} />}>
            Không xác định
          </Chip>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex justify-between items-center">
              <div>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardBody className="space-y-4">
              {[...Array(2)].map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-4">
                  <Skeleton className="h-20 w-20 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}

              <Divider className="my-2" />

              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (data?.orders.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Bạn chưa có đơn hàng nào
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold mb-4">Lịch sử mua hàng</h1>
      </div>

      {data?.orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">Mã đơn hàng: {order.id}</h2>
              <p className="text-sm">Ngày mua: {order.created_at}</p>
            </div>

            {getStatusChip(order.status)}
          </CardHeader>

          <CardBody className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <Image
                  alt={item.product_name}
                  className="rounded"
                  src={item.thumbnail}
                  width={100}
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.product_name}</p>
                  <p>Số lượng: x{item.quantity}</p>
                </div>
                <p className="font-semibold">
                  {formatVND(parseInt(item.price))}
                </p>
              </div>
            ))}

            <Divider className="my-2" />

            <div className="flex justify-between items-center">
              <p className="font-semibold text-base">Tổng cộng</p>
              <p className="font-bold text-lg">
                {formatVND(parseInt(order.total_price))}
              </p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
