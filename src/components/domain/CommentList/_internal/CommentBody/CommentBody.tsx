import { ImageList } from "@/types";
import Image from "next/image";

/**
 * 댓글 내용 및 이미지
 *
 * @author jikwon
 */

interface CommentBodyProps {
  bodyData: {
    /** 댓글 내용 */
    content: string;
    /** 댓글 이미지 목록 */
    images: ImageList[];
  };
}

const CommentBody = ({ bodyData }: CommentBodyProps) => {
  const { content, images } = bodyData;

  return (
    <div>
      <p className="whitespace-pre-wrap break-all text-body1-regular text-layout-header-default">
        {content}
      </p>
      {images.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((image, i) => (
            <Image
              key={image.id}
              src={image.imageUrl}
              width={80}
              height={80}
              alt={`이미지-${i}`}
              className="h-20 w-20 rounded-[16px] object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBody;
