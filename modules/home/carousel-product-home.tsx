"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  Skeleton,
} from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Product {
  id: string | number;
  title: string;
  image: string;
  price: string;
}

interface CarouselProductHomeProps {
  data: Product[];
  itemsPerView?: number;
  isLoading?: boolean;
}

const variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
  }),
};

export default function CarouselProductHome({
  data,
  itemsPerView = 4,
  isLoading = false,
}: CarouselProductHomeProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const maxIndex = Math.max(0, data.length - itemsPerView);

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (isLoading || data.length === 0) {
    return (
      <div className="relative w-full overflow-visible">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8">
          {Array.from({ length: itemsPerView }).map((_, index) => (
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
      </div>
    );
  }

  const visibleItems = data.slice(startIndex, startIndex + itemsPerView);

  return (
    <div className="relative w-full overflow-visible">
      {/* Nút Prev */}
      <Button
        className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 
                   rounded-full min-w-10 min-h-10 w-10 h-10
                   flex items-center justify-center p-0 text-base"
        disabled={startIndex === 0}
        variant="shadow"
        onPress={handlePrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Nút Next */}
      <Button
        className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 
                   rounded-full min-w-10 min-h-10 w-10 h-10
                   flex items-center justify-center p-0 text-base"
        disabled={startIndex >= maxIndex}
        variant="shadow"
        onPress={handleNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={startIndex}
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8"
          custom={direction}
          exit="exit"
          initial="hidden"
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          variants={variants}
        >
          {visibleItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="p-2">
                <Image
                  isBlurred
                  isZoomed
                  alt={item.title}
                  className="object-cover rounded-md"
                  height={250}
                  src={item.image}
                  width={1280}
                />
              </CardHeader>

              <CardBody className="p-2">
                <h3 className="text-sm font-medium line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm mt-1">{item.price}</p>
                <Button className="mt-2 w-full" size="md">
                  Xem chi tiết
                </Button>
              </CardBody>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
