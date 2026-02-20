import Link from "next/link";
import { Button, ProfileAvatar } from "@/components/common";
import ImageSection from "./_internal/ImageSection/ImageSection";
import { cn, formatCappedNumber } from "@/utils";
import { ImageResponse, userInformation } from "@/api/fetch/post";

type HeaderData = {
  id: string;
  imageResponseList: ImageResponse[];
  userData: userInformation;
};

interface PostDetailHeaderType {
  headerData: HeaderData;
}

const PostDetailHeader = ({ headerData }: PostDetailHeaderType) => {
  const { id, imageResponseList, userData } = headerData;

  return (
    <>
      <ImageSection imageUrls={imageResponseList.map((item) => item.imgUrl)} />

      <section
        aria-label="게시글 작성자 정보"
        className={cn(
          "flex flex-col items-start justify-center gap-5 border-b border-divider-default p-5",
          "tablet:flex-row tablet:items-center tablet:justify-between"
        )}
      >
        <div className={cn("flex items-center justify-start gap-[14px]", "tablet:w-[461px]")}>
          <ProfileAvatar
            size={40}
            src={userData.profileImage}
            alt={userData.nickName}
            priority={true}
          />

          <div className="flex flex-col items-start justify-center">
            <p className="text-body1-medium text-layout-header-default">{userData.nickName}</p>
            <div className="text-body2-regular text-layout-body-default">
              <span className="after:mx-2 after:inline-block after:content-['·']">
                작성글 {formatCappedNumber(userData.postCount)}
              </span>
              <span>현재 채팅 {formatCappedNumber(userData.chattingCount)}</span>
            </div>
          </div>
        </div>

        <Button
          as={Link}
          href={`/chat/${id}`}
          className={cn("min-h-11 w-full py-[10px]", "tablet:flex-1")}
        >
          채팅하러 가기
        </Button>
      </section>
    </>
  );
};

export default PostDetailHeader;
