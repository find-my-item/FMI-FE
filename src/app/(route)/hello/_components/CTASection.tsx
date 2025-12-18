import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components";

const CTASection = () => {
  return (
    <section className="gap-5 px-9 py-[60px] text-center flex-col-center">
      <Image src="/hello/service-CTA.svg" alt="" width={70} height={70} />
      <h2 className="text-h1-bold text-layout-header-default">분실의 걱정을 가볍게, 찾아줘!</h2>
      <p className="text-body1-regular text-layout-body-default">
        '찾아줘!'와 함께라면, 잃어버린 순간도 조금은 덜 답답해질 거예요.
      </p>
      <Button as={Link} href="/" className="mt-[30px] min-h-[44px] w-full">
        찾아줘! 홈으로 이동
      </Button>
    </section>
  );
};

export default CTASection;
