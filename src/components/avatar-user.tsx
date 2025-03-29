import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { addToast, Avatar } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useNavigate } from "react-router-dom";

import { siteConfig } from "@/config/site";
import useLogout from "@/hooks/api/useLogout";
import useGetUserInfo from "@/hooks/api/useGetUserInfo";

export default function AvatarUserComponent() {
  const { data } = useGetUserInfo({
    retry: 0,
    queryKey: ["getUserInfo"],
  });

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

      navigate(siteConfig.route.login);
    },
  });

  const fullName = data?.data?.full_name ?? "";

  // Get time of day
  const now = new Date();
  const hours = now.getHours();
  const time = hours >= 0 && hours < 12 ? "sáng" : "chiều";

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar className="cursor-pointer" src={data?.data?.avatar_url} />
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
          {/* Display user info if data exists */}
          {data ? (
            <>
              <DropdownItem
                key="user-info"
                className="h-14 gap-2"
                textValue="Thông tin người dùng"
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
            </>
          ) : (
            <>
              <DropdownItem
                key="login"
                href={siteConfig.route.login}
                textValue="Đăng nhập"
              >
                Đăng nhập
              </DropdownItem>

              <DropdownItem
                key="register"
                href={siteConfig.route.register}
                textValue="Đăng ký"
              >
                Đăng ký
              </DropdownItem>

              <DropdownItem key="theme" textValue="Chủ đề">
                Chuyển sang chủ đề {theme === "light" ? "tối" : "sáng"}
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
