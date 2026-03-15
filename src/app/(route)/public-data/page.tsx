import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PublicDataList } from "./_components/_internal";

const page = () => {
  return (
    <>
      <DetailHeader title="분실물">
        <HeaderSearch />
      </DetailHeader>

      <div className="h-base">
        <div className="flex items-center gap-2">
          <span className="text-body2-semibold text-neutralInversed-normal-default">지역 선택</span>
          <span className="text-body2-semibold text-neutralInversed-normal-default">카테고리</span>
        </div>

        <PublicDataList />
      </div>
    </>
  );
};

export default page;
