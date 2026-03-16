import { Icon } from "@/components/common";
import { PostDetailPreviewKakaoMap } from "@/app/(route)/list/[id]/_components/PostDetail/_internal";

const mapData = {
  address: "서울특별시 00구 00동",
  latitude: 37.5665,
  longitude: 126.978,
  postId: "1",
  radius: 100,
};

const PublicStorageInfo = () => {
  return (
    <section aria-labelledby="storage-info-title" className="space-y-[18px]">
      <h2 id="storage-info-title" className="text-h2-bold text-layout-header-default">
        보관 정보
      </h2>

      <article className="flex flex-col gap-5 rounded-[24px] px-5 py-4 bg-fill-brand-subtle-default_2">
        <div className="flex items-center justify-between">
          <h3 className="text-body1-semibold text-layout-header-default">불암지구대 유실물센터</h3>
          <Icon
            name="PublicDetailPolice24"
            size={100}
            className="h-[21px] w-[100px]"
            title="경찰청 마크"
          />
        </div>
        <ul
          aria-label="보관 장소 상세 정보"
          className="flex flex-col items-start text-body1-regular text-layout-header-default"
        >
          <li>부서: 유실물관리팀 02-3469-0112</li>
          <li>주소: 서울시 강남구 봉은사로 86</li>
          <li>습득 장소: 수유역</li>
        </ul>
      </article>

      <PostDetailPreviewKakaoMap data={mapData} />
    </section>
  );
};

export default PublicStorageInfo;
