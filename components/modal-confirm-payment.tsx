import {
  Modal,
  Image,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";

interface IModalConfirmPaymentProps {
  isConfirmModalOpen: boolean;
  setConfirmModalOpen: (isOpen: boolean) => void;
  userInfo: any;
  orderNowPending: boolean;
  handleConfirmCheckout: () => void;
}

export default function ModalConfirmPayment(props: IModalConfirmPaymentProps) {
  const {
    isConfirmModalOpen,
    setConfirmModalOpen,
    userInfo,
    orderNowPending,
    handleConfirmCheckout,
  } = props;

  return (
    <Modal
      backdrop="blur"
      isOpen={isConfirmModalOpen}
      size="md"
      onClose={() => setConfirmModalOpen(false)}
    >
      <ModalContent>
        <ModalHeader>Xác nhận thanh toán</ModalHeader>

        <ModalBody>
          <Image
            alt="QR code thanh toán"
            height={500}
            src="/my_qr_code.png"
            width={1280}
          />
          <p className="text-center mt-4">
            Quét mã để hoàn tất thanh toán nội dung chuyển khoản là:&nbsp;
            <strong>
              {userInfo?.user.user_id} - {userInfo?.user.full_name}
            </strong>
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <Button
              fullWidth
              color="default"
              size="lg"
              variant="flat"
              onPress={() => setConfirmModalOpen(false)}
            >
              Hủy
            </Button>

            <Button
              fullWidth
              color="primary"
              isLoading={orderNowPending}
              size="lg"
              onPress={handleConfirmCheckout}
            >
              Xác nhận
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
