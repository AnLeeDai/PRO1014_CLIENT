import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Button,
  Chip,
  Accordion,
  AccordionItem,
  Tooltip,
  Spacer,
} from "@heroui/react";
import { useState } from "react";
import { BaggageClaim, ShoppingCart } from "lucide-react";

// Dữ liệu sản phẩm giả lập
const products: Product[] = [
  {
    id: 1,
    title: "Điện thoại Samsung Galaxy S22",
    image: "https://picsum.photos/seed/samsung/800/600",
    price: "₫18.990.000",
    description:
      "Samsung Galaxy S22 là flagship cao cấp của Samsung với thiết kế tinh tế, màn hình AMOLED 6.1 inch sắc nét và hiệu năng mạnh mẽ nhờ chip Snapdragon 8 Gen 1. Camera chụp đêm xuất sắc cùng khả năng quay video 8K.",
    gallery: [
      "https://picsum.photos/seed/samsung1/800/600",
      "https://picsum.photos/seed/samsung2/800/600",
      "https://picsum.photos/seed/samsung3/800/600",
    ],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Đen", "Trắng", "Xanh", "Tím"],
  },
];

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  description: string;
  gallery: string[];
  storageOptions?: string[];
  colorOptions?: string[];
}

interface IModalDetailProductProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: number;
}

export default function ModalDetailProduct({
  isOpen,
  onOpenChange,
  productId,
}: IModalDetailProductProps) {
  const data = products.find((p) => p.id === productId);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!data) return null;

  return (
    <Modal
      backdrop="blur"
      classNames={{
        header: "border-b-[1px] border-[#292f46]",
        body: "mt-5 pb-5",
        footer: "w-full",
      }}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-semibold">
              {data.title}
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Ảnh chính */}
                <Image alt={data.title} height={430} src={data.image} />

                {/* Thông tin */}
                <div className="space-y-4">
                  <p className="font-bold text-xl">{data.price}</p>
                  <Tooltip content={data.description} size="lg">
                    <p className="text-sm leading-relaxed line-clamp-3">
                      {data.description}
                    </p>
                  </Tooltip>

                  {/* Dung lượng */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Chọn dung lượng:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.storageOptions?.map((option) => (
                        <Chip
                          key={option}
                          className="cursor-pointer"
                          color={
                            selectedStorage === option ? "primary" : "default"
                          }
                          variant={
                            selectedStorage === option ? "solid" : "faded"
                          }
                          onClick={() => setSelectedStorage(option)}
                        >
                          {option}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Màu sắc */}
                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-2">Chọn màu sắc:</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.colorOptions?.map((color) => (
                        <Chip
                          key={color}
                          className="cursor-pointer capitalize"
                          color={
                            selectedColor === color ? "primary" : "default"
                          }
                          variant={selectedColor === color ? "solid" : "faded"}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Danh sách tiện ích */}
                  <ul className="text-sm list-disc pl-5 space-y-1 mt-4">
                    <li>Bảo hành chính hãng 12 tháng</li>
                    <li>Hỗ trợ trả góp 0% qua thẻ tín dụng</li>
                    <li>Tặng kèm ốp lưng + miếng dán cường lực</li>
                    <li>Giao hàng tận nơi, kiểm tra trước khi nhận</li>
                  </ul>

                  {/* Nút hành động */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                    <Button
                      fullWidth
                      color="secondary"
                      size="lg"
                      startContent={<BaggageClaim />}
                      onPress={onClose}
                    >
                      Thêm vào giỏ hàng
                    </Button>

                    <Button
                      fullWidth
                      color="primary"
                      size="lg"
                      startContent={<ShoppingCart />}
                      onPress={onClose}
                    >
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </div>

              <Spacer y={5} />

              {/* Gallery ảnh */}
              <Accordion variant="bordered">
                <AccordionItem
                  key="gallery"
                  aria-label="Accordion 1"
                  title="Hình ảnh khác:"
                >
                  <div className="mt-6 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {data.gallery.map((img, idx) => (
                        <Image
                          key={idx}
                          alt={`${data.title} ${idx + 1}`}
                          className="w-full h-auto rounded-md object-cover"
                          src={img}
                        />
                      ))}
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>

              {/* Mô tả chi tiêt */}
              <Accordion variant="bordered">
                <AccordionItem
                  key="description"
                  aria-label="Accordion 2"
                  title="Mô tả chi tiết:"
                >
                  <div className="mt-6 mb-6">
                    <p className="text-sm leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
