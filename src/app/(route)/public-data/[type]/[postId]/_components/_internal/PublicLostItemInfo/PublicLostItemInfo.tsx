interface PublicLostItemInfoProps {
  date: string;
  depositor?: string;
  isLost?: boolean;
}

const PublicLostItemInfo = ({ date, depositor, isLost = false }: PublicLostItemInfoProps) => {
  const dateLabel = isLost ? "분실일" : "습득일";

  return (
    <ul
      aria-label="분실물 정보"
      className="flex flex-col gap-1 rounded-[24px] px-5 py-4 text-body1-regular text-layout-header-default bg-fill-neutral-strong-enteredSelected"
    >
      <li>
        {dateLabel}: {date}
      </li>
      {isLost && depositor && <li>분실자명: {depositor}</li>}
    </ul>
  );
};

export default PublicLostItemInfo;
