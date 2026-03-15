import Image from "next/image";
import Link from "next/link";

// TODO(지권): 경로 수정 필요
const POLICE_ITEMS = [
  {
    href: "http://localhost:3000/public-data?search=분실",
    label: "분실\n했어요",
  },
  {
    href: "http://localhost:3000/public-data?search=습득",
    label: "습득\n했어요",
  },
];

const PoliceSection = () => {
  return (
    <div className="flex items-center justify-between gap-[15px] rounded-2xl px-3 py-4 bg-fill-brand-subtle-default_2">
      <div className="flex flex-col gap-[10px] px-3 py-[10px]">
        <span className="whitespace-pre text-body2-semibold text-brand-normal-default">{`경찰청 분실물도\n찾아줘!에서 확인해요`}</span>
        <Image src="/main/police24-icon.svg" alt="경찰민원24로고" width={77} height={21} />
      </div>

      <div className="flex items-center gap-3">
        {POLICE_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="box-border h-14 w-[60px] overflow-hidden rounded-2xl border border-brand-normal-disabled bg-white px-[14px] py-3 flex-col-center"
          >
            <span className="whitespace-pre text-center text-caption1-semibold text-neutralInversed-normal-default transition-colors hover:text-flatGreen-500">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PoliceSection;
