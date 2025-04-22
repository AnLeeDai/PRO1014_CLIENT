"use client";

import {
  Smartphone,
  TabletSmartphone,
  Laptop,
  Headphones,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { useState } from "react";

import Banner from "../../components/banner";

import { siteConfig } from "@/config/site";
import ProductLayout from "@/app/(product)/layout";
import Section from "@/components/section";
import ProductGrid from "@/components/product-grid";
import { useProduct } from "@/hooks/useProduct";

export default function HomeContainer() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const { data: phoneData, isLoading: phoneLoading } = useProduct(1);
  const { data: tabletData, isLoading: tabletLoading } = useProduct(2);
  const { data: laptopData, isLoading: laptopLoading } = useProduct(3);
  const { data: accessoriesData, isLoading: accessoriesLoading } =
    useProduct(4);

  const handlerSearch = () => {
    if (keyword.trim()) {
      router.push(`/search/${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <ProductLayout>
      <Input
        className="max-w-full mb-4"
        placeholder="Tìm kiếm sản phẩm..."
        size="lg"
        startContent={<Search />}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") handlerSearch();
        }}
        onValueChange={setKeyword}
      />

      <Banner />

      <main className="space-y-12 mt-8">
        <Section
          icon={Smartphone}
          moreHref={siteConfig.routes.phone}
          title="Điện thoại"
        >
          <ProductGrid
            data={{ data: phoneData?.data || [] }}
            isLoading={phoneLoading}
          />
        </Section>

        <Section
          icon={TabletSmartphone}
          moreHref={siteConfig.routes.tablet}
          title="Máy tính bảng"
        >
          <ProductGrid
            data={{ data: tabletData?.data || [] }}
            isLoading={tabletLoading}
          />
        </Section>

        <Section
          icon={Laptop}
          moreHref={siteConfig.routes.laptop}
          title="Laptop"
        >
          <ProductGrid
            data={{ data: laptopData?.data || [] }}
            isLoading={laptopLoading}
          />
        </Section>

        <Section
          icon={Headphones}
          moreHref={siteConfig.routes.accessories}
          title="Phụ kiện"
        >
          <ProductGrid
            data={{ data: accessoriesData?.data || [] }}
            isLoading={accessoriesLoading}
          />
        </Section>
      </main>
    </ProductLayout>
  );
}
