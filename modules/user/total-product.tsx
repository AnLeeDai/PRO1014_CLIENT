import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  useDisclosure,
} from "@heroui/react";
import { CreditCard, Trash, Pencil } from "lucide-react";
import { useState } from "react";

import { formatVND } from "@/helpers/format-vnd";
import { CartItem } from "@/lib/api/cart";
import ModalConfirmDeleteProduct from "@/components/modal-confirm-delete-product";
import ModalEditProductQuantity from "@/components/modal-edit-product-quantity";

interface ITotalProductProps {
  data: any;
  isLoading: boolean;
  error: any;
  totalPrice: number;
  shippingFee: number;
  totalPayment: number;
  handleShowConfirmModal: () => void;
  orderNowPending: boolean;
}

export default function TotalProduct(props: ITotalProductProps) {
  const {
    data,
    isLoading,
    error,
    totalPrice,
    shippingFee,
    totalPayment,
    handleShowConfirmModal,
  } = props;

  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();

  const [productInfo, setProductInfo] = useState({
    totalProduct: 0,
    productName: "",
    product_id: 0,
  });

  const handleDeleteProduct = (
    productName: string,
    totalProduct: number,
    product_id: number,
  ) => {
    onOpenModalDelete();

    setProductInfo({
      totalProduct,
      productName,
      product_id,
    });
  };

  const handleEditProduct = (
    productName: string,
    totalProduct: number,
    product_id: number,
  ) => {
    onOpenModalEdit();

    setProductInfo({
      totalProduct,
      productName,
      product_id,
    });
  };

  return (
    <>
      <ModalConfirmDeleteProduct
        isOpenModalDelete={isOpenModalDelete}
        productInfo={productInfo}
        onOpenChangeModalDelete={onOpenChangeModalDelete}
      />

      <ModalEditProductQuantity
        isOpen={isOpenModalEdit}
        productInfo={{
          product_id: productInfo.product_id,
          productName: productInfo.productName,
          quantity: productInfo.totalProduct,
        }}
        onOpenChange={onOpenChangeModalEdit}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="mr-2 text-xl font-semibold">Tóm tắt đơn hàng</h2>

            <Chip color="primary" size="md" variant="flat">
              {data?.cart_items.length ?? 0}
            </Chip>
          </div>
        </CardHeader>

        <CardBody className="space-y-5 text-base">
          {isLoading && <p>Đang tải giỏ hàng...</p>}

          {error && <p className="text-red-500">{error.message}</p>}

          {data?.cart_items.map((item: CartItem) => (
            <div
              key={item.cart_item_id}
              className="rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-start gap-4">
                <Image
                  alt={item.product_name}
                  className="rounded-lg object-cover"
                  height={100}
                  src={item.thumbnail}
                  width={100}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base font-semibold">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Số lượng: x{item.quantity}
                      </p>
                    </div>
                    <div className="text-right text-base font-semibold whitespace-nowrap">
                      {formatVND(
                        parseFloat(item.original_price) * item.quantity,
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-between text-sm">
                <Button
                  fullWidth
                  color="danger"
                  startContent={<Trash />}
                  onPress={() =>
                    handleDeleteProduct(
                      item.product_name,
                      item.quantity,
                      item.product_id,
                    )
                  }
                >
                  Xóa khỏi giỏ hàng
                </Button>

                <Button
                  fullWidth
                  color="success"
                  startContent={<Pencil />}
                  onPress={() =>
                    handleEditProduct(
                      item.product_name,
                      item.quantity,
                      item.product_id,
                    )
                  }
                >
                  Chỉnh sửa đơn hàng
                </Button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2 text-base">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatVND(totalPrice ?? 0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{formatVND(shippingFee)}</span>
            </div>

            <div className="flex justify-between font-bold text-xl pt-2">
              <span>Tổng cộng</span>
              <span>{formatVND(totalPayment)}</span>
            </div>
          </div>

          <Button
            fullWidth
            className="mt-4 text-base"
            color="primary"
            size="lg"
            startContent={<CreditCard />}
            onPress={handleShowConfirmModal}
          >
            Thanh toán {formatVND(totalPayment)}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
