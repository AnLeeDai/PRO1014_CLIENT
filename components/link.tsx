import Link from "next/link";
import { Link as HeroUILink, LinkProps } from "@heroui/link";

interface ILinkCustomProps extends LinkProps {}

export default function LinkCustom({ ...props }: ILinkCustomProps) {
  return (
    <HeroUILink as={Link} {...props} color="foreground">
      {props.children}
    </HeroUILink>
  );
}
