import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Package, X, Save } from "lucide-react";

import { useUpdateCart } from "@/hooks/useUpdateCart";
import { useCart } from "@/hooks/useCart";

interface IModalEditProductQuantityProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productInfo: {
    product_id: number;
    productName: string;
    quantity: number;
  };
}

export default function ModalEditProductQuantity({
  isOpen,
  onOpenChange,
  productInfo,
}: IModalEditProductQuantityProps) {
  const { refetch } = useCart();
  const [newQuantity, setNewQuantity] = useState<number>(productInfo.quantity);

  /* đồng bộ khi mở lại modal */
  useEffect(() => setNewQuantity(productInfo.quantity), [productInfo.quantity]);

  const { mutate, isPending } = useUpdateCart({
    onSuccess: () => {
      addToast({
        title: "Cập nhật thành công",
        description: `Số lượng ${productInfo.productName} đã được cập nhật.`,
        color: "success",
      });
      refetch();
      onOpenChange(false);
    },
    onError: (err) =>
      addToast({
        title: "Lỗi",
        description: err.message,
        color: "danger",
      }),
  });

  const handleSave = () => {
    if (newQuantity <= 0) {
      addToast({
        title: "Giá trị không hợp lệ",
        description: "Số lượng phải lớn hơn 0.",
        color: "warning",
      });

      return;
    }
    mutate({ product_id: productInfo.product_id, quantity: newQuantity });
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="md"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <Package size={20} />
              Chỉnh sửa số lượng — {productInfo.productName}
            </ModalHeader>

            <ModalBody>
              <Input
                fullWidth
                label="Số lượng"
                min={1}
                type="number"
                value={String(newQuantity)}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                fullWidth
                size="lg"
                startContent={<X />}
                variant="flat"
                onPress={onClose}
              >
                Hủy
              </Button>

              <Button
                fullWidth
                color="primary"
                isLoading={isPending}
                size="lg"
                startContent={<Save />}
                onPress={handleSave}
              >
                Lưu thay đổi
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
