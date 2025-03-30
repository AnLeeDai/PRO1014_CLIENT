"use client";

import { Smartphone, TabletSmartphone, Laptop, Headphones } from "lucide-react";
import { useDisclosure } from "@heroui/react";

import Banner from "./banner";
import CarouselProductHome from "./carousel-product-home";
import ModalDetailProduct from "./modal-detail-product";

import { siteConfig } from "@/config/site";
import ProductLayout from "@/app/(product)/layout";
import Section from "@/components/section";

const products = [
  {
    id: 1,
    title: "Điện thoại Samsung Galaxy S22",
    image: "https://picsum.photos/seed/samsung/800/600",
    price: "₫18.990.000",
    description: `Samsung Galaxy S22 là flagship cao cấp của Samsung với thiết kế tinh tế, màn hình AMOLED 6.1 inch sắc nét và hiệu năng mạnh mẽ nhờ chip Snapdragon 8 Gen 1. Camera chụp đêm xuất sắc cùng khả năng quay video 8K.`,
    gallery: [
      "https://picsum.photos/seed/samsung1/800/600",
      "https://picsum.photos/seed/samsung2/800/600",
      "https://picsum.photos/seed/samsung3/800/600",
    ],
  },
  {
    id: 2,
    title: "Điện thoại iPhone 14 Pro",
    image: "https://picsum.photos/seed/iphone14/800/600",
    price: "₫28.990.000",
    description: `iPhone 14 Pro nổi bật với Dynamic Island độc đáo, chip A16 Bionic siêu mạnh và camera chính 48MP. Màn hình Super Retina XDR với ProMotion mang lại trải nghiệm mượt mà. Thiết kế khung thép không gỉ sang trọng.`,
    gallery: [
      "https://picsum.photos/seed/iphone1/800/600",
      "https://picsum.photos/seed/iphone2/800/600",
      "https://picsum.photos/seed/iphone3/800/600",
    ],
  },
  {
    id: 3,
    title: "Điện thoại Xiaomi Redmi Note 12",
    image: "https://picsum.photos/seed/redmi12/800/600",
    price: "₫5.790.000",
    description: `Redmi Note 12 sở hữu màn hình AMOLED 120Hz, pin 5000mAh và sạc nhanh 33W. Chip Snapdragon 685 mang lại hiệu năng ổn định, phù hợp học tập, giải trí và làm việc.`,
    gallery: [
      "https://picsum.photos/seed/redmi1/800/600",
      "https://picsum.photos/seed/redmi2/800/600",
    ],
  },
  {
    id: 4,
    title: "Điện thoại OPPO Reno 8",
    image: "https://picsum.photos/seed/opporeno8/800/600",
    price: "₫8.490.000",
    description: `OPPO Reno 8 nổi bật với camera chân dung AI, sạc SUPERVOOC 80W và thiết kế thời trang. Máy chạy mượt với Dimensity 1300, màn hình AMOLED 90Hz và tản nhiệt tốt.`,
    gallery: [
      "https://picsum.photos/seed/oppo1/800/600",
      "https://picsum.photos/seed/oppo2/800/600",
    ],
  },
  {
    id: 5,
    title: "Điện thoại Vivo V25",
    image: "https://picsum.photos/seed/vivo25/800/600",
    price: "₫7.990.000",
    description: `Vivo V25 với thiết kế mặt lưng đổi màu độc đáo, camera selfie 50MP hỗ trợ Eye AF, màn hình AMOLED và pin lớn 4500mAh. Thiết bị phù hợp với người dùng trẻ trung yêu thích nhiếp ảnh.`,
    gallery: [
      "https://picsum.photos/seed/vivo1/800/600",
      "https://picsum.photos/seed/vivo2/800/600",
    ],
  },
  {
    id: 6,
    title: "Điện thoại OnePlus Nord 2",
    image: "https://picsum.photos/seed/oneplusnord2/800/600",
    price: "₫9.490.000",
    description: `OnePlus Nord 2 trang bị chip Dimensity 1200 AI, sạc nhanh 65W và OxygenOS mượt mà. Camera chính Sony IMX766 50MP mang lại khả năng chụp thiếu sáng ấn tượng.`,
    gallery: [
      "https://picsum.photos/seed/oneplus1/800/600",
      "https://picsum.photos/seed/oneplus2/800/600",
    ],
  },
  {
    id: 7,
    title: "Điện thoại Google Pixel 6a",
    image: "https://picsum.photos/seed/pixel6a/800/600",
    price: "₫10.990.000",
    description: `Pixel 6a sử dụng chip Google Tensor, camera AI thông minh và giao diện Android gốc mượt mà. Thiết kế hiện đại, pin trâu và cập nhật phần mềm lâu dài.`,
    gallery: [
      "https://picsum.photos/seed/pixel1/800/600",
      "https://picsum.photos/seed/pixel2/800/600",
    ],
  },
  {
    id: 8,
    title: "Điện thoại Sony Xperia 10 IV",
    image: "https://picsum.photos/seed/sony10iv/800/600",
    price: "₫8.990.000",
    description: `Sony Xperia 10 IV có thiết kế gọn nhẹ, hỗ trợ chống nước IP68, màn hình OLED 21:9 độc đáo. Thời lượng pin bền bỉ, thích hợp cho người dùng yêu cầu độ bền và tính tiện dụng.`,
    gallery: [
      "https://picsum.photos/seed/sony1/800/600",
      "https://picsum.photos/seed/sony2/800/600",
    ],
  },
];

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
        <Banner />

        <main className="space-y-12 mt-8">
          <Section
            icon={Smartphone}
            moreHref={siteConfig.routes.phone}
            title="Điện thoại"
          >
            <CarouselProductHome data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={TabletSmartphone}
            moreHref={siteConfig.routes.tablet}
            title="Máy tính bảng"
          >
            <CarouselProductHome data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={Laptop}
            moreHref={siteConfig.routes.laptop}
            title="Laptop"
          >
            <CarouselProductHome data={products} onOpenModal={onOpen} />
          </Section>

          <Section
            icon={Headphones}
            moreHref={siteConfig.routes.accessories}
            title="Phụ kiện"
          >
            <CarouselProductHome data={products} onOpenModal={onOpen} />
          </Section>
        </main>
      </ProductLayout>
    </>
  );
}
