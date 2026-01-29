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
 * - `"pending"`: 내 문의 내역 페이지/ 내 신고 내역 페이지의 '접수' 상태임을 나타냅니다.
 * - `"received"`: 내 문의 내역 페이지/ 내 신고 내역 페이지의 '접수 중' 또는 '처리 중' 상태임을 나타냅니다.
 * - `"resolved"`: 내 문의 내역 페이지/ 내 신고 내역 페이지의 '처리 완료' 상태임을 나타냅니다.
 * - `"admin"`: 내 문의 내역 페이지/ 내 신고 내역 페이지의 관리자입을 나타냅니다.
 *
 * @example
 * ```tsx
 * <Chip label="찾는중" type="status" />
 * <Chip label="전자기기" type="category" />
 * <Chip label="접수" type="pending" />
 * <Chip label="처리 중" type="received" />
 * <Chip label="처리 완료" type="resolved" />
 * <Chip label="관리자" type="admin" />
 * ```
 */

const TypeMap: Record<ChipType, string> = {
  status: "bg-fill-brand-subtle-default text-brand-normal-default",
  category: "bg-fill-neutral-strong-default text-neutral-strong-default",
  pending: "bg-fill-brand-subtle-default text-brand-normal-default",
  received: "bg-fill-brand-subtle-default text-brand-normal-default",
  resolved: "bg-fill-brand-normal-default text-white",
  admin:
    "bg-fill-brand-subtle-default text-brand-normal-default text-caption2-semibold !py-1 !px-2",
};

const Chip = ({ label, type = "status" }: ChipProps) => {
  return (
    <span className={cn("rounded-full px-3 py-1 text-caption1-semibold", TypeMap[type])}>
      {label}
    </span>
  );
};

export default Chip;
