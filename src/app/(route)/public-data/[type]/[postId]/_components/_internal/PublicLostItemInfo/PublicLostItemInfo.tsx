const PublicLostItemInfo = () => {
  return (
    <ul
      aria-label="분실물 정보"
      className="flex flex-col gap-1 rounded-[24px] px-5 py-4 text-body1-regular text-layout-header-default bg-fill-neutral-strong-enteredSelected"
    >
      <li>습득일: 2026-03-15, 01시 경</li>
      <li>분실자명: 홍*동</li>
    </ul>
  );
};

export default PublicLostItemInfo;
