import { InquiriesCommentType } from "@/api/fetch/inquiry";
import { Chip, ProfileAvatar } from "@/components/common";
import { cn, formatDate } from "@/utils";
import Image from "next/image";

interface InquiryCommentItemProps {
  data: InquiriesCommentType;
}

const InquiryCommentItem = ({ data }: InquiryCommentItemProps) => {
  const { content, authorName, createdAt, profileImg, imageList, admin } = data;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-b border-neutral-normal-default px-5 py-9",
        admin && "bg-fill-neutral-strong-default"
      )}
    >
      <header className="flex gap-[14px]">
        <ProfileAvatar src={profileImg} size={30} />

        <span className="flex flex-col gap-[2px]">
          <span className="flex gap-[6px]">
            {admin && <Chip label="관리자" type="admin" />}
            <span className="text-body1-medium text-layout-header-default">{authorName}</span>
          </span>

          <time dateTime={createdAt} className="text-body2-regular text-layout-body-default">
            {formatDate(createdAt)}
          </time>
        </span>
      </header>

      <p className="text-body1-regular text-layout-header-default">{content}</p>
      {imageList && imageList.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {imageList.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-square w-[100px] overflow-hidden rounded-lg border border-divider-default"
            >
              <Image
                src={src}
                alt={`첨부 이미지 ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default InquiryCommentItem;
