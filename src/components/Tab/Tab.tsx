import { cn } from "@/utils/cn";

/**
 * @author jikwon
 *
 * 탭 컴포넌트입니다.
 * `tabs`에 따라 탭이 생성됩니다.
 *
 * @param tabs - 탭의 종류를 지정합니다.
 * - `key`: 탭의 고유한 식별자입니다.
 * - `label`: 탭의 레이블입니다.
 *
 * @param selected - 선택된 탭의 식별자입니다.
 *
 * @param onValueChange - 탭이 변경될 때 호출됩니다.
 *
 * @example
 * ```tsx
 * <Tab
 *   tabs={[{ key: "tab1", label: "Tab 1" }, { key: "tab2", label: "Tab 2" }]}
 *   selected="tab1"
 *   onValueChange={(key) => console.log(key)}
 * />
 * ```
 */
interface TabProps<T extends string> {
  tabs: ReadonlyArray<{ key: T; label: string }>;
  selected: T;
  onValueChange: (key: T) => void;
}

const Tab = <T extends string>({ tabs, selected, onValueChange, ...buttonProps }: TabProps<T>) => {
  return (
    <div className="flex w-full border-b border-[#ADADAD] px-[20px]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          {...buttonProps}
          className={cn(
            "h-[60px] flex-1 text-[20px] font-semibold text-[#ADADAD] flex-center",
            selected === tab.key && "border-b-2 border-[#1EB87B] text-[#1EB87B]"
          )}
          onClick={() => onValueChange(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
