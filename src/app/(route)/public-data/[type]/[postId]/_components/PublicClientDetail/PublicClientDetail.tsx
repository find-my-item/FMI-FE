"use client";

import { LoadingState } from "@/components/state";
import { DetailHeader } from "@/components/layout";
import { HeaderShare } from "@/components/layout/DetailHeader/DetailHeaderParts";
import {
  PublicDetailHeader,
  PublicDetailInfo,
  PublicLostItemInfo,
  PublicStorageInfo,
} from "../_internal";
import { usePublicClientDetail } from "../../_hooks/usePublicClientDetail/usePublicClientDetail";

const PublicClientDetail = ({ id }: { id: string }) => {
  const { isLoading, isError, detailData } = usePublicClientDetail(id);

  if (isLoading || isError || !detailData) return <LoadingState />;

  const { isLost, headerData, itemData, title, content, place, office, tel } = detailData;

  return (
    <>
      <DetailHeader>
        <HeaderShare />
      </DetailHeader>

      <article className="h-base">
        <PublicDetailHeader headerData={headerData} />

        <div className="space-y-8 px-5 py-[30px]">
          <PublicDetailInfo category={itemData.prdtClNm} title={title} content={content} />
          <PublicLostItemInfo date={itemData.fdYmd} isLost={isLost} />
          <PublicStorageInfo
            office={office}
            department={office}
            tel={tel}
            place={place}
            isLost={isLost}
          />
        </div>
      </article>
    </>
  );
};

export default PublicClientDetail;
