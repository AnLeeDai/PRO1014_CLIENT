/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

import ProductGrid from "@/components/product-grid";

/* ---------- mock data & helpers ---------- */
interface Product {
  id: number;
  product_name: string;
  thumbnail: string;
  price: string;
}

/* mock 8 sản phẩm (chỉ để demo UI) */
const MOCK_PRODUCTS: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  product_name: `Product ${i + 1}`,
  thumbnail: "https://placehold.co/400x600?text=Product",
  price: "300000",
}));

export default function SearchContainer() {
  /* ---------- UI state ---------- */
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  /* fake “tìm kiếm” để demo UI */
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);

      return;
    }
    setIsLoading(true);
    const id = setTimeout(() => {
      // lọc tạm theo tên; thực tế sẽ call API
      setResults(
        MOCK_PRODUCTS.filter((p) =>
          p.product_name.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );
      setIsLoading(false);
    }, 600); // delay 0.6s tạo cảm giác loading

    return () => clearTimeout(id);
  }, [keyword]);

  return (
    <div>
      {/* ----- Search input ----- */}
      <Input
        className="max-w-full"
        placeholder="Tìm kiếm sản phẩm..."
        size="lg"
        startContent={<Search />}
        value={keyword}
        onValueChange={(v) => setKeyword(v)}
      />

      {/* small spinner khi loading */}
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <Spinner color="primary" size="sm" />
        </div>
      )}

      {/* ----- Result area ----- */}
      <div className="mt-6">
        {/* chưa nhập từ khoá */}
        {keyword.trim() === "" && (
          <p className="text-center text-neutral-500">
            Hãy nhập từ khóa để bắt đầu tìm kiếm.
          </p>
        )}

        {/* không tìm thấy */}
        {!isLoading && keyword.trim() !== "" && results.length === 0 && (
          <p className="text-center text-neutral-500">
            Không tìm thấy sản phẩm nào cho “{keyword}”.
          </p>
        )}

        {/* loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-2">
                  <Skeleton className="rounded-lg">
                    <div className="h-[250px] rounded-lg bg-default-300" />
                  </Skeleton>
                </CardHeader>
                <CardBody className="space-y-2 p-2">
                  <Skeleton className="h-6 w-3/4 rounded-lg bg-default-300" />
                  <Skeleton className="h-6 w-1/2 rounded-lg bg-default-300" />
                  <Skeleton className="h-8 rounded-lg bg-default-300" />
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* kết quả */}
        {!isLoading && results.length > 0 && (
          <ProductGrid data={{ data: results }} />
        )}
      </div>
    </div>
  );
}
