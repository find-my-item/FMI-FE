import { Button } from "@/components";

interface BottomSheetProps {
  location: string;
  radius: string;
  setRadius: (radius: string) => void;
}

const baseButton =
  "text-body1-semibold text-neutral-normal-default min-h-[44px] hover:bg-gray-100 transition-colors";

const DISTANCE_OPTIONS = [
  { radius: "1000", label: "1km" },
  { radius: "3000", label: "3km" },
  { radius: "5000", label: "5km" },
];

const BottomSheet = ({ location, radius, setRadius }: BottomSheetProps) => {
  const locationName = location;

  return (
    <section>
      <div className="rounded-t-[20px] px-5 py-10 flex-col-center">
        <div className="mb-12 gap-4 flex-col-center">
          <p>
            <span className="text-h2-medium text-layout-header-default">{locationName} 근처</span>
            <span className="text-h1-medium text-brand-normal-default">{radius}km</span>
          </p>
          <div className="w-full gap-[14px] py-[14px] flex-center">
            {DISTANCE_OPTIONS.map((option) => (
              <Button
                key={option.radius}
                variant="outlined"
                className={baseButton}
                onClick={() => setRadius(option.radius)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <Button className="min-h-[44px] w-full">적용하기</Button>
      </div>
    </section>
  );
};

export default BottomSheet;
