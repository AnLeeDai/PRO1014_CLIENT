"use client";

import { useEffect, useRef, useState } from "react";
import { addToast, Spinner } from "@heroui/react";

import TransportCard from "./transport-card";
import InfomationCard from "./infomation-card";
import TotalProduct from "./total-product";

import Forward from "@/components/forward";
import ModalConfirmPayment from "@/components/modal-confirm-payment";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";
import { useOrderFromCart } from "@/hooks/useOrderFromCart";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function MyCartContainer() {
  const { data: cartData, isLoading, error, refetch } = useCart();
  const { data: userInfo } = useUserInfo();
  const { refetch: refetchOrderHistory } = useOrderHistory();
  const getUserInfo = userInfo?.user;

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<
    { label: string; key: string }[]
  >([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  const { mutate: orderNow, isPending: orderNowPending } = useOrderFromCart({
    onSuccess: (res) => {
      addToast({
        title: "Đặt hàng thành công",
        description: res.message,
        color: "success",
      });
      setConfirmModalOpen(false);
      refetch();
      refetchOrderHistory();
    },
    onError: (err) => {
      addToast({
        title: "Lỗi khi đặt hàng",
        description: err.message,
        color: "danger",
      });
    },
  });

  // Fallback for default user address
  useEffect(() => {
    if (getUserInfo?.address) {
      setShippingAddress(getUserInfo.address);
      setAddressQuery(getUserInfo.address);
    }
  }, [getUserInfo]);

  const queryTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!addressQuery || addressQuery.length < 3) {
      setAddressSuggestions([]);

      return;
    }

    if (queryTimeout.current) clearTimeout(queryTimeout.current);

    queryTimeout.current = setTimeout(async () => {
      setIsSearchingAddress(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            addressQuery,
          )}&format=json&addressdetails=1&limit=5&countrycodes=vn`,
        );
        const json = await res.json();

        setAddressSuggestions(
          json.map((item: any, idx: number) => ({
            label: item.display_name,
            key: String(idx),
          })),
        );
      } catch {
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

  const handleSelectAddress = (key: string | number | null) => {
    const selected = addressSuggestions.find((item) => item.key === key);

    if (selected) {
      setShippingAddress(selected.label);
      setAddressQuery(selected.label);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      return addToast({
        title: "Không hỗ trợ định vị",
        description: "Trình duyệt không hỗ trợ lấy vị trí hiện tại",
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
          const data = await res.json();
          const address = data?.display_name || "Không tìm thấy địa chỉ";

          setShippingAddress(address);
          setAddressQuery(address);
          addToast({
            title: "Lấy vị trí thành công",
            description: address,
            color: "success",
          });
        } catch {
          addToast({
            title: "Lỗi khi lấy vị trí",
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
          description: "Vui lòng cấp quyền truy cập vị trí",
          color: "danger",
        });
        setIsGettingCurrentLocation(false);
      },
    );
  };

  const totalPrice = cartData?.cart_items.reduce(
    (sum, item) => sum + (parseFloat(item.original_price) || 0) * item.quantity,
    0,
  );

  const handleShowConfirmModal = () => {
    if (deliveryMethod === "delivery" && !shippingAddress.trim()) {
      return addToast({
        title: "Bạn chưa nhập địa chỉ",
        description: "Vui lòng nhập địa chỉ trước khi đặt hàng",
        color: "warning",
      });
    }
    setConfirmModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    orderNow({
      type: "from_cart",
      shipping_address: shippingAddress,
      payment_method: "bank_transfer",
    });
  };

  return (
    <>
      {orderNowPending && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <Spinner color="white" size="lg" />
        </div>
      )}

      <div>
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
          <h1 className="text-3xl font-bold">Giỏ hàng của tôi</h1>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-[2_1_0%] space-y-6">
            <TransportCard
              addressQuery={addressQuery}
              addressSuggestions={addressSuggestions}
              deliveryMethod={deliveryMethod}
              handleSelectAddress={handleSelectAddress}
              handleUseCurrentLocation={handleUseCurrentLocation}
              isGettingCurrentLocation={isGettingCurrentLocation}
              isSearchingAddress={isSearchingAddress}
              setAddressQuery={setAddressQuery}
              setDeliveryMethod={setDeliveryMethod}
            />
            <InfomationCard getUserInfo={getUserInfo} />
          </div>

          <div className="flex-[1_1_0%] space-y-6">
            <TotalProduct
              data={cartData}
              error={error}
              handleShowConfirmModal={handleShowConfirmModal}
              isLoading={isLoading}
              orderNowPending={orderNowPending}
              shippingFee={0}
              totalPayment={(totalPrice || 0) + 0}
              totalPrice={totalPrice || 0}
            />
          </div>
        </div>
      </div>

      <ModalConfirmPayment
        handleConfirmCheckout={handleConfirmCheckout}
        isConfirmModalOpen={isConfirmModalOpen}
        orderNowPending={orderNowPending}
        setConfirmModalOpen={setConfirmModalOpen}
        userInfo={userInfo}
      />
    </>
  );
}
