import { cn } from "@/utils";
import { getImageLayout } from "@/utils/getImageLayout/getImageLayout";
import Image from "next/image";

const ChatImageBox = ({ images, bubbleOrder }: { images: string[]; bubbleOrder: string }) => {
  const imageLayout = getImageLayout(images);
  const imageCount = images?.length || 0;

  return (
    <>
      {images && images.length > 0 && (
        <>
          {imageCount === 5 ? (
            <div className={cn(bubbleOrder, "flex flex-col gap-2")}>
              <div className="flex gap-2">
                <Image
                  src={imageLayout[0].src}
                  width={148}
                  height={96}
                  alt="내가 전송한 이미지"
                  className="h-[96px] w-[148px] rounded-lg object-cover"
                />
                <Image
                  src={imageLayout[1].src}
                  width={148}
                  height={96}
                  alt="내가 전송한 이미지"
                  className="h-[96px] w-[148px] rounded-lg object-cover"
                />
              </div>
              <div className="flex gap-2">
                {imageLayout.slice(2).map((img, i) => (
                  <Image
                    key={i + 2}
                    src={img.src}
                    width={96}
                    height={96}
                    alt="내가 전송한 이미지"
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                bubbleOrder,
                "grid gap-2",
                imageCount === 3 ? "grid-cols-3" : "grid-cols-2"
              )}
            >
              {imageLayout.map((img, i) => (
                <Image
                  key={i}
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt="내가 전송한 이미지"
                  className={cn(
                    `w-[${img.width}px] h-[${img.height}px]`,
                    "rounded-2xl object-cover",
                    img.colSpan && `col-span-${img.colSpan}`
                  )}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatImageBox;
