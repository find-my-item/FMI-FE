"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Chip, ListItemImage } from "@/components/common";
import { EmptyState, LoadingState } from "@/components/state";
import { cn, formatDate } from "@/utils";
import { PublicDataItem } from "@/types";
import { useToast } from "@/context/ToastContext";
import { usePublicDataListQuery } from "../../../_hooks/usePublicDataListQuery/usePublicDataListQuery";

const PublicDataList = () => {
  const { addToast } = useToast();
  const { data, isLoading, isError } = usePublicDataListQuery();

  useEffect(() => {
    if (isError) {
      addToast("데이터를 불러오지 못했어요.", "error");
    }
  }, [isError]);

  if (isLoading) return <LoadingState />;

  const items = data?.items?.item;
  const itemList = Array.isArray(items) ? items : items ? [items] : [];

  if (itemList.length === 0) {
    return (
      <EmptyState
        icon={{
          iconName: "NoPosts",
          iconSize: 70,
        }}
        title="조회된 데이터가 없습니다."
      />
    );
  }

  return (
    <section aria-label="목록">
      <ul>
        {itemList.map((item) => (
          <PublicDataItemCard key={item.atcId} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default PublicDataList;

interface PublicDataItemCardProps {
  item: PublicDataItem;
}
const NO_IMAGE_URL = "https://minwon24.police.go.kr/images/sub/img02_no_img.gif";

const PublicDataItemCard = ({ item }: PublicDataItemCardProps) => {
  const type = "found"; // 우선 습득물로 고정 (추후 URL type에 따라 변경 가능)
  const postId = item.atcId;

  const imageSrc =
    item.fdFilePathImg && item.fdFilePathImg !== NO_IMAGE_URL ? item.fdFilePathImg : null;

  return (
    <li>
      <Link
        href={`/public-data/${type}/${postId}`}
        aria-label={item.fdPrdtNm || item.fdSbjt}
        className={cn(
          "flex w-full items-center gap-[14px] px-5 py-[30px]",
          "border-b border-b-flatGray-50"
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex gap-2">
            <Chip label="경찰청" type="brandSubtle" />
            <Chip label={item.prdtClNm} type="neutralStrong" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="flex items-center gap-1">
                <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                  {item.fdPrdtNm || item.fdSbjt}
                </h2>
              </div>
              <span className="text-body2-regular text-layout-body-default">
                <span className="after:inline-block after:px-1 after:content-['·']">
                  {item.depPlace}
                </span>
                <time dateTime={item.fdYmd}>{formatDate(item.fdYmd)}</time>
              </span>
            </div>
            {/* TODO(지권): 분실일때만 노출 */}
            <div className="text-neutral-normal-default">
              {/* TODO(지권): 디자인 토큰 누락 */}
              <span className="text-[14px] font-bold leading-[140%] after:px-[2px]">분실자명</span>
              <span className="text-body2-regular">{item.depPlace}</span>
            </div>
          </div>
        </div>

        <ListItemImage src={imageSrc} alt="게시글 대표 이미지" size={90} />
      </Link>
    </li>
  );
};
