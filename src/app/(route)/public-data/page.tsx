import { DetailHeader } from "@/components/layout";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { PublicDataList } from "./_components/_internal";
import { Icon } from "@/components/common";

const page = () => {
  return (
    <>
      <DetailHeader title={<Icon name="DetailPolice24" size={154} />}>
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
