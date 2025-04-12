/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Image,
  Tab,
  Tabs,
  Chip,
  addToast,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Tooltip,
} from "@heroui/react";
import { CreditCard, TicketPercent, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";
import { useOrderFromCart } from "@/hooks/useOrderFromCart";
import { useUpdateCartDiscount } from "@/hooks/useUpdateCartDiscount";
import { useUserInfo } from "@/hooks/useUserInfo";

// Hàm định dạng tiền tệ VNĐ
const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

export default function MyCartContainer() {
  const { data, isLoading, error, refetch } = useCart();
  const { data: userInfo } = useUserInfo();
  const getUserInfo = userInfo?.user;

  // Gọi API để đặt hàng
  const { mutate: orderNow, isPending: orderNowPending } = useOrderFromCart({
    onSuccess: (res) => {
      addToast({
        title: "Đặt hàng thành công, vui lòng chờ admin xác nhận",
        description: res.message,
        color: "success",
      });
      refetch();
    },
    onError: (err) => {
      addToast({
        title: "Lỗi khi đặt hàng",
        description: err.message,
        color: "danger",
      });
    },
  });

  // Gọi API cập nhật mã giảm giá
  const { mutateAsync: updateDiscount } = useUpdateCartDiscount();

  // State cho discount code
  const [discountCodes, setDiscountCodes] = useState<Record<number, string>>(
    {},
  );
  const [discountLoading, setDiscountLoading] = useState<
    Record<number, boolean>
  >({});
  const [discountErrors, setDiscountErrors] = useState<Record<number, string>>(
    {},
  );
  const debounceRefs = useRef<Record<number, NodeJS.Timeout>>({});

  // Trạng thái: Giao hàng / Tự đến lấy
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  // Địa chỉ chính thức để đặt hàng
  const [_shippingAddress, setShippingAddress] = useState("");

  // Trạng thái input khi người dùng gõ => Chỉ dùng để search gợi ý
  const [addressQuery, setAddressQuery] = useState("");

  // Danh sách gợi ý
  const [addressSuggestions, setAddressSuggestions] = useState<
    { label: string; key: string }[]
  >([]);

  // Loading khi fetch gợi ý
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  // ------------------------------
  // State loading khi lấy vị trí
  // ------------------------------
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  // Khi có userInfo thì đồng bộ vào địa chỉ và ô input
  useEffect(() => {
    if (getUserInfo?.address) {
      setShippingAddress(getUserInfo.address);
      setAddressQuery(getUserInfo.address);
    }
  }, [getUserInfo]);

  // Debounce khi người dùng gõ địa chỉ
  const queryTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Nếu dưới 3 ký tự => không fetch
    if (!addressQuery || addressQuery.length < 3) {
      setAddressSuggestions([]);

      return;
    }

    if (queryTimeout.current) {
      clearTimeout(queryTimeout.current);
    }

    queryTimeout.current = setTimeout(async () => {
      setIsSearchingAddress(true);
      try {
        // countrycodes=vn để chỉ tìm kiếm tại Việt Nam
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            addressQuery,
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
  }, [addressQuery]);

  // Khi người dùng chọn 1 gợi ý từ Autocomplete
  const handleSelectAddress = (key: string | number | null) => {
    if (key === null) return; // đề phòng trường hợp null
    const selected = addressSuggestions.find((item) => item.key === key);

    if (selected) {
      setShippingAddress(selected.label);
      setAddressQuery(selected.label);
    }
  };

  // Hàm xử lý lấy vị trí hiện tại bằng geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      addToast({
        title: "Trình duyệt không hỗ trợ",
        description: "Không thể lấy vị trí hiện tại",
        color: "danger",
      });

      return;
    }

    // Bắt đầu quá trình => hiển thị loading
    setIsGettingCurrentLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await response.json();
          const address = data?.display_name || "Không tìm thấy địa chỉ";

          setShippingAddress(address);
          setAddressQuery(address);

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

  // Xử lý nhập mã giảm giá cho mỗi cart item
  const handleDiscountCodeChange = (
    cartItemId: number,
    productId: number,
    quantity: number,
    code: string,
  ) => {
    setDiscountCodes((prev) => ({ ...prev, [cartItemId]: code }));
    setDiscountErrors((prev) => ({ ...prev, [cartItemId]: "" }));

    if (debounceRefs.current[cartItemId]) {
      clearTimeout(debounceRefs.current[cartItemId]);
    }

    setDiscountLoading((prev) => ({ ...prev, [cartItemId]: true }));

    debounceRefs.current[cartItemId] = setTimeout(async () => {
      try {
        await updateDiscount({
          product_id: productId,
          quantity,
          discount_code: code,
        });
      } catch (err: any) {
        setDiscountErrors((prev) => ({
          ...prev,
          [cartItemId]: err?.message || "Mã giảm giá không hợp lệ",
        }));
      } finally {
        setDiscountLoading((prev) => ({ ...prev, [cartItemId]: false }));
      }
    }, 600);
  };

  // Tính toán số tiền
  const totalPrice = data?.cart_items.reduce(
    (sum, item) => sum + parseFloat(item.final_price) * item.quantity,
    0,
  );

  const shippingFee = deliveryMethod === "delivery" ? 50000 : 0;
  const tax = (totalPrice ?? 0) * 0.1;
  const totalPayment = (totalPrice ?? 0) + tax + shippingFee;

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
        <h1 className="text-3xl font-bold">Giỏ hàng của tôi</h1>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Bên trái */}
        <div className="flex-[2_1_0%] space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Phương thức giao hàng</h2>
            </CardHeader>
            <CardBody>
              <Tabs
                aria-label="Phương thức giao hàng"
                selectedKey={deliveryMethod}
                variant="bordered"
                onSelectionChange={(key) =>
                  setDeliveryMethod(key as "delivery" | "pickup")
                }
              >
                <Tab key="delivery" title="Giao hàng">
                  <Autocomplete
                    className="mb-4"
                    inputValue={addressQuery}
                    isLoading={isSearchingAddress}
                    label="Địa chỉ giao hàng của bạn"
                    startContent={<MapPin className="text-muted-foreground" />}
                    onInputChange={(value) => setAddressQuery(value)}
                    onSelectionChange={handleSelectAddress}
                  >
                    {addressSuggestions.map((item) => (
                      <AutocompleteItem key={item.key}>
                        {item.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <div className="space-y-4 text-base">
                    <Tooltip content="Vị trí chỉ mang tính chất tương đối, có thể không chính xác">
                      <Chip
                        className="cursor-pointer"
                        color="success"
                        isDisabled={isGettingCurrentLocation}
                        variant="faded"
                        onClick={handleUseCurrentLocation}
                      >
                        {isGettingCurrentLocation
                          ? "Đang lấy vị trí..."
                          : "📍 Dùng vị trí hiện tại của bạn"}
                      </Chip>
                    </Tooltip>
                  </div>
                </Tab>

                <Tab key="pickup" title="Tự đến lấy">
                  <p className="text-base italic">
                    Tự đến lấy hàng tại cửa hàng sẽ giúp bạn{" "}
                    <strong>không mất phí vận chuyển</strong>.
                  </p>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
            </CardHeader>
            <CardBody className="space-y-2 text-base">
              <div>👤 {getUserInfo?.full_name}</div>
              <div>📧 {getUserInfo?.email}</div>
              <div>📞 {getUserInfo?.phone_number}</div>
            </CardBody>
          </Card>
        </div>

        {/* Bên phải */}
        <div className="flex-[1_1_0%] space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="mr-2 text-xl font-semibold">Tóm tắt đơn hàng</h2>
                <Chip color="primary" size="md" variant="flat">
                  {data?.cart_items.length ?? 0}
                </Chip>
              </div>
            </CardHeader>

            <CardBody className="space-y-5 text-base">
              {isLoading && <p>Đang tải giỏ hàng...</p>}
              {error && <p className="text-red-500">{error.message}</p>}

              {data?.cart_items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="rounded-lg border p-4 space-y-3"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      alt={item.product_name}
                      className="rounded-lg object-cover"
                      height={100}
                      src={item.thumbnail}
                      width={100}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-base font-semibold">
                            {item.product_name}
                          </p>
                          <p className="text-sm text-zinc-400">
                            Số lượng: x{item.quantity}
                          </p>
                        </div>
                        <div className="text-right text-base font-semibold whitespace-nowrap">
                          {formatVND(
                            parseFloat(item.final_price) * item.quantity,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <Input
                      className="w-full"
                      endContent={
                        discountLoading[item.cart_item_id] ? (
                          <Spinner size="sm" />
                        ) : null
                      }
                      placeholder="Mã giảm giá cho sản phẩm này"
                      size="md"
                      startContent={<TicketPercent />}
                      value={discountCodes[item.cart_item_id] || ""}
                      variant="bordered"
                      onChange={(e) =>
                        handleDiscountCodeChange(
                          item.cart_item_id,
                          item.product_id,
                          item.quantity,
                          e.target.value,
                        )
                      }
                    />
                    {discountErrors[item.cart_item_id] && (
                      <p className="text-sm text-red-500">
                        {discountErrors[item.cart_item_id]}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2 text-base">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(totalPrice ?? 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế (10%)</span>
                  <span>{formatVND(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatVND(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2">
                  <span>Tổng cộng</span>
                  <span>{formatVND(totalPayment)}</span>
                </div>
              </div>

              <Button
                fullWidth
                className="mt-4 text-base"
                color="primary"
                isLoading={orderNowPending}
                size="lg"
                startContent={<CreditCard />}
                onPress={() => orderNow({ type: "from_cart" })}
              >
                Thanh toán {formatVND(totalPayment)}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
