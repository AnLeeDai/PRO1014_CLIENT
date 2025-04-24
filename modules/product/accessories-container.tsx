"use client";

import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

import ProductGrid from "@/components/product-grid";
import { useProduct } from "@/hooks/useProduct";
import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";

const brandList = [
  { key: "all", label: "Tất cả hãng" },
  { key: "anker", label: "Anker" },
  { key: "samsung", label: "Samsung" },
  { key: "apple", label: "Apple" },
  { key: "baseus", label: "Baseus" },
];

const priceList = [
  { key: "all", label: "Tất cả giá" },
  { key: "500000", label: "Dưới 500k" },
  { key: "1000000", label: "500k đến 1 triệu" },
  { key: "2000000", label: "Trên 1 triệu" },
];

type FilterForm = {
  search: string;
  brand: string;
  price: string;
  page: number;
};

export default function AccessoriesContainer() {
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

  if (watchedPrice === "500000") {
    maxPrice = 500000;
  } else if (watchedPrice === "1000000") {
    minPrice = 500000;
    maxPrice = 1000000;
  } else if (watchedPrice === "2000000") {
    minPrice = 1000000;
  }

  const brand = watchedBrand !== "all" ? watchedBrand : undefined;

  const { data, isLoading, isFetching } = useProduct(
    4,
    debouncedSearch,
    minPrice,
    maxPrice,
    brand,
    watchedPage,
  );

  return (
    <div className="space-y-6 py-6">
      <div className="mb-7">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <Input
            label="Tìm kiếm"
            placeholder="Nhập tên phụ kiện..."
            {...register("search")}
            onBlur={() => setValue("page", 1)}
          />

          <Select
            label="Hãng"
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

          <Select
            label="Khoảng giá"
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

        <div className="space-y-6">
          <ProductGrid
            data={{
              data: (data?.data || []).filter((item) => item.is_active !== 0),
            }}
            isLoading={isLoading || isFetching}
          />

          <div className="flex justify-center pt-4">
            <Pagination
              showControls
              page={watchedPage}
              total={data?.pagination?.total_pages || 1}
              onChange={(p) => setValue("page", p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
