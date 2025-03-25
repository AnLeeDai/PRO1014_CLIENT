import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { addToast, User } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { siteConfig } from "@/config/site";
import { useAuthUserStore } from "@/zustand";
import useLogout from "@/hooks/api/useLogout";

export default function AvatarUserComponent() {
  const { userData, logout: userLogout } = useAuthUserStore();

  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const { mutate } = useLogout({
    onError: (error) => {
      addToast({
        title: "Đăng xuất thất bại",
        description: error.message,
        color: "danger",
      });
    },

    onSuccess: (data) => {
      addToast({
        title: "Đăng xuất thành công",
        description: data.message,
        color: "success",
      });

      userLogout();
      navigate(siteConfig.route.login);
    },
  });

  const avatarProps = useMemo(
    () => ({
      isBordered: true,
      src: userData?.avatar_url ?? "",
      name: userData?.username ?? "",
      showFallback: true,
    }),
    [userData?.avatar_url, userData?.username],
  );

  const fullName = userData?.full_name ?? "";
  const email = userData?.email ?? "";
  const username = userData?.username ?? "";

  // Get time of day
  const now = new Date();
  const hours = now.getHours();
  const time = hours >= 0 && hours < 12 ? "sáng" : "chiều";

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={avatarProps}
            className="transition-transform"
            classNames={{
              description: "hidden md:block",
              name: "hidden sm:block",
            }}
            description={email}
            name={username}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          onAction={(key) => {
            if (key === "logout") {
              mutate();
            } else if (key === "theme") {
              setTheme(theme === "light" ? "dark" : "light");
            }
          }}
        >
          <DropdownItem
            key="user-info"
            className="h-14 gap-2"
            textValue={`Đăng nhập với ${username}`}
          >
            <p className="font-bold">Chào buổi {time}</p>
            <p className="font-bold">{fullName}</p>
          </DropdownItem>

          <DropdownItem
            key="cart"
            href={siteConfig.route.cart}
            textValue="Giỏ hàng"
          >
            Giỏ hàng
          </DropdownItem>

          <DropdownItem
            key="profile"
            href={siteConfig.route.profile}
            textValue="Chỉnh sửa thông tin cá nhân"
          >
            Chỉnh sửa thông tin cá nhân
          </DropdownItem>

          <DropdownItem
            key="history"
            href={siteConfig.route.history}
            textValue="Lịch sử mua hàng"
          >
            Lịch sử mua hàng
          </DropdownItem>

          <DropdownItem key="theme" textValue="Chủ đề">
            Chuyển sang chủ đề {theme === "light" ? "tối" : "sáng"}
          </DropdownItem>

          <DropdownItem key="logout" color="danger" textValue="Đăng xuất">
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
