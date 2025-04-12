/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Chip,
  Autocomplete,
  AutocompleteItem,
  ModalFooter,
} from "@heroui/react";
import {
  BaggageClaim,
  ListOrdered,
  MapPin,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useProductByID } from "@/hooks/useProductByID";
import { useOrderNow } from "@/hooks/useBuyNow";
import { useCreateCart } from "@/hooks/useCreateOrder";
import { useCart } from "@/hooks/useCart";

interface IModalDetailProductProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: number;
  onClose: () => void;
}

interface IFormInputs {
  address: string;
  quantity: number;
  discountCode: string;
}

export default function ModalDetailProduct({
  isOpen,
  onOpenChange,
  productId,
  onClose,
}: IModalDetailProductProps) {
  const { data: productData, isLoading: productLoading } =
    useProductByID(productId);
  const { refetch: refetchCart } = useCart();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      address: "",
      quantity: 1,
      discountCode: "",
    },
  });

  const addressValue = watch("address");

  const [addressSuggestions, setAddressSuggestions] = useState<
    { label: string; key: string }[]
  >([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isQRModalOpen, setQRModalOpen] = useState(false);

  // State này dùng để hiển thị loading khi bấm “Dùng vị trí hiện tại”
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  const queryTimeout = useRef<NodeJS.Timeout | null>(null);

  const { mutate: orderNow, isPending: orderNowPending } = useOrderNow({
    onSuccess: (data) => {
      addToast({
        title: "Đặt hàng thành công, vui lòng chờ admin xác nhận",
        description: data.message,
        color: "success",
      });

      setQRModalOpen(false);
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
      refetchCart();
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

  useEffect(() => {
    if (!addressValue || addressValue.length < 3) {
      setAddressSuggestions([]);

      return;
    }

    if (queryTimeout.current) {
      clearTimeout(queryTimeout.current);
    }

    queryTimeout.current = setTimeout(async () => {
      setIsSearchingAddress(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            addressValue,
          )}&format=json&addressdetails=1&limit=5&countrycodes=vn`,
        );
        const json = await res.json();
        const suggestions = json.map((item: any, idx: number) => ({
          label: item.display_name,
          key: String(idx),
        }));

        setAddressSuggestions(suggestions);
      } catch (err) {
        setAddressSuggestions([]);
      } finally {
        setIsSearchingAddress(false);
      }
    }, 300);

    return () => {
      if (queryTimeout.current) {
        clearTimeout(queryTimeout.current);
      }
    };
  }, [addressValue]);

  const handleSelectAddress = (key: string | number | null) => {
    if (key === null) return;
    const selected = addressSuggestions.find((item) => item.key === key);

    if (selected) {
      setValue("address", selected.label);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      addToast({
        title: "Trình duyệt không hỗ trợ",
        description: "Không thể lấy vị trí hiện tại",
        color: "danger",
      });

      return;
    }

    // Bắt đầu quá trình lấy vị trí => hiển thị loading
    setIsGettingCurrentLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const dataGeo = await response.json();
          const address = dataGeo?.display_name || "Không tìm thấy địa chỉ";

          setValue("address", address);
          addToast({
            title: "Lấy vị trí thành công",
            description: address,
            color: "success",
          });
        } catch (error) {
          addToast({
            title: "Lỗi khi lấy địa chỉ",
            description: "Vui lòng thử lại sau",
            color: "danger",
          });
        } finally {
          // Kết thúc quá trình lấy vị trí => tắt loading
          setIsGettingCurrentLocation(false);
        }
      },
      () => {
        addToast({
          title: "Không thể lấy vị trí",
          description: "Vui lòng cho phép quyền truy cập vị trí",
          color: "danger",
        });
        setIsGettingCurrentLocation(false);
      },
    );
  };

  if (!isOpen) return null;

  const handleImageClick = (img_url: string) => {
    setZoomedImage(img_url);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const onAddToCart = (values: IFormInputs) => {
    if (!data?.id) return;
    createCart({
      product_id: data.id,
      quantity: values.quantity,
      discount_code: values.discountCode,
    });
  };

  const onShowQRModal = () => {
    if (!getValues("address").trim()) {
      addToast({
        title: "Bạn chưa nhập địa chỉ",
        description: "Vui lòng nhập địa chỉ trước khi đặt hàng.",
        color: "warning",
      });

      return;
    }
    setQRModalOpen(true);
  };

  const onBuyNow = (values: IFormInputs) => {
    if (!data?.id) return;
    if (!values.address.trim()) {
      addToast({
        title: "Bạn chưa nhập địa chỉ",
        description: "Vui lòng nhập địa chỉ trước khi đặt hàng.",
        color: "warning",
      });

      return;
    }

    orderNow({
      type: "buy_now",
      product_id: data?.id,
      quantity: getValues("quantity"),
      discount_code: getValues("discountCode"),
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

                      <div className="grid w-full gap-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Số lượng"
                            min={1}
                            placeholder="Nhập số lượng"
                            size="md"
                            startContent={<ListOrdered />}
                            type="number"
                            {...register("quantity", { valueAsNumber: true })}
                          />

                          <Input
                            label="Mã giảm giá (voucher)"
                            placeholder="Nhập mã giảm giá"
                            size="md"
                            startContent={<TicketPercent />}
                            {...register("discountCode")}
                          />
                        </div>

                        <div className="grid grid-cols-1">
                          <Autocomplete
                            className="w-full"
                            inputValue={addressValue}
                            isLoading={isSearchingAddress}
                            label="Địa chỉ giao hàng"
                            startContent={
                              <MapPin className="text-muted-foreground" />
                            }
                            onInputChange={(value) =>
                              setValue("address", value)
                            }
                            onSelectionChange={handleSelectAddress}
                          >
                            {addressSuggestions.map((item) => (
                              <AutocompleteItem key={item.key}>
                                {item.label}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>

                          <div className="mt-2">
                            <Tooltip content="Vị trí chỉ mang tính chất tương đối">
                              <Chip
                                className="cursor-pointer"
                                color="success"
                                isDisabled={isGettingCurrentLocation}
                                variant="faded"
                                onClick={handleUseCurrentLocation}
                              >
                                {isGettingCurrentLocation
                                  ? "Đang lấy vị trí..."
                                  : "📍 Dùng vị trí hiện tại"}
                              </Chip>
                            </Tooltip>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                        <Button
                          fullWidth
                          color="secondary"
                          isLoading={createCartPending}
                          size="lg"
                          startContent={<BaggageClaim />}
                          onPress={() => {
                            handleSubmit(onAddToCart)();
                          }}
                        >
                          Thêm vào giỏ hàng
                        </Button>

                        <Button
                          fullWidth
                          color="primary"
                          isLoading={orderNowPending}
                          size="lg"
                          startContent={<ShoppingCart />}
                          onPress={onShowQRModal}
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

      {isQRModalOpen && (
        <Modal
          backdrop="blur"
          isOpen={isQRModalOpen}
          size="md"
          onClose={() => setQRModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>Quét mã QR để thanh toán</ModalHeader>
            <ModalBody>
              <Image
                alt="Mã QR"
                height={500}
                src="/my_qr_code.png"
                width={1280}
              />

              <p className="text-center mt-4">Quét mã để hoàn tất thanh toán</p>
            </ModalBody>

            <ModalFooter>
              <Button
                fullWidth
                color="primary"
                size="lg"
                onPress={() => handleSubmit(onBuyNow)()}
              >
                Xác nhận thanh toán
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
