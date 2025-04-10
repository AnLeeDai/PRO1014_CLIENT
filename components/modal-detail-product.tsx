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
  Input,
  addToast,
} from "@heroui/react";
import {
  BaggageClaim,
  ListOrdered,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";
import { useState } from "react";

import { useProductByID } from "@/hooks/useProductByID";
import { useOrderNow } from "@/hooks/useBuyNow";
import { useCreateCart } from "@/hooks/useCreateOrder";

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

  const { mutate: orderNow, isPending: orderNowPending } = useOrderNow({
    onSuccess: (data) => {
      addToast({
        title: "Đặt hàng thành công, vui lòng chờ admin xác nhận",
        description: data.message,
        color: "success",
      });
    },

    onError: (error) => {
      addToast({
        title: "Có lỗi xảy ra trong quá trình đặt hàng",
        description: error.message,
        color: "danger",
      });
    },
  });

  const { mutate: createCart, isPending: createCartPending } = useCreateCart({
    onSuccess: (data) => {
      addToast({
        title: "Đã thêm vào giỏ hàng",
        description: data.message,
        color: "success",
      });
    },

    onError: (error) => {
      addToast({
        title: "Thêm vào giỏ hàng thất bại",
        description: error.message,
        color: "danger",
      });
    },
  });

  const data = productData?.product;

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState("");

  if (!isOpen) return null;

  const handleImageClick = (img_url: string) => {
    setZoomedImage(img_url);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleBuyNow = (productId: number | undefined) => {
    if (!productId) return;

    orderNow({
      type: "buy_now",
      product_id: productId,
      quantity: quantity,
      discount_code: discountCode,
    });
  };

  const handleAddToCart = (productId: number | undefined) => {
    if (!productId) return;

    createCart({
      product_id: productId,
      quantity: quantity,
      discount_code: discountCode,
    });
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
                      height={500}
                      src={data?.thumbnail}
                      width={800}
                    />

                    <div className="space-y-4">
                      <p className="font-bold text-xl">
                        ₫{parseInt(data?.price || "0").toLocaleString("vi-VN")}
                      </p>

                      <Tooltip content={data?.short_description} size="lg">
                        <p className="text-sm leading-relaxed line-clamp-3">
                          {data?.short_description}
                        </p>
                      </Tooltip>

                      <ul
                        dangerouslySetInnerHTML={{
                          __html: data?.extra_info || "",
                        }}
                        className="text-sm list-disc pl-5 space-y-1 mt-4"
                      />

                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Input
                          className="flex 1"
                          label="Số lượng"
                          min={1}
                          placeholder="Nhập mã giảm giá"
                          size="md"
                          startContent={<ListOrdered />}
                          type="number"
                          value={quantity.toString()}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                        />

                        <Input
                          className="flex 1"
                          label="Mã giảm giá (voucher)"
                          placeholder="Nhập mã giảm giá"
                          size="md"
                          startContent={<TicketPercent />}
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                        <Button
                          fullWidth
                          color="secondary"
                          isLoading={createCartPending}
                          size="lg"
                          startContent={<BaggageClaim />}
                          onPress={() => handleAddToCart(data?.id)}
                        >
                          Thêm vào giỏ hàng
                        </Button>

                        <Button
                          fullWidth
                          color="primary"
                          isLoading={orderNowPending}
                          size="lg"
                          startContent={<ShoppingCart />}
                          onPress={() => handleBuyNow(data?.id)}
                        >
                          Mua ngay
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Spacer y={5} />

                  <Accordion variant="bordered">
                    <AccordionItem key="gallery" title="Hình ảnh khác:">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {data?.gallery.map((img, idx) => (
                          <Image
                            key={idx}
                            alt={`${data?.product_name} ${idx + 1}`}
                            className="cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
                            height={200}
                            src={img}
                            width={300}
                            onClick={() => handleImageClick(img)}
                          />
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>

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
        </ModalContent>
      </Modal>

      {zoomedImage && (
        <Modal backdrop="blur" isOpen={true} size="4xl" onClose={closeZoom}>
          <ModalContent>
            <ModalHeader />
            <ModalBody>
              <div className="flex justify-center">
                <Image
                  alt="Zoomed Image"
                  height={768}
                  radius="sm"
                  src={zoomedImage}
                  width={1024}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
