import { ArrowLeft } from "lucide-react";
import { Link } from "@heroui/react";

interface IBackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink(props: IBackLinkProps) {
  const { href, label } = props;

  return (
    <Link className="cursor-pointer" color="foreground" href={href ?? "/"}>
      <div className="flex items-center">
        <ArrowLeft className="w-6 h-6" />

        <h1 className={`pl-3 text-lg font-semibold ${!label ? "hidden" : ""}`}>
          {label}
        </h1>
      </div>
    </Link>
  );
}
