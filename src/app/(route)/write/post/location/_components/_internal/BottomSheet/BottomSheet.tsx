import { Button } from "@/components/common";
import { Radius } from "@/types";
import { DISTANCE_OPTIONS } from "./DISTANCE_OPTIONS";

type LocationInfo = {
  location: string | null;
  lat: number | null;
  lng: number | null;
};

type RadiusState = {
  radius: Radius;
  setRadius: (radius: Radius) => void;
};

interface BottomSheetProps {
  locationInfo: LocationInfo;
  radiusState: RadiusState;
}

const BottomSheet = ({ locationInfo, radiusState }: BottomSheetProps) => {
  const { location, lat, lng } = locationInfo;
  const { radius, setRadius } = radiusState;

  return (
    <section className="rounded-t-[20px] px-5 py-10 flex-col-center">
      <div className="mb-12 gap-4 flex-col-center">
        <div className="gap-2 flex-center">
          <h2 className="text-h2-medium text-layout-header-default">
            {location || "선택한 위치"} 근처
          </h2>
          <span className="text-h1-medium text-brand-normal-default">{radius / 1000}km</span>
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
