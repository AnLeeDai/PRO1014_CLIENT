import { Button } from "@heroui/button";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import AvatarUser from "./avatar-user";

import { siteConfig } from "@/config/site";
import { useAuthUserStore } from "@/zustand";

const menuItems: {
  name: string;
  href: string;
}[] = [
  { name: "Điện thoại", href: siteConfig.route.phone },
  { name: "Laptop", href: siteConfig.route.laptop },
  { name: "Phụ kiện", href: siteConfig.route.accessories },
];

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userData } = useAuthUserStore();

  const location = useLocation();

  const currentPath = location.pathname;

  const desktopNavItems = useMemo(
    () =>
      menuItems.map((item) => (
        <NavbarItem key={item.name} isActive={currentPath === item.href}>
          <Link color="foreground" href={item.href}>
            {item.name}
          </Link>
        </NavbarItem>
      )),
    [currentPath],
  );

  const mobileNavItems = useMemo(
    () =>
      menuItems.map((item) => (
        <NavbarMenuItem key={item.name} isActive={currentPath === item.href}>
          <Link
            className="w-full"
            color="foreground"
            href={item.href}
            size="lg"
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      )),
    [currentPath],
  );

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
          <Link color="foreground" href={siteConfig.route.home} size="lg">
            <p className="font-bold text-inherit">PRO1014</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {desktopNavItems}
      </NavbarContent>

      <NavbarContent justify="end">
        {userData ? (
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

      <NavbarMenu>{mobileNavItems}</NavbarMenu>
    </Navbar>
  );
}
