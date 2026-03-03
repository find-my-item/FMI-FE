import { Button } from "@/components/common";

interface ActionSectionProps {
  disabled: boolean;
}

const WriteActionSection = ({ disabled }: ActionSectionProps) => {
  return (
    <section className="px-5 pb-8 pt-3">
      <Button type="submit" className="w-full" disabled={disabled}>
        작성 완료
      </Button>
    </section>
  );
};

export default WriteActionSection;
