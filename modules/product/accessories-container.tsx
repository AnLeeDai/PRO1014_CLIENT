"use client";

import { useDisclosure } from "@heroui/react";

import ModalDetailProduct from "@/components/modal-detail-product";
import ProductListLayout from "@/components/product-list-layout";
import { accessories } from "@/constants/mockdata-accessories";

const BRANDS = ["Apple", "Logitech", "Baseus"];
const PRICES = [
  { label: "Tất cả", value: "all" },
  { label: "Dưới 1 triệu", value: "under-10" },
  { label: "1-5 triệu", value: "10-20" },
  { label: "Trên 5 triệu", value: "over-20" },
];

export default function AccessoriesContainer() {
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
        data={accessories}
        priceOptions={PRICES}
        onPress={onOpen}
      />
    </>
  );
}
