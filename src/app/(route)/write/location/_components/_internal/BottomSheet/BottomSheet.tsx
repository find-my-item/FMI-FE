import { Button } from "@/components";
import { DISTANCE_OPTIONS } from "./DISTANCE_OPTIONS";

interface BottomSheetProps {
  location: string | null;
  radius: string;
  setRadius: (radius: string) => void;
}

const BottomSheet = ({ location, radius, setRadius }: BottomSheetProps) => {
  return (
    <section className="rounded-t-[20px] px-5 py-10 flex-col-center">
      <div className="mb-12 gap-4 flex-col-center">
        <div className="gap-2 flex-center">
          <h2 className="text-h2-medium text-layout-header-default">
            {location || "선택한 위치"} 근처
          </h2>
          <span className="text-h1-medium text-brand-normal-default">{radius}km</span>
        </div>

        <div className="w-full gap-[14px] py-[14px] flex-center">
          {DISTANCE_OPTIONS.map((option) => (
            <Button
              key={option.radius}
              type="button"
              role="radio"
              aria-checked={option.value === radius}
              variant="outlined"
              className="min-h-11 text-body1-semibold text-neutral-normal-default transition-colors hover:bg-gray-100"
              onClick={() => setRadius(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <Button className="min-h-11 w-full">적용하기</Button>
    </section>
  );
};

export default BottomSheet;
