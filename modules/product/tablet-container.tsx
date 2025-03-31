"use client";

import { useDisclosure } from "@heroui/react";

import ModalDetailProduct from "@/components/modal-detail-product";
import ProductListLayout from "@/components/product-list-layout";
import { tablets } from "@/constants/mockdata-tablet";

const BRANDS = ["Apple", "Samsung", "Xiaomi"];
const PRICES = [
  { label: "Tất cả", value: "all" },
  { label: "Dưới 10 triệu", value: "under-10" },
  { label: "10-20 triệu", value: "10-20" },
  { label: "Trên 20 triệu", value: "over-20" },
];

export default function TabletContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ModalDetailProduct
        isOpen={isOpen}
        productId={1}
        onOpenChange={onOpenChange}
      />

      <ProductListLayout
        brands={BRANDS}
        data={tablets}
        priceOptions={PRICES}
        onPress={onOpen}
      />
    </>
  );
}
