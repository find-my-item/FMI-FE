import { Icon } from "@/components/common";

const ActivityContainer = () => {
  return (
    <section className="w-full">
      <h2 className="sr-only">내 활동 내역 영역</h2>

      <h3 className="text-h3-semibold text-layout-header-default bg-fill-accent-foundItem">날짜</h3>
      <div>
        <div className="h-9 w-9 bg-fill-brand-normal-default">
          <Icon name="Comment" size={18} />
        </div>
      </div>
    </section>
  );
};

export default ActivityContainer;

// inquiry: bg-fill-brand-normal-default
// report: bg-fill-neutral-strong-default (접수)
// report: bg-fill-brand-normal-default (처리)
// alert: bg-fill-brand-normal-default
// star: bg-system-bookmark (즐겨찾기)
// post: bg-
