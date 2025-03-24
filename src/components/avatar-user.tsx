import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { userStore } from "@/zustand/user-store";
import { siteConfig } from "@/config/site";

export default function AvatarUser() {
  const userData = userStore((state) => state.userData);
  const userLogout = userStore((state) => state.logout);

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: userData?.avatar_url,
            }}
            className="transition-transform"
            description={userData?.email}
            name={userData?.full_name}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          onAction={(key) => {
            if (key === "logout") {
              userLogout();
              navigate(siteConfig.route.login);
            }
          }}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Đăng nhập với</p>
            <p className="font-bold">{userData?.username}</p>
          </DropdownItem>

          <DropdownItem key="cart">Giỏ hàng</DropdownItem>
          <DropdownItem key="profile">Chỉnh sửa thông tin cá nhân</DropdownItem>
          <DropdownItem key="history">Lịch sử mua hàng</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
