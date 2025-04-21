import { Card, CardBody, CardHeader } from "@heroui/react";

interface IInfomationCardProps {
  getUserInfo?: {
    user_id: number;
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar_url: string;
    password_changed_at: null;
    created_at: string;
    role: string;
  };
}

export default function InfomationCard(props: IInfomationCardProps) {
  const { getUserInfo } = props;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
      </CardHeader>
      <CardBody className="space-y-2 text-base">
        <div>👤 {getUserInfo?.full_name}</div>
        <div>📧 {getUserInfo?.email}</div>
        <div>📞 {getUserInfo?.phone_number}</div>
      </CardBody>
    </Card>
  );
}
