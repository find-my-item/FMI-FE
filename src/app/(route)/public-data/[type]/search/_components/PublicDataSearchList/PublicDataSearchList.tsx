import { PublicDataTabType } from "@/app/(route)/public-data/_types/PublicDataTabType";
import { PublicDataItemCard } from "../../../../_components/_internal";

// TODO(지권): 기능 개발 후 삭제
const items = Array.from({ length: 10 }).map((_, index) => ({
  atcId: `${index}`,
  depPlace: "분실장소",
  fdFilePathImg: "https://minwon24.police.go.kr/images/sub/img02_no_img.gif",
  fdPrdtNm: "분실물",
  fdSbjt: "분실물",
  fdYmd: "2022-01-01",
  prdtClNm: "분실물",
  rnum: `${index}`,
}));

interface PublicDataSearchListProps {
  type: PublicDataTabType;
}

const PublicDataSearchList = ({ type }: PublicDataSearchListProps) => {
  return (
    <section>
      <ul>
        {items.map((item) => (
          <PublicDataItemCard key={item.atcId} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default PublicDataSearchList;
