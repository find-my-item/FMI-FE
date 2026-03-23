import Link from "next/link";
import Image from "next/image";

/**
 * @author jikwon
 *
 * @description
 * 베타 테스트 기간 동안 마이페이지에 추가되는 배너
 * 베타 기간 종료 후 제거 예정
 *
 * @example
 * ```tsx
 * <BetaTestMypageBanner />
 * ```
 */
const BetaTestMypageBanner = () => {
  return (
    <Link
      href="https://forms.gle/GZC7fibDFou8R9Di9"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="베타 테스트 참여하러 가기"
      className="block"
    >
      <section className="relative flex items-center justify-between gap-6 overflow-hidden bg-[#0AA874] px-6 py-3">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0AA874_0%,#FFFFFF_100%)] opacity-20" />

        <div className="relative space-y-[18px] leading-[10px] tracking-[-0.05em] text-white">
          <span className="text-[18px]">설문 참여하고</span>
          <span className="block text-[20px] font-bold">커피 쿠폰 받아가세요!</span>
        </div>

        <Image
          src="/beta-test/beta-test-banner-icon.svg"
          alt=""
          width={105}
          height={76}
          draggable={false}
          priority
          className="relative"
        />
      </section>
    </Link>
  );
};

export default BetaTestMypageBanner;
