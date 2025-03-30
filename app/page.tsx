import { Metadata } from "next";
import { Smartphone, TabletSmartphone, Laptop, Headphones } from "lucide-react";

import ProductLayout from "./(product)/layout";

import Banner from "@/modules/home/banner";
import CarouselProductHome from "@/modules/home/carousel-product-home";
import Section from "@/components/section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Trang chủ",
    template: `%s - Trang chủ`,
  },
};

const products = [
  {
    id: 1,
    title: "Điện thoại Samsung Galaxy S22",
    image: "https://picsum.photos/seed/samsung/800/600",
    price: "₫18.990.000",
  },
  {
    id: 2,
    title: "Điện thoại iPhone 14 Pro",
    image: "https://picsum.photos/seed/iphone14/800/600",
    price: "₫28.990.000",
  },
  {
    id: 3,
    title: "Điện thoại Xiaomi Redmi Note 12",
    image: "https://picsum.photos/seed/redmi12/800/600",
    price: "₫5.790.000",
  },
  {
    id: 4,
    title: "Điện thoại OPPO Reno 8",
    image: "https://picsum.photos/seed/opporeno8/800/600",
    price: "₫8.490.000",
  },
  {
    id: 5,
    title: "Điện thoại Vivo V25",
    image: "https://picsum.photos/seed/vivo25/800/600",
    price: "₫7.990.000",
  },
  {
    id: 6,
    title: "Điện thoại OnePlus Nord 2",
    image: "https://picsum.photos/seed/oneplusnord2/800/600",
    price: "₫9.490.000",
  },
  {
    id: 7,
    title: "Điện thoại Google Pixel 6a",
    image: "https://picsum.photos/seed/pixel6a/800/600",
    price: "₫10.990.000",
  },
  {
    id: 8,
    title: "Điện thoại Sony Xperia 10 IV",
    image: "https://picsum.photos/seed/sony10iv/800/600",
    price: "₫8.990.000",
  },
];

<CarouselProductHome data={products} itemsPerView={4} />;

export default function HomePage() {
  return (
    <ProductLayout>
      <Banner />

      <main className="space-y-12 mt-8">
        <Section
          icon={Smartphone}
          moreHref={siteConfig.routes.phone}
          title="Điện thoại"
        >
          <CarouselProductHome data={products} />
        </Section>

        <Section
          icon={TabletSmartphone}
          moreHref={siteConfig.routes.tablet}
          title="Máy tính bảng"
        >
          <CarouselProductHome data={products} />
        </Section>

        <Section
          icon={Laptop}
          moreHref={siteConfig.routes.laptop}
          title="Laptop"
        >
          <CarouselProductHome data={products} />
        </Section>

        <Section
          icon={Headphones}
          moreHref={siteConfig.routes.accessories}
          title="Phụ kiện"
        >
          <CarouselProductHome data={products} />
        </Section>
      </main>
    </ProductLayout>
  );
}
