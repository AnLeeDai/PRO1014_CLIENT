"use client";

import {
  Smartphone,
  TabletSmartphone,
  Laptop,
  Headphones,
  Search,
} from "lucide-react";
import { Input } from "@heroui/react";

import Banner from "../../components/banner";

import { siteConfig } from "@/config/site";
import ProductLayout from "@/app/(product)/layout";
import Section from "@/components/section";
import ProductGrid from "@/components/product-grid";
import { useProduct } from "@/hooks/useProduct";

export default function HomeContainer() {
  const { data: phoneData, isLoading: phoneLoading } = useProduct(7);
  const { data: tabletData, isLoading: tabletLoading } = useProduct(8);
  const { data: laptopData, isLoading: laptopLoading } = useProduct(9);
  const { data: accessoriesData, isLoading: accessoriesLoading } =
    useProduct(10);

  return (
    <>
      <ProductLayout>
        <div className="max-w-4xl mx-auto py-4 px-4">
          <Input
            disabled
            className="max-w-full"
            placeholder="Tìm kiếm sản phẩm..."
            size="lg"
            startContent={<Search />}
          />
        </div>

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
    </>
  );
}
