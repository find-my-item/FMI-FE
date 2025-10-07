import { cn } from "@/utils/cn";

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
            "flex-center h-[60px] flex-1 text-[20px] font-semibold text-[#ADADAD]",
            selected === tab.key && "border-b-2 border-[#04AD69] text-[#04AD69]"
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
