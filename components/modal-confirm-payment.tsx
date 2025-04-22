import {
  Modal,
  Image,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { QrCode, X, CheckCircle } from "lucide-react";

interface IModalConfirmPaymentProps {
  isConfirmModalOpen: boolean;
  setConfirmModalOpen: (open: boolean) => void;
  userInfo: any;
  orderNowPending: boolean;
  handleConfirmCheckout: () => void;
}

export default function ModalConfirmPayment({
  isConfirmModalOpen,
  setConfirmModalOpen,
  userInfo,
  orderNowPending,
  handleConfirmCheckout,
}: IModalConfirmPaymentProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isConfirmModalOpen}
      size="md"
      onClose={() => setConfirmModalOpen(false)}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <QrCode size={20} />
          Xác nhận thanh toán
        </ModalHeader>

        <ModalBody>
          <Image
            alt="QR code thanh toán"
            height={500}
            src="/my_qr_code.png"
            width={1280}
          />

          <p className="mt-4 text-center">
            Quét mã để hoàn tất thanh toán – nội dung chuyển khoản: &nbsp;
            <strong>
              {userInfo?.user.user_id} – {userInfo?.user.full_name}
            </strong>
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <Button
              fullWidth
              color="default"
              size="lg"
              startContent={<X />}
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
              startContent={<CheckCircle />}
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
