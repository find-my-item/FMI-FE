import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common";
import PopupLayout from "../../PopupLayout/PopupLayout";

interface BetaTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @author jikwon
 *
 * @description
 * 베타 테스트 설문 참여 팝업
 *
 * @example
 * ```tsx
 * <BetaTestModal isOpen={isOpen} onClose={onClose} />
 * ```
 */
const BetaTestModal = ({ isOpen, onClose }: BetaTestModalProps) => {
  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className="space-y-10 px-5 py-16 text-center flex-col-center"
    >
      <Image
        src="/beta-test/beta-test-modal-icon.svg"
        alt=""
        width={102}
        height={72}
        priority
        draggable={false}
      />

      <div className="flex flex-col gap-3 whitespace-pre-wrap">
        <h2 className="text-h3-semibold text-layout-header-default">
          찾아줘, 잘 쓰고 계신가요?{`\n`}설문 참여하고 커피 쿠폰 받아가세요!
        </h2>
        <p className="text-body2-medium text-layout-body-default">
          여러분의 의견을 설문으로 들려주세요.{`\n`}추첨을 통해 커피 쿠폰을 드려요!
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button
          as={Link}
          href="https://forms.gle/GZC7fibDFou8R9Di9"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 w-full"
          onClick={onClose}
        >
          설문 참여하기
        </Button>
        <button
          className="text-body2-semibold text-neutralInversed-strong-default"
          onClick={onClose}
        >
          다음에 할래요
        </button>
      </div>
    </PopupLayout>
  );
};

export default BetaTestModal;
