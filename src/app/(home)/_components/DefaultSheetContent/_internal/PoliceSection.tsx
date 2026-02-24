import Image from "next/image";
import Link from "next/link";

const POLICE_ITEMS = [
  {
    href: "https://minwon24.police.go.kr/cvlcpt/cvlcptGdInfo.do?cvlcptId=MW-001",
    label: "분실물\n신고",
  },
  {
    href: "https://minwon24.police.go.kr/cvlcpt/cvlcptAply.do?cvlcptId=MW-201&keyword=",
    label: "습득물\n검색",
  },
  {
    href: "https://minwon24.police.go.kr/login/loginLost112.do",
    label: "기관용\n분실물",
  },
];

const PoliceSection = () => {
  return (
    <div className="flex items-center gap-[15px] rounded-2xl px-3 py-4 bg-fill-brand-subtle-default_2">
      <Link
        href="https://minwon24.police.go.kr/main.do"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-[10px] px-3 py-[10px]"
      >
        <Image src="/main/police24-icon.svg" alt="경찰민원24로고" width={77} height={21} />
        <span className="text-body2-semibold text-brand-normal-default">바로가기</span>
      </Link>
      {POLICE_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="box-border h-14 w-[60px] overflow-hidden rounded-2xl border border-brand-normal-disabled bg-white px-[14px] py-3 flex-col-center"
        >
          <span className="whitespace-pre text-center text-caption1-semibold text-neutralInversed-normal-default transition-colors hover:text-flatGreen-500">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default PoliceSection;
