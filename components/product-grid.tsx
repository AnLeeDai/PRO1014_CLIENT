import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import { Eye } from "lucide-react";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ModalDetailProduct from "./modal-detail-product";

import { slugify } from "@/helpers/slugify";

interface Product {
  id: number;
  product_name: string;
  thumbnail: string;
  price: string;
}
interface ProductGridProps {
  data: { data: Product[] };
  isLoading?: boolean;
}

function ProductGridInner(
  { data, isLoading = false }: ProductGridProps,
  ref: Ref<{ open: (id: number) => void }>,
) {
  const router = useRouter();
  const search = useSearchParams();
  const urlId = Number(search.get("id"));

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>();

  useImperativeHandle(ref, () => ({
    open: (id: number) => {
      const product = data.data.find((p) => p.id === id);

      if (product) handleViewDetail(product);
    },
  }));

  useEffect(() => {
    if (urlId && !isOpenModal) {
      const product = data.data.find((p) => p.id === urlId);

      if (product) handleViewDetail(product);
    }
  }, [urlId, data.data]);

  const handleViewDetail = (product: Product) => {
    setSelectedProductId(product.id);

    router.push(
      `/product-detail/${slugify(product.product_name)}?id=${product.id}`,
      { scroll: false },
    );

    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedProductId(undefined);
    setIsOpenModal(false);
    // router.push(siteConfig.routes.home, { scroll: false });
    router.back();
  };

  if (!isLoading && data.data.length === 0)
    return (
      <div className="py-10 text-center text-lg font-medium">
        Chưa có sản phẩm nào
      </div>
    );

  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-2">
              <Skeleton className="rounded-lg">
                <div className="h-[320px] rounded-lg bg-default-300" />
              </Skeleton>
            </CardHeader>

            <CardBody className="space-y-2 p-2">
              <Skeleton className="h-6 w-3/4 rounded-lg bg-default-300" />
              <Skeleton className="h-6 w-1/2 rounded-lg bg-default-300" />
              <Skeleton className="h-8 rounded-lg bg-default-300" />
            </CardBody>
          </Card>
        ))}
      </div>
    );

  return (
    <>
      <ModalDetailProduct
        isOpen={isOpenModal}
        productId={selectedProductId ?? 0}
        onClose={handleModalClose}
        onOpenChange={setIsOpenModal}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-2">
              <Image
                isBlurred
                isZoomed
                alt={item.product_name}
                className="cursor-pointer"
                height={320}
                src={item.thumbnail}
                width={500}
                onClick={() => handleViewDetail(item)}
              />
            </CardHeader>

            <CardBody className="p-2">
              <Tooltip content={item.product_name} size="lg">
                <h3 className="line-clamp-1 text-lg font-bold">
                  {item.product_name}
                </h3>
              </Tooltip>

              <p className="mt-1 text-lg">
                ₫{parseInt(item.price).toLocaleString("vi-VN")}
              </p>

              <Button
                className="mt-2 w-full"
                color="primary"
                size="md"
                startContent={<Eye />}
                onPress={() => handleViewDetail(item)}
              >
                Xem chi tiết
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

export default forwardRef(ProductGridInner);
