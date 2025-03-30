"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
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
} from "lucide-react";

import { siteConfig } from "@/config/site";

export default function AvatarUser() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAction = (key: Key) => {
    switch (key) {
      case "settings":
        router.push(siteConfig.routes.profile);
        break;
      case "orders":
        router.push(siteConfig.routes.home);
        break;
      case "cart":
        router.push(siteConfig.routes.cart);
        break;
      case "theme":
        setTheme(nextTheme);
        break;
      case "logout":
        router.push(siteConfig.routes.login);
        break;
    }
  };

  const date = new Date();
  const hours = date.getHours();
  const greeting =
    hours < 12
      ? "Chào buổi sáng"
      : hours < 18
        ? "Chào buổi chiều"
        : "Chào buổi tối";

  return (
    <div className="flex items-center gap-4">
      <Dropdown backdrop="blur" placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@khachhang"
            name="Khách Hàng"
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Hành động người dùng"
          variant="flat"
          onAction={handleAction}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">{greeting}</p>
            <p className="font-bold">@khachhang</p>
          </DropdownItem>

          <DropdownItem
            key="settings"
            description="Cập nhật thông tin tài khoản của bạn"
            startContent={<Settings size={18} />}
          >
            Thông tin tài khoản
          </DropdownItem>

          <DropdownItem
            key="orders"
            description="Xem lại các đơn hàng bạn đã mua"
            startContent={<Package size={18} />}
          >
            Đơn hàng của tôi
          </DropdownItem>

          <DropdownItem
            key="cart"
            description="Xem các sản phẩm đã thêm vào giỏ"
            startContent={<ShoppingCart size={18} />}
          >
            Giỏ hàng của tôi
          </DropdownItem>

          <DropdownItem
            key="theme"
            description={`Chuyển sang chế độ ${isDark ? "sáng" : "tối"}`}
            startContent={isDark ? <Sun size={18} /> : <Moon size={18} />}
          >
            Chế độ {isDark ? "sáng" : "tối"}
          </DropdownItem>

          <DropdownItem
            key="logout"
            color="danger"
            description="Đăng xuất khỏi tài khoản"
            startContent={<LogOut size={18} />}
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
