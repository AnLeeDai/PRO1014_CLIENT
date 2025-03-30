import { LucideIcon } from "lucide-react";

import LinkCustom from "./link";

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  moreHref?: string;
}

export default function Section({
  title,
  icon: Icon,
  children,
  moreHref,
}: SectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        </div>

        {moreHref && (
          <LinkCustom
            className="text-sm text-primary hover:underline"
            href={moreHref}
          >
            Xem thêm
          </LinkCustom>
        )}
      </div>
      {children}
    </section>
  );
}
