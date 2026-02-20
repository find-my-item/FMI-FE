import { Button } from "@/components/common";

interface ActionSectionProps {
  disabled: boolean;
}

const ActionSection = ({ disabled }: ActionSectionProps) => {
  return (
    <section className="px-5 pb-8 pt-3">
      <Button type="submit" variant="auth" disabled={disabled}>
        작성 완료
      </Button>
    </section>
  );
};

export default ActionSection;
