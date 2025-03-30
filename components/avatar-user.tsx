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

import { siteConfig } from "@/config/site";

export default function AvatarUser() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const isTheme = theme === "dark" ? "sáng" : "tối";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAction = (key: Key) => {
    switch (key) {
      case "settings":
        router.push(siteConfig.routes.profile);
        break;
      case "settings":
      case "orders":
      case "favorites":
      case "theme":
        setTheme(theme === "dark" ? "light" : "dark");
        break;
      case "logout":
        router.push(siteConfig.routes.login);
        break;
      default:
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
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue={`${greeting} @khachhang`}
          >
            <p className="font-bold">{greeting}</p>
            <p className="font-bold">@khachhang</p>
          </DropdownItem>
          <DropdownItem key="settings" textValue="Thông tin tài khoản">
            Thông tin tài khoản
          </DropdownItem>
          <DropdownItem key="orders" textValue="Đơn hàng của tôi">
            Đơn hàng của tôi
          </DropdownItem>
          <DropdownItem key="favorites" textValue="Danh sách yêu thích">
            Danh sách yêu thích
          </DropdownItem>
          <DropdownItem key="theme" textValue={`Chuyển sang chủ đề ${isTheme}`}>
            Chuyển sang chủ đề {isTheme}
          </DropdownItem>
          <DropdownItem key="logout" color="danger" textValue="Đăng xuất">
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
