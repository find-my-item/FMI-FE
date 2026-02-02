import Image from "next/image";
import { cn } from "@/utils";
import { CategoryType } from "@/types";
import Icon, { IconName } from "../Icon/Icon";

/**
 * @author jikwon
 *
 * @description
 * 리스트 아이템 이미지에 사용되는 컴포넌트입니다.
 * 이미지가 없는 경우 렌더링하지 않습니다.
 *
 * @param src - 리스트 아이템 이미지 URL
 * @param alt - 리스트 아이템 이미지 대체 텍스트
 * @param size - 리스트 아이템 이미지 크기(px)
 * @param className - 추가 클래스명
 * @param priority - LCP 대상 여부 (헤더 등 주요 위치에서만 사용)
 * @param imageCount - 이미지 개수 (1개 이상일 때만 표시)
 */
interface ListItemImageProps {
  src?: string | null;
  alt: string;
  size: number;
  priority?: boolean;
  className?: string;
  imageCount?: number;
  category: CategoryType;
}

const CATEGORY_ICON_MAP: Record<CategoryType, IconName> = {
  ELECTRONICS: "Electronics",
  WALLET: "Wallet",
  ID_CARD: "IdCard",
  JEWELRY: "Jewelry",
  BAG: "ArrowDown", // TODO(지권): 가방 아이콘 수정
  CARD: "Card",
  ETC: "Etc",
};

const ListItemImage = ({
  src,
  alt,
  size,
  priority = false,
  className,
  imageCount,
  category,
}: ListItemImageProps) => {
  const iconName = CATEGORY_ICON_MAP[category] ?? CATEGORY_ICON_MAP.ETC;

  return (
    <div className="relative overflow-hidden rounded-[10px]" style={{ width: size, height: size }}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          draggable={false}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full flex-center" aria-label={`${category} 기본 이미지`}>
          <Icon name={iconName} size={size} />
        </div>
      )}

      {typeof imageCount === "number" && imageCount > 1 && (
        <div
          aria-label={`이미지 ${imageCount}장`}
          className={cn(
            "absolute bottom-0 right-0 min-h-[21px] min-w-[23px]",
            "rounded-br-[10px] rounded-tl-[4px] bg-black/50 px-2 py-1 flex-center"
          )}
        >
          <span className="text-caption2-medium text-white">{imageCount}</span>
        </div>
      )}
    </div>
  );
};

export default ListItemImage;
