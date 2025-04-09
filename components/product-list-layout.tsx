import { ReactNode } from "react";
import { Input, Pagination, Select, SelectItem } from "@heroui/react";

import ProductGrid from "./product-grid";

interface ProductListLayoutProps {
  data: any;
  children?: ReactNode;
  isLoading?: boolean;
}

export default function ProductListLayout({
  data,
  isLoading,
}: ProductListLayoutProps) {
  const brandList = [
    { key: "Samsung", label: "Samsung" },
    { key: "Apple", label: "Apple" },
    { key: "Opple", label: "Opple" },
  ];

  const priceList = [
    { key: "10000000", label: "Dưới 10 triệu" },
    { key: "20000000", label: "10 triệu đến 20 triệu" },
    { key: "30000000", label: "Trên 20 triệu" },
  ];

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select label="Hãng" placeholder="Chọn hãng">
          {brandList.map((brand) => (
            <SelectItem key={brand.key}>{brand.label}</SelectItem>
          ))}
        </Select>

        <Input label="Tìm kiếm" placeholder="Nhập tên sản phẩm..." />

        <Select label="Khoảng giá" placeholder="Chọn khoảng giá">
          {priceList.map((price) => (
            <SelectItem key={price.key}>{price.label}</SelectItem>
          ))}
        </Select>
      </div>

      <ProductGrid data={{ data: data?.data }} isLoading={isLoading} />

      <div className="flex justify-center pt-4">
        <Pagination showControls page={1} total={10} />
      </div>
    </div>
  );
}
