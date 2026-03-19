"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";

const SEARCH_PATH = {
  lost: "/public-data/lost/search",
  found: "/public-data/found/search",
} as const;

const PublicDetailHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawType = searchParams.get("type");
  const type = rawType === "found" ? "found" : "lost";

  return (
    <DetailHeader
      title={
        <Image
          src="/public-data/public-detail-police24.svg"
          alt=""
          width={130}
          height={26}
          priority
        />
      }
    >
      <HeaderSearch onClick={() => router.push(SEARCH_PATH[type])} />
    </DetailHeader>
  );
};

export default PublicDetailHeader;
