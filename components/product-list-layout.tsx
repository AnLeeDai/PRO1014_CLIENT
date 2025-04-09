"use client";

import { useState, useMemo, useEffect, ReactNode } from "react";
import { Input, Select, SelectItem, Pagination } from "@heroui/react";

import ProductGrid from "@/components/product-grid";

const PRODUCTS_PER_PAGE = 6;

interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  brand: string;
}

interface ProductListLayoutProps {
  data: Product[];
  brands: string[];
  priceOptions: { label: string; value: string }[];
  children?: ReactNode;
  onPress?: () => void;
}

export default function ProductListLayout({
  data,
  brands,
  priceOptions,
  onPress,
}: ProductListLayoutProps) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [search, brand, priceRange, page]);

  const filtered = useMemo(() => {
    return data
      .filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
      .filter((p) => (brand ? p.brand === brand : true))
      .filter((p) => {
        switch (priceRange) {
          case "under-10":
            return p.price < 10_000_000;
          case "10-20":
            return p.price >= 10_000_000 && p.price <= 20_000_000;
          case "over-20":
            return p.price > 20_000_000;
          default:
            return true;
        }
      });
  }, [search, brand, priceRange, data]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  const displayData = paginated.map((p) => ({
    id: p.id,
    title: p.name,
    image: p.image,
    price: `${p.price.toLocaleString("vi-VN")}₫`,
  }));

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Hãng"
          placeholder="Chọn hãng"
          selectedKeys={brand ? [brand] : []}
          onChange={(e) => {
            setBrand(e.target.value || null);
            setPage(1);
          }}
        >
          {brands.map((b) => (
            <SelectItem key={b} textValue={b}>
              {b}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Tìm kiếm"
          placeholder="Nhập tên sản phẩm..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <Select
          label="Mức giá"
          selectedKeys={[priceRange]}
          onChange={(e) => {
            setPriceRange(e.target.value);
            setPage(1);
          }}
        >
          {priceOptions.map((p) => (
            <SelectItem key={p.value}>{p.label}</SelectItem>
          ))}
        </Select>
      </div>

      {filtered.length === 0 && !loading ? (
        <div className="text-center py-10 text-lg font-medium">
          Không có sản phẩm nào phù hợp
        </div>
      ) : (
        <ProductGrid
          data={displayData}
          isLoading={loading}
          onOpenModal={onPress}
        />
      )}

      {!loading && filtered.length > 0 && (
        <div className="flex justify-center pt-4">
          <Pagination
            showControls
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
