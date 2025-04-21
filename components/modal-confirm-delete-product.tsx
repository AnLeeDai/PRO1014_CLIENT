import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  addToast,
} from "@heroui/react";

import { useDeleteCart } from "@/hooks/useDeleteCart";
import { useCart } from "@/hooks/useCart";

interface IModalConfirmDeleteProductProps {
  isOpenModalDelete: boolean;
  onOpenChangeModalDelete: (isOpen: boolean) => void;
  productInfo: {
    totalProduct: number;
    productName: string;
    product_id: number;
  };
}

export default function ModalConfirmDeleteProduct(
  props: IModalConfirmDeleteProductProps,
) {
  const { isOpenModalDelete, onOpenChangeModalDelete, productInfo } = props;

  const { refetch } = useCart();

  const { mutate, isPending } = useDeleteCart({
    onSuccess: () => {
      addToast({
        title: "Xóa sản phẩm thành công",
        description: `Đã xóa ${productInfo.totalProduct} sản phẩm ${productInfo.productName} khỏi giỏ hàng`,
        color: "success",
      });

      refetch();

      onOpenChangeModalDelete(false);
    },

    onError: (error) => {
      addToast({
        title: "Lỗi khi xóa sản phẩm",
        description: error.message,
        color: "danger",
      });
    },
  });

  const handlereDeleteProduct = () => {
    mutate({ product_id: productInfo.product_id });
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpenModalDelete}
      size="md"
      onOpenChange={onOpenChangeModalDelete}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Xác nhận xóa {productInfo.productName}</ModalHeader>

            <ModalBody>
              <p className="text-center">
                Bạn có chắc chắn muốn xóa {productInfo.totalProduct} sản
                phẩm&nbsp;
                <strong>{productInfo.productName}</strong>&nbsp;này khỏi giỏ
                hàng không?
              </p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <Button
                  fullWidth
                  color="default"
                  size="lg"
                  variant="flat"
                  onPress={onClose}
                >
                  Hủy
                </Button>

                <Button
                  fullWidth
                  color="danger"
                  isLoading={isPending}
                  size="lg"
                  onPress={() => handlereDeleteProduct()}
                >
                  Xóa
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
