"use client";

import { cn } from "@/utils";
import Icon from "../../Icon/Icon";
import { Props } from "@/components/common/Icon/Icon";

/**
 * @author hyungjun
 *
 * 여러 메뉴 항목을 세로로 나열한 Kebab 스타일 메뉴 컴포넌트입니다.
 * 각 항목은 텍스트와 아이콘을 가질 수 있으며, 로딩 상태와 비활성 상태를 지원합니다.
 * onClick 함수가 포함되어 있을 경우 클라이언트 사이드에서 렌더링되어야 합니다.
 *
 * @param items - 메뉴 항목들의 배열입니다. 각 항목은 `KebabMenuItem` 형태로 구성됩니다.
 *  - `text`: 버튼에 표시할 콘텐츠 (텍스트)
 *  - `icon`: 버튼에 표시할 아이콘 (선택적)
 *  - `iconPosition`: 아이콘 위치, `"leading"`(왼쪽) | `"trailing"`(오른쪽). 기본값 `"leading"`
 *  - `loading`: 로딩 상태 표시. `true`일 경우 버튼 비활성화 및 스피너 표시
 *  - `disabled`: 버튼 비활성화
 *  - `onClick`: 클릭 시 실행할 함수
 *  - `ariaLabel`: 접근성을 위한 버튼 라벨
 *  - `textColor`: 텍스트 색상
 *
 * @example
 * ```tsx
 * <KebabMenu
 *   items={[
 *     { text: "편집", icon: { name: "Edit" }, onClick: handleEdit },
 *     { text: "삭제", icon: { name: "Trash" }, onClick: handleDelete, disabled: true },
 *     { text: "복사", icon: { name: "Copy" }, loading: true },
 *     { text: "텍스트", textColor: "text-yellow-500" },
 *   ]}
 * />
 * ```
 */

interface KebabMenuItem {
  text: string;
  icon?: Props;
  iconPosition?: "leading" | "trailing";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  textColor?: string;
}

interface KebabMenuProps {
  items: KebabMenuItem[];
}

const DEFAULT_TEXT_COLOR =
  "text-neutral-normal-default hover:text-black active:text-neutral-normal-preesed disabled:text-neutral-normal-disabled";

const KebabMenu = ({ items }: KebabMenuProps) => {
  const finalIconPosition = (item: KebabMenuItem) => item.icon && (item.iconPosition ?? "leading");
  const finalTextColor = (item: KebabMenuItem) => item.textColor ?? DEFAULT_TEXT_COLOR;

  return (
    <div className="grid w-max auto-cols-auto grid-flow-row">
      {items.map((item, index) => (
        <button
          key={index}
          disabled={item.disabled || item.loading}
          onClick={item.onClick}
          className={cn(
            "glass-card glass-card::before glass-card::after grid auto-cols-max grid-flow-col items-center justify-center gap-2 border-b border-white px-7 py-4 text-h3-medium transition-colors duration-150 bg-fill-neutral-subtle-default",
            finalTextColor(item),
            "active:bg-fill-neutral-subtle-pressed",
            "disabled:bg-fill-neutral-subtle-disabled",
            index === 0 && "rounded-t-[20px]",
            items.length === ++index && "rounded-b-[20px]"
          )}
        >
          {item.loading ? (
            <Icon name="Loading" className="animate-spin" />
          ) : (
            finalIconPosition(item) === "leading" && item.icon && <Icon {...item.icon} />
          )}
          {!item.loading && item.text}
          {!item.loading && finalIconPosition(item) === "trailing" && item.icon && (
            <Icon {...item.icon} />
          )}
        </button>
      ))}
    </div>
  );
};

export default KebabMenu;
