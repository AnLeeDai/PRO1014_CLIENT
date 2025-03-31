"use client";

import {
  Smartphone,
  TabletSmartphone,
  Laptop,
  Headphones,
  Search,
} from "lucide-react";
import { useDisclosure, Input } from "@heroui/react";

import ModalDetailProduct from "../../components/modal-detail-product";
import Banner from "../../components/banner";

import { siteConfig } from "@/config/site";
import ProductLayout from "@/app/(product)/layout";
import Section from "@/components/section";
import { products } from "@/constants/mockdata-product";
import ProductGrid from "@/components/product-grid";

export default function HomeContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ModalDetailProduct
        isOpen={isOpen}
        productId={1}
        onOpenChange={onOpenChange}
      />

      <ProductLayout>
        <div className="max-w-4xl mx-auto py-4 px-4">
          <Input
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
            <ProductGrid data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={TabletSmartphone}
            moreHref={siteConfig.routes.tablet}
            title="Máy tính bảng"
          >
            <ProductGrid data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={Laptop}
            moreHref={siteConfig.routes.laptop}
            title="Laptop"
          >
            <ProductGrid data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={Headphones}
            moreHref={siteConfig.routes.accessories}
            title="Phụ kiện"
          >
            <ProductGrid data={products} onOpenModal={onOpen} />
          </Section>
        </main>
      </ProductLayout>
    </>
  );
}
