import { ImageList } from "@/types";
import Image from "next/image";

interface CommentBodyProps {
  bodyData: {
    content: string;
    images: ImageList[];
  };
}

const CommentBody = ({ bodyData }: CommentBodyProps) => {
  const { content, images } = bodyData;

  // 댓글 내용
  // TODO(지권): 이미지 있을 때 디자인 추가 필요, 현재 임시 구현
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
              className="h-20 w-20 rounded-[10px] object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBody;
