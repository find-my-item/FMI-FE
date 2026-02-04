import { Icon } from "@/components/common";

const AdminReportsDetailSection = () => {
  return (
    <section
      aria-label="신고/문의 내용"
      className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
    >
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1">
          접수 <Icon name="ArrowDown" size={10} />
        </button>
        <span>답변 완료</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {/* TODO(지권): 디자인 토큰 누락 */}
          <h2 className="text-[20px] font-semibold text-layout-header-default">
            실제 분실물/습득물이 아닌 내용이에요.
          </h2>
          <div className="flex items-center gap-2 text-body2-regular text-layout-body-default">
            <span className="block after:mx-2 after:content-['·']">닉네임최대열글자확인</span>
            <time dateTime="2025-05-06">2025.05.06</time>
          </div>
        </div>

        <p className="text-body1-regular text-layout-header-default">
          여기에 신고 내용이 표기됩니다.
        </p>
      </div>
    </section>
  );
};

export default AdminReportsDetailSection;
