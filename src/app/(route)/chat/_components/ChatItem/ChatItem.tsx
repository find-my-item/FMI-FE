import Image from "next/image";
import Link from "next/link";
import { MOCK_IMAGES } from "./MOCK_IMAGES";

const ChatItem = () => {
  return (
    <Link
      href={"chat/room/1"}
      className="flex min-h-[113px] w-full items-center gap-[12px] border-b border-divider-default px-[16px] py-[24px] duration-150 hover:bg-flatGray-25"
    >
      <section className="relative h-[58px] w-[58px] shrink-0">
        <Image
          alt="유저 프로필 이미지"
          src={MOCK_IMAGES[0]}
          width={26}
          height={26}
          className="absolute left-0 top-0 z-10 rounded-full border-[1.5px] border-white"
        />
        <Image
          alt="게시글 썸네일 이미지"
          src={MOCK_IMAGES[1]}
          width={50}
          height={50}
          className="absolute bottom-0 right-0 rounded"
        />
      </section>

      <section className="min-w-0 space-y-[2px]">
        <div className="flex items-center justify-between">
          <span className="text-h3-semibold text-layout-header-default">사용자 닉네임</span>
          <span className="h-[16px] w-[16px] rounded-full bg-flatGreen-500 text-caption2-semibold text-white flex-center">
            1
          </span>
        </div>
        <p className="text-caption1-medium text-layout-body-default">
          서울시 강남구 신사동 · 10분 전
        </p>
        <p className="truncate text-body2-medium text-layout-header-default">
          안녕하세요! 혹시 올리신 검정색 카드 지갑, 명동에서 습득하신 지갑이실까요? 혹시나 해서
        </p>
      </section>
    </Link>
  );
};

export default ChatItem;
