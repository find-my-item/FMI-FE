import Link from "next/link";

import Image from "next/image";
import { Button } from "@/components/common";
import ImageSection from "./_internal/ImageSection/ImageSection";

type HeaderData = {
  imageUrls: string[];
  postId: string;
  nickName: string;
  profileUrl: string | null;
  userPostCount: number;
  chatRoomCount: number;
};

interface PostDetailHeaderType {
  headerData: HeaderData;
}
const PostDetailHeader = ({ headerData }: PostDetailHeaderType) => {
  const { imageUrls, postId, nickName, profileUrl, userPostCount, chatRoomCount } = headerData;

  return (
    <>
      <ImageSection imageUrls={imageUrls} />

      <section
        aria-label="게시글 작성자 정보"
        className="flex flex-col items-start justify-center gap-5 border-b border-flatGray-50 p-[20px]"
      >
        <div className="flex items-center justify-start gap-[14px]">
          {/* TODO(지권): 대체 이미지 변경 필요 */}
          <Image
            src={profileUrl || "/test_list.JPG"}
            alt={`${nickName} 프로필`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />

          <div className="flex flex-col items-start justify-center">
            <p className="text-[16px]">{nickName}</p>
            <div className="text-[14px] leading-[20px] text-flatGray-600">
              <span className="after:mx-2 after:inline-block after:content-['·']">
                작성글 {userPostCount || 0}
              </span>
              <span>현재 채팅 {chatRoomCount || 0}</span>
            </div>
          </div>
        </div>

        <Button as={Link} href={`/chat/${postId}`} className="w-full py-[10px]">
          채팅하러 가기
        </Button>
      </section>
    </>
  );
};

export default PostDetailHeader;
