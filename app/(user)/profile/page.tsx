import { Metadata } from "next";

import ProfileContainer from "@/modules/user/profile-container";

export const metadata: Metadata = {
  title: {
    default: "Thông tin tài khoản",
    template: `%s - Thông tin tài khoản`,
  },
};

export default function ProfilePage() {
  return <ProfileContainer />;
}
