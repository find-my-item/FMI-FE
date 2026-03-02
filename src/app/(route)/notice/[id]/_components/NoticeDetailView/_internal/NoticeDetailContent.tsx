import { Icon } from "@/components/common";

const NoticeNewBadge = () => {
  return (
    <div className="inline-block rounded-full px-2 py-1 text-caption2-medium text-white bg-fill-brand-normal-default">
      NEW
    </div>
  );
};

const NoticeDetailContent = () => {
  return (
    <section className="space-y-3 px-5 py-[30px]">
      <NoticeNewBadge />

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-h2-bold text-layout-header-default">
            여기에 공지사항 제목이 들어갑니다.
          </h2>
          <div className="text-body2-regular text-layout-body-default">
            <time className="after:mx-2 after:content-['·']">2025.10.15</time>
            <span>관리자</span>
          </div>
        </div>

        <p className="text-body1-regular text-layout-header-default">
          여기에 공지사항 내용이 들어갑니다. 이 글은 텍스트가 들어가는 느낌을 확인하기 위해 임의로
          작성하는 글입니다. 여기에 공지사항 내용이 들어갑니다. 이 글은 텍스트가 들어가는 느낌을
          확인하기 위해 임의로 작성하는 글입니다.
        </p>

        <div className="flex gap-3 text-body2-regular text-neutral-strong-placeholder">
          <div className="flex items-center gap-1">
            <Icon name="Like" size={16} className="text-flatGray-100" />
            <span>추천 12</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={16} className="text-flatGray-100" />
            <span>조회 24</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeDetailContent;
