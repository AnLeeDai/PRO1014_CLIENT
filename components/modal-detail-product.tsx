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
} from "@heroui/react";
import {
  BaggageClaim,
  ListOrdered,
  MapPin,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import ModalConfirmPayment from "./modal-confirm-payment";

import { useProductByID } from "@/hooks/useProductByID";
import { useOrderNow } from "@/hooks/useBuyNow";
import { useCreateCart } from "@/hooks/useCreateOrder";
import { useCart } from "@/hooks/useCart";
import { useUserInfo } from "@/hooks/useUserInfo";
import { siteConfig } from "@/config/site";

/* -------------------------------------------------- */
/* Helper: debounce value                             */
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
/* -------------------------------------------------- */

interface IModalDetailProductProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: number;
  onClose: () => void;
}

interface IFormInputs {
  address: string;
  quantity: number;
}

export default function ModalDetailProduct({
  isOpen,
  onOpenChange,
  productId,
  onClose,
}: IModalDetailProductProps) {
  const router = useRouter();
  const token = Cookies.get("token");

  const { data: productData, isLoading: productLoading } =
    useProductByID(productId);
  const { refetch: refetchCart } = useCart();
  const { data: userInfo } = useUserInfo();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: { address: "", quantity: 1 },
  });

  /* ------------ address autocomplete ------------ */
  const addressValue = watch("address");
  const debouncedAddress = useDebounce(addressValue, 300);
  const [addressOptions, setAddressOptions] = useState<
    { label: string; key: string }[]
  >([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  /* fetch gợi ý mỗi khi debouncedAddress đổi */
  useEffect(() => {
    if (!debouncedAddress || debouncedAddress.length < 3) {
      setAddressOptions([]);

      return;
    }

    /* huỷ request cũ (nếu có) */
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();

    controllerRef.current = controller;

    (async () => {
      setIsSearchingAddress(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            debouncedAddress,
          )}&format=json&addressdetails=1&limit=7&countrycodes=vn`,
          { signal: controller.signal },
        );
        const json = await res.json();
        const options =
          json.length > 0
            ? json.map((item: any) => ({
                label: item.display_name,
                key: String(item.place_id),
              }))
            : [];

        setAddressOptions(options);
      } catch (err) {
        if ((err as { name?: string }).name !== "AbortError") {
          setAddressOptions([]);
        }
      } finally {
        setIsSearchingAddress(false);
      }
    })();
  }, [debouncedAddress]);

  /* đổ địa chỉ mặc định của user */
  useEffect(() => {
    if (userInfo?.user.address) {
      setValue("address", userInfo.user.address);
    }
  }, [userInfo?.user.address, setValue]);

  const handleSelectAddress = (key: string | number | null) => {
    const selected = addressOptions.find((o) => o.key === key);

    if (selected) setValue("address", selected.label);
  };

  /* ------------ geolocation ------------ */
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      return addToast({
        title: "Trình duyệt không hỗ trợ",
        description: "Không thể lấy vị trí hiện tại",
        color: "danger",
      });
    }
    setIsGettingCurrentLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const json = await res.json();
          const addr = json?.display_name || "";

          setValue("address", addr);
          addToast({
            title: "Lấy vị trí thành công",
            description: addr,
            color: "success",
          });
        } catch {
          addToast({
            title: "Lỗi lấy vị trí",
            description: "Vui lòng thử lại sau",
            color: "danger",
          });
        } finally {
          setIsGettingCurrentLocation(false);
        }
      },
      () => {
        addToast({
          title: "Không thể lấy vị trí",
          description: "Hãy cho phép quyền truy cập vị trí",
          color: "danger",
        });
        setIsGettingCurrentLocation(false);
      },
    );
  };

  /* ------------ API mutations ------------ */
  const { mutate: createCart, isPending: createCartPending } = useCreateCart({
    onSuccess: (data) => {
      addToast({
        title: "Đã thêm vào giỏ hàng",
        description: data.message,
        color: "success",
      });
      refetchCart();
    },
    onError: (err) =>
      addToast({
        title: "Thêm vào giỏ thất bại",
        description: err.message,
        color: "danger",
      }),
  });

  const { mutate: orderNow, isPending: orderNowPending } = useOrderNow({
    onSuccess: (data) =>
      addToast({
        title: "Đặt hàng thành công",
        description: data.message,
        color: "success",
      }),
    onError: (err) =>
      addToast({
        title: "Có lỗi xảy ra",
        description: err.message,
        color: "danger",
      }),
  });

  /* ------------ submit handlers ------------ */
  const data = productData?.product;

  const onAddToCart = ({ quantity }: IFormInputs) => {
    if (!data?.id) return;
    if (!token) {
      router.replace(siteConfig.routes.login);

      return;
    }
    createCart({ product_id: data.id, quantity });
  };

  const onShowQRModal = () => {
    if (!token) {
      router.replace(siteConfig.routes.login);

      return;
    }

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

  const onBuyNow = ({ address, quantity }: IFormInputs) => {
    if (!data?.id) return;
    if (!address.trim()) {
      addToast({
        title: "Bạn chưa nhập địa chỉ",
        description: "Vui lòng nhập địa chỉ trước khi đặt hàng.",
        color: "warning",
      });

      return;
    }
    orderNow({
      type: "buy_now",
      product_id: data.id,
      quantity,
      shipping_address: address,
      payment_method: "bank_transfer",
    });
  };

  /* ------------ UI state ------------ */
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isQRModalOpen, setQRModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <Modal
        backdrop="blur"
        classNames={{
          header: "border-b-[1px] border-[#292f46]",
        }}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {productLoading ? (
            /*  Skeleton UI  */
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
                <Package className="mr-2 inline-block" />
                {data?.product_name}
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Image
                    alt={data?.thumbnail}
                    height={500}
                    src={data?.thumbnail}
                    width={800}
                  />

                  {/* ------------ RIGHT COLUMN ------------ */}
                  <div className="space-y-4">
                    <p className="text-xl font-bold">
                      ₫{parseInt(data?.price ?? "0").toLocaleString("vi-VN")}
                    </p>

                    <Tooltip
                      showArrow
                      className="w-[400px]"
                      classNames={{
                        base: [
                          // arrow color
                          "before:bg-neutral-400 dark:before:bg-white",
                        ],
                        content: [
                          "py-2 px-4 shadow-xl",
                          "text-black bg-gradient-to-br from-white to-neutral-400",
                        ],
                      }}
                      content={data?.short_description}
                    >
                      <p className="line-clamp-3 text-sm leading-relaxed">
                        {data?.short_description}
                      </p>
                    </Tooltip>

                    <ul
                      dangerouslySetInnerHTML={{
                        __html: data?.extra_info ?? "",
                      }}
                      className="mt-4 list-disc space-y-1 pl-5 text-sm"
                    />

                    {/* --------- Quantity & Address --------- */}
                    <div className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          {...register("quantity", { valueAsNumber: true })}
                          label="Số lượng"
                          min={1}
                          placeholder="Nhập số lượng"
                          size="md"
                          startContent={<ListOrdered />}
                          type="number"
                        />

                        <div className="flex flex-col gap-3">
                          <Autocomplete
                            className="w-full"
                            inputValue={addressValue}
                            isLoading={isSearchingAddress}
                            label="Địa chỉ giao hàng"
                            startContent={
                              <MapPin className="text-muted-foreground" />
                            }
                            onInputChange={(v) => setValue("address", v)}
                            onSelectionChange={handleSelectAddress}
                          >
                            {addressOptions.map((o) => (
                              <AutocompleteItem key={o.key}>
                                {o.label}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>

                          <Tooltip content="Vị trí chỉ mang tính tương đối">
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

                    {/* --------- Actions --------- */}
                    <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
                      <Button
                        fullWidth
                        color="secondary"
                        isLoading={createCartPending}
                        size="lg"
                        startContent={<BaggageClaim />}
                        onPress={() => handleSubmit(onAddToCart)()}
                      >
                        Thêm vào giỏ
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

                {/* gallery & desc giữ nguyên */}
                <Accordion defaultExpandedKeys={["gallery"]} variant="bordered">
                  <AccordionItem key="gallery" title="Hình ảnh khác:">
                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                      {data?.gallery.map((img, i) => (
                        <Image
                          key={i}
                          alt={`${data?.product_name} ${i + 1}`}
                          className="cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
                          height={200}
                          src={img}
                          width={300}
                          onClick={() => setZoomedImage(img)}
                        />
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>

                <Accordion defaultExpandedKeys={["desc"]} variant="bordered">
                  <AccordionItem key="desc" title="Mô tả chi tiết:">
                    <div className="mt-4 text-sm">{data?.full_description}</div>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ----- Zoom image ----- */}
      {zoomedImage && (
        <Modal
          isOpen
          backdrop="blur"
          size="4xl"
          onClose={() => setZoomedImage(null)}
        >
          <ModalContent>
            <ModalHeader />
            <ModalBody>
              <div className="flex justify-center">
                <Image
                  alt="Zoomed"
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

      {/* ----- QR payment modal ----- */}
      {isQRModalOpen && (
        <ModalConfirmPayment
          handleConfirmCheckout={handleSubmit(onBuyNow)}
          isConfirmModalOpen={isQRModalOpen}
          orderNowPending={orderNowPending}
          setConfirmModalOpen={setQRModalOpen}
          userInfo={userInfo}
        />
      )}
    </>
  );
}
