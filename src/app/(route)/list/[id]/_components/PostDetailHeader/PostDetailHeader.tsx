import Icon from "@/components/Icon/Icon";
import Link from "next/link";

const PostDetailHeader = () => {
  return (
    <>
      {/* TODO(지권): 게시글 이미지, 추후 이미지 태그 변경 예정 */}
      <div className="h-[260px] bg-flatGray-100" />

      <section
        aria-label="상세페이지 유저 정보"
        className="flex flex-col items-start justify-center gap-5 border-b border-flatGray-50 p-[20px]"
      >
        <div className="flex items-center justify-start gap-[14px]">
          <div className="relative h-10 w-10">
            {/* TODO(지권): 유저 프로필 이미지, 추후 이미지 태그 변경 예정 */}
            <div className="h-full w-full rounded-full bg-flatGray-100" />

            <Icon name="ProfileCheck" size={16} className="absolute bottom-0 right-0" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-[16px]">글자확인용임시닉네임</p>
            <span className="text-[14px] leading-[20px] text-flatGray-600">
              작성글 13 · 현재 채팅 2
            </span>
          </div>
        </div>
        <Link
          href={"/"}
          className="glass-card w-full rounded-[10px] py-[10px] text-body1-semibold text-brand-normal-default bg-fill-brand-normal-default flex-center"
        >
          채팅하러 가기
        </Link>
      </section>
    </>
  );
};

export default PostDetailHeader;
