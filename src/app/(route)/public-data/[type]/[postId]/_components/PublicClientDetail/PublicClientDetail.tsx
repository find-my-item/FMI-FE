"use client";

import { useParams } from "next/navigation";
import { LoadingState } from "@/components/state";
import { DetailHeader } from "@/components/layout";
import { HeaderShare } from "@/components/layout/DetailHeader/DetailHeaderParts";
import {
  PublicDetailHeader,
  PublicDetailInfo,
  PublicLostItemInfo,
  PublicStorageInfo,
} from "../_internal";
import { usePublicDataDetailQuery } from "../../_hooks/usePublicDataDetailQuery/usePublicDataDetailQuery";
import { PublicDataTabType } from "@/app/(route)/public-data/_types/PublicDataTabType";

const NO_IMAGE_URL = "https://minwon24.police.go.kr/images/sub/img04_no_img.gif";

const PublicClientDetail = ({ id }: { id: string }) => {
  const { type } = useParams();
  const tabType = (type === "lost" ? "lost" : "found") as PublicDataTabType;
  const isLost = tabType === "lost";

  const { data, isLoading, isError } = usePublicDataDetailQuery(id, tabType);

  if (isLoading) return <LoadingState />;

  if (isError || !data) {
    return <LoadingState />;
  }

  const imageSrc =
    data.fdFilePathImg && data.fdFilePathImg !== NO_IMAGE_URL ? data.fdFilePathImg : null;

  const headerData = {
    id: data.atcId,
    imageResponseList: imageSrc
      ? [
          {
            id: 1,
            imgUrl: imageSrc,
            imageType: "THUMBNAIL" as const,
          },
        ]
      : [],
    userData: {
      userId: 0,
      nickName: data.depPlace,
      profileImage: "",
      postCount: 0,
      chattingCount: 0,
    },
    location: data.depPlace,
    phoneNumber: data.tel,
  };

  return (
    <>
      <DetailHeader>
        <HeaderShare />
      </DetailHeader>

      <article className="h-base">
        <PublicDetailHeader headerData={headerData} />

        <div className="space-y-8 px-5 py-[30px]">
          <PublicDetailInfo category={data.prdtClNm} title={data.fdPrdtNm} content={data.uniq} />
          <PublicLostItemInfo date={data.fdYmd} depositor={data.uniq} isLost={isLost} />
          <PublicStorageInfo
            office={data.depPlace}
            department={data.depPlace}
            tel={data.tel}
            place={data.fdPlace}
            postId={id}
          />
        </div>
      </article>
    </>
  );
};

export default PublicClientDetail;
