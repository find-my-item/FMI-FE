import Image from "next/image";
import Link from "next/link";

/**
 * @author jikwon
 *
 * @description
 * 베타 테스트 기간 동안 메인 페이지에 추가되는 배너
 * 베타 기간 종료 후 제거 예정
 *
 * @example
 * ```tsx
 * <BetaTestMainBanner />
 * ```
 */
const BetaTestMainBanner = () => {
  return (
    <Link
      href="https://forms.gle/GZC7fibDFou8R9Di9"
      target="_blank"
      rel="noopener noreferrer"
      className="min-h-[101px] w-[120px] rounded-[10px] bg-fg-brand-strong-default px-3 py-[10px] shadow-sm"
    >
      <div className="flex flex-col gap-2 flex-col-center">
        <Image
          src="/beta-test/beta-test-banner-icon.svg"
          alt=""
          width={68}
          height={47}
          priority
          draggable={false}
        />
        <div className="flex flex-col gap-2 text-center text-[12px] leading-[8.1px] tracking-[-0.05em] text-white">
          <span>설문 참여하고</span>
          <span className="font-bold">커피 쿠폰 받아가세요!</span>
        </div>
      </div>
    </Link>
  );
};

export default BetaTestMainBanner;
