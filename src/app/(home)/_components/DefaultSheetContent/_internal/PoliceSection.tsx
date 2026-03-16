import Image from "next/image";
import Link from "next/link";

// TODO(지권): 경로 수정 필요
const POLICE_ITEMS = [
  {
    href: "http://localhost:3000/public-data?type=lost",
    headLabel: "분실",
    label: "했어요",
  },
  {
    href: "http://localhost:3000/public-data?type=found",
    headLabel: "발견",
    label: "했어요",
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
            className="group box-border h-14 w-[60px] overflow-hidden rounded-2xl border border-brand-normal-disabled bg-white px-[14px] py-3 flex-col-center"
          >
            <div className="flex flex-col items-center text-center text-caption1-medium transition-colors">
              <span className="text-neutralInversed-normal-focused group-hover:text-caption1-semibold group-hover:text-flatGreen-500">
                {item.headLabel}
              </span>
              <span className="text-neutralInversed-normal-default group-hover:text-caption1-semibold group-hover:text-flatGreen-500">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PoliceSection;
