"use client";

import { Image, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

import { bannerImages } from "@/constants/mockdata-banner";

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [index]);

  return (
    <div className="relative w-full overflow-hidden rounded-none h-[400px]">
      {!isLoaded && (
        <Skeleton className="absolute inset-0 rounded-none">
          <div className="h-full bg-default-300" />
        </Skeleton>
      )}

      <Image
        alt={`Banner ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
        height={400}
        src={bannerImages[index]}
        width={1600}
        onLoad={() => setIsLoaded(true)}
      />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              idx === index ? "bg-white" : "bg-gray-400"
            }`}
            role="button"
            style={{ zIndex: 20 }}
            tabIndex={0}
            onClick={() => setIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIndex(idx);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
