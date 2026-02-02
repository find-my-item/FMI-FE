import { cn } from "@/utils";

interface RadioOptionItemProps {
  option: {
    value: string;
    label: string;
  };
  selected: string;
  setSelected: (value: string) => void;
}

const RadioOptionItem = ({ option, selected, setSelected }: RadioOptionItemProps) => {
  return (
    <label
      key={option.value}
      aria-checked={selected === option.value}
      className={cn(
        "flex h-[61px] w-full cursor-pointer items-center gap-3 px-5 py-[18px] text-h3-medium text-neutral-normal-default",
        selected === option.value && "rounded-[4px] bg-fill-neutral-strong-default"
      )}
    >
      <input
        type="radio"
        name="category"
        value={option.value}
        checked={selected === option.value}
        onChange={(e) => setSelected(e.target.value)}
        className="peer hidden"
      />
      <span
        className={cn(
          "relative h-4 w-4 rounded-full border border-brand-normal-enteredSelected peer-checked:border-brand-normal-enteredSelected",
          "before:absolute before:inset-[3px] before:scale-0 before:rounded-full before:transition-transform before:bg-fill-brand-normal-enteredSelected",
          "peer-checked:before:scale-100"
        )}
      />
      <span>{option.label}</span>
    </label>
  );
};

export default RadioOptionItem;
