"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Spinner, Pagination } from "@heroui/react";
import { Search } from "lucide-react";

import ProductGrid from "@/components/product-grid";
import { useProduct } from "@/hooks/useProduct";
import { siteConfig } from "@/config/site";
import Forward from "@/components/forward";

interface SearchContainerProps {
  keyword: string;
}

export default function SearchContainer({
  keyword: initialKeyword,
}: SearchContainerProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [page, setPage] = useState(1);

  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useProduct(
    undefined,
    keyword.trim() || undefined,
    undefined,
    undefined,
    undefined,
    page,
  );

  const results = searchData?.data || [];
  const totalPages = searchData?.pagination?.total_pages || 1;

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/search/${encodeURIComponent(keyword.trim())}`);
      setPage(1);
    }
  };

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold">Tìm kiếm sản phẩm</h1>
      </div>

      <Input
        className="max-w-full"
        placeholder="Tìm kiếm sản phẩm..."
        size="lg"
        startContent={<Search />}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        onValueChange={setKeyword}
      />

      {isFetching && (
        <div className="mt-4 flex justify-center">
          <Spinner color="primary" size="sm" />
        </div>
      )}

      <div className="mt-6 space-y-6">
        {keyword.trim() === "" && (
          <p className="text-center text-neutral-500">
            Hãy nhập từ khóa để bắt đầu tìm kiếm.
          </p>
        )}

        {keyword.trim() !== "" && !isLoading && results.length === 0 && (
          <p className="text-center text-neutral-500">
            Không tìm thấy sản phẩm nào cho “{keyword}”.
          </p>
        )}

        {keyword.trim() !== "" && results.length > 0 && (
          <>
            <ProductGrid data={{ data: results }} isLoading={false} />
            <div className="flex justify-center pt-4">
              <Pagination
                showControls
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
