import { Icon } from "@/components/common";

interface PublicStorageInfoProps {
  office: string;
  department: string;
  tel: string;
  place: string;
  postId: string;
}

const PublicStorageInfo = ({ office, department, tel, place, postId }: PublicStorageInfoProps) => {
  return (
    <section aria-labelledby="storage-info-title" className="space-y-[18px]">
      <h2 id="storage-info-title" className="text-h2-bold text-layout-header-default">
        보관 정보
      </h2>

      <article className="flex flex-col gap-5 rounded-[24px] px-5 py-4 bg-fill-brand-subtle-default_2">
        <div className="flex items-center justify-between">
          <h3 className="text-body1-semibold text-layout-header-default">{office}</h3>
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
          {department && (
            <li>
              부서: {department} {tel}
            </li>
          )}
          <li>습득 장소: {place}</li>
        </ul>
      </article>
    </section>
  );
};

export default PublicStorageInfo;
