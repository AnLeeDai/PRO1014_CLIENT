"use client";

import { useParams } from "next/navigation";

import SearchContainer from "@/modules/product/search-container";

export default function SearchPage() {
  const { slug } = useParams();

  return <SearchContainer keyword={decodeURIComponent(slug as string)} />;
}
