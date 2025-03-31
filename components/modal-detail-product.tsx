"use client";

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
  Skeleton,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { BaggageClaim, ShoppingCart } from "lucide-react";

import { products } from "@/constants/mockdata-product";

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
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);

    const timeout = setTimeout(() => {
      const product = products.find((p) => p.id === productId);

      setData(product || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [productId]);

  if (!isOpen) return null;

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
            {loading || !data ? (
              <ModalBody>
                <Skeleton className="w-1/2 h-6 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Skeleton className="w-full h-[430px] rounded-lg" />
                  <div className="space-y-4">
                    <Skeleton className="w-1/4 h-6 rounded" />
                    <Skeleton className="w-full h-24 rounded" />
                    <Skeleton className="w-1/3 h-6 rounded" />
                    <Skeleton className="w-1/2 h-6 rounded" />
                    <Skeleton className="w-full h-12 rounded" />
                  </div>
                </div>
              </ModalBody>
            ) : (
              <>
                <ModalHeader className="text-xl font-semibold">
                  {data.title}
                </ModalHeader>

                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <Image alt={data.title} height={430} src={data.image} />

                    <div className="space-y-4">
                      <p className="font-bold text-xl">{data.price}</p>

                      <Tooltip content={data.description} size="lg">
                        <p className="text-sm leading-relaxed line-clamp-3">
                          {data.description}
                        </p>
                      </Tooltip>

                      {/* Dung lượng */}
                      {data.storageOptions?.length && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Chọn dung lượng:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {data.storageOptions.map((option) => (
                              <Chip
                                key={option}
                                className="cursor-pointer"
                                color={
                                  selectedStorage === option
                                    ? "primary"
                                    : "default"
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
                      )}

                      {/* Màu sắc */}
                      {data.colorOptions?.length && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Chọn màu sắc:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {data.colorOptions.map((color) => (
                              <Chip
                                key={color}
                                className="cursor-pointer capitalize"
                                color={
                                  selectedColor === color
                                    ? "primary"
                                    : "default"
                                }
                                variant={
                                  selectedColor === color ? "solid" : "faded"
                                }
                                onClick={() => setSelectedColor(color)}
                              >
                                {color}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Info list */}
                      <ul className="text-sm list-disc pl-5 space-y-1 mt-4">
                        <li>Bảo hành chính hãng 12 tháng</li>
                        <li>Hỗ trợ trả góp 0% qua thẻ tín dụng</li>
                        <li>Tặng kèm ốp lưng + miếng dán cường lực</li>
                        <li>Giao hàng tận nơi, kiểm tra trước khi nhận</li>
                      </ul>

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

                  {/* Gallery */}
                  <Accordion variant="bordered">
                    <AccordionItem key="gallery" title="Hình ảnh khác:">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {data.gallery.map((img, idx) => (
                          <Image
                            key={idx}
                            alt={`${data.title} ${idx + 1}`}
                            className="w-full h-auto rounded-md object-cover"
                            src={img}
                          />
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>

                  {/* Mô tả chi tiết */}
                  <Accordion variant="bordered">
                    <AccordionItem key="desc" title="Mô tả chi tiết:">
                      <div className="mt-4 text-sm">{data.description}</div>
                    </AccordionItem>
                  </Accordion>
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
