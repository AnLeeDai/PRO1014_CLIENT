import { Metadata } from "next";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";
import ChangeAvatar from "@/modules/profile/change-avatar";
import ChangeProfileForm from "@/modules/profile/change-profile-form";

export const metadata: Metadata = {
  title: {
    default: "Thông tin tài khoản",
    template: `%s - Thông tin tài khoản`,
  },
};

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang trước" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <ChangeAvatar />
        <ChangeProfileForm />
      </div>
    </div>
  );
}
