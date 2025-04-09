"use client";

import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

import ProductGrid from "@/components/product-grid";
import { useProduct } from "@/hooks/useProduct";

const brandList = [
  { key: "all", label: "Tất cả hãng" },
  { key: "samsung", label: "Samsung" },
  { key: "apple", label: "Apple" },
  { key: "opple", label: "Opple" },
];

const priceList = [
  { key: "all", label: "Tất cả giá" },
  { key: "10000000", label: "Dưới 10 triệu" },
  { key: "20000000", label: "10 triệu đến 20 triệu" },
  { key: "30000000", label: "Trên 20 triệu" },
];

export default function PhoneContainer() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<string | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [priceSelectedKey, setPriceSelectedKey] = useState<
    string | undefined
  >();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isFetching } = useProduct(
    7,
    search,
    minPrice,
    maxPrice,
    brand,
    page,
  );

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hãng */}
        <Select
          label="Hãng"
          placeholder="Chọn hãng"
          selectedKeys={brand ? new Set([brand]) : new Set(["all"])}
          onSelectionChange={(keySet) => {
            const selected = Array.from(keySet)[0] as string;

            if (selected === "all") {
              setBrand(undefined);
            } else {
              setBrand(selected);
            }
            setPage(1);
          }}
        >
          {brandList.map((brand) => (
            <SelectItem key={brand.key}>{brand.label}</SelectItem>
          ))}
        </Select>

        {/* Tìm kiếm */}
        <Input
          label="Tìm kiếm"
          placeholder="Nhập tên sản phẩm..."
          value={search}
          onBlur={() => setPage(1)}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Khoảng giá */}
        <Select
          label="Khoảng giá"
          placeholder="Chọn khoảng giá"
          selectedKeys={
            priceSelectedKey ? new Set([priceSelectedKey]) : new Set(["all"])
          }
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys as Set<React.Key>)[0] as string;

            setPriceSelectedKey(selectedKey);

            if (selectedKey === "all") {
              setMinPrice(undefined);
              setMaxPrice(undefined);
            } else if (selectedKey === "10000000") {
              setMinPrice(undefined);
              setMaxPrice(10000000);
            } else if (selectedKey === "20000000") {
              setMinPrice(10000000);
              setMaxPrice(20000000);
            } else if (selectedKey === "30000000") {
              setMinPrice(20000000);
              setMaxPrice(undefined);
            }

            setPage(1);
          }}
        >
          {priceList.map((price) => (
            <SelectItem key={price.key}>{price.label}</SelectItem>
          ))}
        </Select>
      </div>

      <ProductGrid
        data={{ data: data?.data || [] }}
        isLoading={isLoading || isFetching}
      />

      <div className="flex justify-center pt-4">
        <Pagination
          showControls
          page={page}
          total={data?.pagination?.total_pages || 1}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
