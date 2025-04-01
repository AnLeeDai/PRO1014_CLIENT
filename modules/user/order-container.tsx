"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Image,
  Divider,
  Pagination,
} from "@heroui/react";
import { Truck, CheckCircle } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import Forward from "@/components/forward";
import { orders } from "@/constants/mockdata-order";

const ORDERS_PER_PAGE = 3;

export default function OrderContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const currentOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE,
  );

  return (
    <div className="space-y-6">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold mb-4">Lịch sử mua hàng</h1>
      </div>

      {currentOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">Mã đơn hàng: {order.id}</h2>
              <p className="text-sm">Ngày mua: {order.date}</p>
            </div>

            <Chip
              color={order.status === "Đã giao" ? "success" : "warning"}
              startContent={
                order.status === "Đã giao" ? (
                  <CheckCircle size={16} />
                ) : (
                  <Truck size={16} />
                )
              }
            >
              {order.status}
            </Chip>
          </CardHeader>

          <CardBody className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Image
                  alt={item.name}
                  className="rounded"
                  src={item.image}
                  width={70}
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p>
                    Màu: {item.color} | Số lượng: x{item.quantity}
                  </p>
                </div>
                <p className="font-semibold">{formatVND(item.price)}</p>
              </div>
            ))}

            <Divider className="my-2" />

            <div className="flex justify-between items-center">
              <p className="font-semibold text-base">Tổng cộng</p>
              <p className="font-bold text-lg">{formatVND(order.total)}</p>
            </div>
          </CardBody>
        </Card>
      ))}

      <div className="flex justify-center pt-4">
        <Pagination
          showControls
          initialPage={1}
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
