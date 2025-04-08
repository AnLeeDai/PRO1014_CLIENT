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

interface Product {
  id: string | number;
  product_name: string;
  thumbnail: string;
  price: string;
}

interface ProductGridProps {
  data: {
    data: Product[];
  };
  isLoading?: boolean;
  onOpenModal?: (product: Product) => void;
}

export default function ProductGrid({
  data,
  isLoading = false,
  onOpenModal,
}: ProductGridProps) {
  console.log(data);

  if (!isLoading && data.data.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Chưa có sản phẩm nào
      </div>
    );
  }

  if (isLoading || data.data.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={`skeleton-${index}`}>
            <CardHeader className="p-2">
              <Skeleton className="rounded-lg">
                <div className="h-[250px] rounded-lg bg-default-300" />
              </Skeleton>
            </CardHeader>

            <CardBody className="p-2 space-y-2">
              <Skeleton className="rounded-lg">
                <div className="h-6 rounded-lg bg-default-300 w-3/4" />
              </Skeleton>

              <Skeleton className="rounded-lg">
                <div className="h-6 rounded-lg bg-default-300 w-1/2" />
              </Skeleton>

              <Skeleton className="rounded-lg">
                <div className="h-8 rounded-lg bg-default-300" />
              </Skeleton>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.data.map((item) => (
        <Card key={item.id}>
          <CardHeader className="p-2">
            <Image
              isBlurred
              isZoomed
              alt={item.product_name}
              className="object-cover rounded-md"
              height={250}
              src={item.thumbnail}
              width={1920}
            />
          </CardHeader>

          <CardBody className="p-2">
            <Tooltip content={item.product_name} size="lg">
              <h3 className="text-lg font-bold line-clamp-1">
                {item.product_name}
              </h3>
            </Tooltip>

            <p className="text-lg mt-1">{item.price}</p>

            <Button
              className="mt-2 w-full"
              color="primary"
              size="md"
              startContent={<Eye />}
              onPress={() => onOpenModal?.(item)}
            >
              Xem chi tiết
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
