import { ArrowLeft } from "lucide-react";

import LinkCustom from "./link";

interface IForwardProps {
  href?: string;
  label?: string;
}

export default function Forward(props: IForwardProps) {
  const { href, label } = props;

  return (
    <LinkCustom
      className="cursor-pointer"
      color="foreground"
      href={href ?? "/"}
    >
      <div className="flex items-center">
        <ArrowLeft className="w-6 h-6" />

        <h1 className={`pl-3 text-lg font-semibold ${!label ? "hidden" : ""}`}>
          {label}
        </h1>
      </div>
    </LinkCustom>
  );
}
