import Link from "next/link";
import { Chip, ListItemImage } from "@/components/common";
import { cn, formatDate } from "@/utils";

const PublicDataList = () => {
  return (
    <section aria-label="목록">
      {Array.from({ length: 10 }).map((_, i) => (
        <PublicDataItem key={i} />
      ))}
    </section>
  );
};

export default PublicDataList;

const PublicDataItem = () => {
  return (
    <li>
      <Link
        href={"#"}
        aria-label="휴대폰, 검정색 카드지갑 가죽케이스"
        className={cn(
          "flex w-full items-center gap-[14px] px-5 py-[30px]",
          "border-b border-b-flatGray-50"
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex gap-2">
            <Chip label="경찰청" type="brandSubtle" />
            <Chip label="전자기기" type="neutralStrong" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full">
              <div className="flex items-center gap-1">
                <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                  휴대폰, 검정색 카드지갑 가죽케이스
                </h2>
              </div>
              <span className="text-body2-regular text-layout-body-default">
                <span className="after:inline-block after:px-1 after:content-['·']">
                  강남경찰서 유실물센터
                </span>
                <time dateTime={"2025.11.11"}>{formatDate("2025.11.11")}</time>
              </span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <p className="text-neutral-normal-default">
              <span className="after:inline-block after:px-[2px]">분실자명</span>
              <span className="text-body2-regular">홍*동</span>
            </p>
          </div>
        </div>

        <ListItemImage src={"/test_list.JPG"} alt="게시글 대표 이미지" size={90} />
      </Link>
    </li>
  );
};
