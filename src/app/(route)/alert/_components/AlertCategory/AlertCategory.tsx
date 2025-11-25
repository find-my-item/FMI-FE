import { Filter } from "@/components";

const AlertCategory = () => {
  const ALERT_CATEGORIES = [
    { key: "all", label: "전체" },
    { key: "categoryKeyword", label: "카테고리 키워드" },
    { key: "chat", label: "채팅" },
    { key: "comment", label: "댓글" },
  ];

  return (
    <div className="mx-auto flex gap-[8px] py-[14px]">
      {ALERT_CATEGORIES.map((category) => (
        <Filter key={category.key} ariaLabel={category.label} onSelected={false}>
          {category.label}
        </Filter>
      ))}
    </div>
  );
};

export default AlertCategory;
