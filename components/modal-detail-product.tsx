import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Button,
  Accordion,
  AccordionItem,
  Tooltip,
  Spacer,
  Skeleton,
} from "@heroui/react";
import { BaggageClaim, ShoppingCart } from "lucide-react";

import { useProductByID } from "@/hooks/useProductByID";

interface IModalDetailProductProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: number;
  onClose: () => void;
}

export default function ModalDetailProduct({
  isOpen,
  onOpenChange,
  productId,
  onClose,
}: IModalDetailProductProps) {
  const { data: productData, isLoading: productLoading } =
    useProductByID(productId);

  const data = productData?.product;

  if (!isOpen) return null;

  const handleImageClick = (img_url: string) => {
    console.log(img_url);
  };

  return (
    <>
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
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {productLoading ? (
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
                    {data?.product_name}
                  </ModalHeader>

                  <ModalBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <Image
                        alt={data?.thumbnail}
                        height={430}
                        src={data?.thumbnail}
                      />

                      <div className="space-y-4">
                        <p className="font-bold text-xl">₫{data?.price}</p>

                        <Tooltip content={data?.short_description} size="lg">
                          <p className="text-sm leading-relaxed line-clamp-3">
                            {data?.short_description}
                          </p>
                        </Tooltip>

                        {/* <div>
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
                                    selectedStorage === option
                                      ? "solid"
                                      : "faded"
                                  }
                                  onClick={() => setSelectedStorage(option)}
                                >
                                  {option}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        )}

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
                      </div> */}

                        {/* Info list */}
                        <ul
                          dangerouslySetInnerHTML={{
                            __html: data?.extra_info || "",
                          }}
                          className="text-sm list-disc pl-5 space-y-1 mt-4"
                        >
                          {/* <li>Bảo hành chính hãng 12 tháng</li>
                        <li>Hỗ trợ trả góp 0% qua thẻ tín dụng</li>
                        <li>Tặng kèm ốp lưng + miếng dán cường lực</li>
                        <li>Giao hàng tận nơi, kiểm tra trước khi nhận</li> */}
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
                          {data?.gallery.map((img, idx) => (
                            <Image
                              key={idx}
                              alt={`${data?.product_name} ${idx + 1}`}
                              className="cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
                              height={350}
                              src={img}
                              width={1280}
                              onClick={() => handleImageClick(img)}
                            />
                          ))}
                        </div>
                      </AccordionItem>
                    </Accordion>

                    {/* Mô tả chi tiết */}
                    <Accordion variant="bordered">
                      <AccordionItem key="desc" title="Mô tả chi tiết:">
                        <div className="mt-4 text-sm">
                          {data?.full_description}
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
