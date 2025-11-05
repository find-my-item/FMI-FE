import { cn } from "@/utils";
import { ChipProps, ChipType } from "./ChipTypes";

/**
 * @author jikwon
 *
 * 상세페이지 카테고리를 나타내는 작은 원형 칩 컴포넌트입니다.
 * `type`에 따라 배경색과 라벨이 달라집니다.
 *
 * @param type - 칩의 종류를 지정합니다.
 * - `"status"`: 상세페이지 게시글의 상태를 나타냅니다.
 * - `"category"`: 상세페이지 게시글의 카테고리를 나타냅니다.
 *
 * @example
 * ```tsx
 * <Chip label="찾는중" type="status" />
 * <Chip label="전자기기" type="category" />
 * ```
 */

const TypeMap: Record<ChipType, string> = {
  status: "bg-flatGreen-75 text-flatGreen-500",
  category: "bg-flatGray-25 text-flatGray-500",
};

const Chip = ({ label, type = "status" }: ChipProps) => {
  return (
    <span className={cn("rounded-full px-3 py-1 text-caption1-semibold", TypeMap[type])}>
      {label}
    </span>
  );
};

export default Chip;
