"use client";

import { Avatar, Button, Card, CardBody, CardHeader } from "@heroui/react";

export default function ChangeAvatar() {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg font-bold">Ảnh đại diện</h1>
      </CardHeader>

      <CardBody>
        <Avatar
          alt="Avatar"
          className="w-44 h-44 mx-auto"
          src="https://avatars.githubusercontent.com/u/12345678?v=4"
        />

        <p className="text-sm text-center mt-4">
          Kích thước đề xuất: 176 x 176 pixel
        </p>

        <Button
          className="mt-auto"
          color="primary"
          size="lg"
          onPress={() => alert("Thay đổi ảnh đại diện")}
        >
          Thay đổi ảnh đại diện
        </Button>
      </CardBody>
    </Card>
  );
}
