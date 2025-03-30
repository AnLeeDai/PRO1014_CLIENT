"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import LinkCustom from "./link";
import AvatarUser from "./avatar-user";

import { siteConfig } from "@/config/site";

const menuItems = [
  { label: "Điện thoại", href: siteConfig.routes.phone },
  { label: "Máy tính bảng", href: siteConfig.routes.tablet },
  { label: "Laptop", href: siteConfig.routes.laptop },
  { label: "Phụ kiện", href: siteConfig.routes.accessories },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Navbar
      className="mx-auto container"
      classNames={{ wrapper: "w-full max-w-none" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarBrand>
          <LinkCustom color="foreground" href={siteConfig.routes.home}>
            <p className="font-bold text-inherit">PRO1014</p>
          </LinkCustom>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={isActive(item.href)}>
            <LinkCustom
              color={isActive(item.href) ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </LinkCustom>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <AvatarUser />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={isActive(item.href)}
          >
            <LinkCustom
              className="w-full"
              color={isActive(item.href) ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </LinkCustom>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
