import ChangeAvatar from "./change-avatar";
import ChangeProfileForm from "./change-profile-form";

import Forward from "@/components/forward";
import { siteConfig } from "@/config/site";

export default function ProfileContainer() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Forward href={siteConfig.routes.home} label="Quay lại trang chủ" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <ChangeAvatar />
        <ChangeProfileForm />
      </div>
    </div>
  );
}
