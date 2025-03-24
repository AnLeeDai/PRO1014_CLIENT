import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";

import AvatarUser from "./avatar-user";

import { siteConfig } from "@/config/site";
import { userStore } from "@/zustand/user-store";

const menuItems = [
  {
    name: "Điện thoại",
    href: siteConfig.route.phone,
  },
  {
    name: "Laptop",
    href: siteConfig.route.laptop,
  },
  {
    name: "Phụ kiện",
    href: siteConfig.route.accessories,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const userData = userStore((state) => state.userData);

  return (
    <Navbar
      className="container mx-auto"
      classNames={{ wrapper: "w-full max-w-none" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            aria-current="page"
            color="foreground"
            href={siteConfig.route.home}
            size="lg"
          >
            <p className="font-bold text-inherit">PRO1014</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem
            key={item.name}
            isActive={window.location.pathname === item.href}
          >
            <Link aria-current="page" color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {userData !== null ? (
          <NavbarItem>
            <AvatarUser />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href={siteConfig.route.login}
              variant="flat"
            >
              Đăng nhập
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem
            key={item.name}
            isActive={window.location.pathname === item.href}
          >
            <Link
              aria-current="page"
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
