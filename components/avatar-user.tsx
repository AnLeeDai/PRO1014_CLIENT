"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  addToast,
} from "@heroui/react";
import React, { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LogOut,
  Moon,
  Sun,
  Settings,
  ShoppingCart,
  Package,
  LogIn,
  UserPlus,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useLogoutUser } from "@/hooks/useLogoutUser";

export default function AvatarUser() {
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const { data, refetch } = useUserInfo();

  const { mutate } = useLogoutUser({
    onSuccess: (data) => {
      localStorage.removeItem("role");
      localStorage.removeItem("isLogin");

      addToast({
        title: "Đăng xuất thành công",
        description: data.message,
        color: "success",
      });

      router.replace(siteConfig.routes.home);
      refetch();
      setIsLogin(false);
    },

    onError: (error) => {
      addToast({
        title: "Đã xảy ra sự cố",
        description: error.message,
        color: "danger",
      });
    },
  });

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin") === "true");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAction = (key: Key) => {
    const actions: Record<string, () => void> = {
      settings: () => router.push(siteConfig.routes.profile),
      orders: () => router.push(siteConfig.routes.order),
      cart: () => router.push(siteConfig.routes.cart),
      theme: () => setTheme(theme === "dark" ? "light" : "dark"),
      logout: () => mutate({}),
      login: () => router.push(siteConfig.routes.login),
      register: () => router.push(siteConfig.routes.register),
    };

    actions[String(key)]?.();
  };

  const greeting = (() => {
    const hours = new Date().getHours();

    if (hours < 12) return "Chào buổi sáng";
    if (hours < 18) return "Chào buổi chiều";

    return "Chào buổi tối";
  })();

  return (
    <div className="flex items-center gap-4">
      <Dropdown backdrop="blur" placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src:
                data?.data.avatar_url ||
                "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={isLogin ? data?.data.email : "@guest"}
            name={isLogin ? data?.data.full_name : "Khách"}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Hành động người dùng"
          variant="flat"
          onAction={handleAction}
        >
          {isLogin ? (
            <>
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="Thông tin người dùng"
              >
                <p className="font-bold">{greeting}</p>
                <p className="font-bold">{data?.data.full_name}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                description="Cập nhật thông tin tài khoản của bạn"
                startContent={<Settings />}
                textValue="Thông tin tài khoản"
              >
                Thông tin tài khoản
              </DropdownItem>
              <DropdownItem
                key="orders"
                description="Xem lại các đơn hàng bạn đã mua"
                startContent={<Package />}
                textValue="Đơn hàng của tôi"
              >
                Lịch sử mua hàng
              </DropdownItem>
              <DropdownItem
                key="cart"
                description="Xem các sản phẩm đã thêm vào giỏ"
                startContent={<ShoppingCart />}
                textValue="Giỏ hàng của tôi"
              >
                Giỏ hàng của tôi
              </DropdownItem>
              <DropdownItem
                key="theme"
                description={`Chuyển sang chế độ ${theme === "dark" ? "sáng" : "tối"}`}
                startContent={theme === "dark" ? <Sun /> : <Moon />}
                textValue={`Chuyển sang chế độ ${theme === "dark" ? "sáng" : "tối"}`}
              >
                Chế độ {theme === "dark" ? "sáng" : "tối"}
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                description="Đăng xuất khỏi tài khoản"
                startContent={<LogOut />}
                textValue="Đăng xuất"
              >
                Đăng xuất
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem
                key="login"
                description="Đăng nhập vào tài khoản của bạn"
                startContent={<LogIn />}
                textValue="Đăng nhập"
              >
                Đăng nhập
              </DropdownItem>
              <DropdownItem
                key="register"
                description="Tạo tài khoản mới"
                startContent={<UserPlus />}
                textValue="Đăng ký"
              >
                Đăng ký
              </DropdownItem>
              <DropdownItem
                key="theme"
                description={`Chuyển sang chế độ ${theme === "dark" ? "sáng" : "tối"}`}
                startContent={theme === "dark" ? <Sun /> : <Moon />}
                textValue={`Chuyển sang chế độ ${theme === "dark" ? "sáng" : "tối"}`}
              >
                Chế độ {theme === "dark" ? "sáng" : "tối"}
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
