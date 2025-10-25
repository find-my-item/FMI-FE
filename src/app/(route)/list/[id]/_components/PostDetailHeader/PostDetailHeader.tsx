import Icon from "@/components/Icon/Icon";
import Link from "next/link";

const PostDetailHeader = () => {
  return (
    <>
      {/* TODO(지권): 추후 이미지 태그 변경 예정 */}
      <div className="h-[260px] bg-[#D9D9D9]" />

      <section className="flex flex-col items-start justify-center gap-5 border-b border-[#E4E4E4] p-[20px]">
        <div className="flex items-center justify-start gap-[14px]">
          <div className="relative h-10 w-10">
            <div className="h-full w-full rounded-full bg-[#D9D9D9]" />

            <Icon name="ProfileCheck" size={16} className="absolute bottom-0 right-0" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-[16px]">글자확인용임시닉네임</p>
            <span className="text-[14px] leading-[20px] text-[#5D5D5D]">
              작성글 13 · 현재 채팅 2
            </span>
          </div>
        </div>
        <Link
          href={"/"}
          className="glass-card w-full rounded-[10px] bg-[#1EB87B]/70 py-[14px] font-semibold leading-[150%] text-white flex-center"
        >
          채팅하러 가기
        </Link>
      </section>
    </>
  );
};

export default PostDetailHeader;
