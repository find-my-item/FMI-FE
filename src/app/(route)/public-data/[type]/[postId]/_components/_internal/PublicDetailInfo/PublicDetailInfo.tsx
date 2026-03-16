import { Chip } from "@/components/common";

const PublicDetailInfo = () => {
  return (
    <>
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <Chip type="brandSubtle" label="경찰청" />
          <Chip type="neutralStrong" label="경찰청" />
        </div>
        <h1 className="text-h2-bold text-layout-header-default">
          휴대폰, 검정색 카드지갑 가죽케이스
        </h1>
      </header>
      <p className="text-body1-regular text-layout-header-default">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda nesciunt, illum sunt
        deleniti, eum ut suscipit ipsum perferendis at omnis possimus ducimus recusandae accusamus,
        natus pariatur doloribus nam quod consectetur!
      </p>
    </>
  );
};

export default PublicDetailInfo;
