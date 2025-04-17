"use client";

import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

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

type FilterForm = {
  search: string;
  brand: string;
  price: string;
  page: number;
};

export default function PhoneContainer() {
  const { register, watch, setValue } = useForm<FilterForm>({
    defaultValues: {
      search: "",
      brand: "all",
      price: "all",
      page: 1,
    },
  });

  const watchedSearch = watch("search");
  const watchedBrand = watch("brand");
  const watchedPrice = watch("price");
  const watchedPage = watch("page");

  const [debouncedSearch] = useDebounce(watchedSearch, 500);

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  if (watchedPrice === "10000000") {
    maxPrice = 10000000;
  } else if (watchedPrice === "20000000") {
    minPrice = 10000000;
    maxPrice = 20000000;
  } else if (watchedPrice === "30000000") {
    minPrice = 20000000;
  }

  const brand = watchedBrand !== "all" ? watchedBrand : undefined;

  const { data, isLoading, isFetching } = useProduct(
    1,
    debouncedSearch,
    minPrice,
    maxPrice,
    brand,
    watchedPage,
  );

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hãng */}
        <Select
          label="Hãng"
          placeholder="Chọn hãng"
          selectedKeys={new Set([watchedBrand])}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;

            setValue("brand", value);
            setValue("page", 1);
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
          {...register("search")}
          onBlur={() => setValue("page", 1)}
        />

        {/* Giá */}
        <Select
          label="Khoảng giá"
          placeholder="Chọn khoảng giá"
          selectedKeys={new Set([watchedPrice])}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;

            setValue("price", value);
            setValue("page", 1);
          }}
        >
          {priceList.map((price) => (
            <SelectItem key={price.key}>{price.label}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Grid sản phẩm */}
      <ProductGrid
        data={{ data: data?.data || [] }}
        isLoading={isLoading || isFetching}
      />

      {/* Phân trang */}
      <div className="flex justify-center pt-4">
        <Pagination
          showControls
          page={watchedPage}
          total={data?.pagination?.total_pages || 1}
          onChange={(p) => setValue("page", p)}
        />
      </div>
    </div>
  );
}
