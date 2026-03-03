import { Button } from "@/components/common";

interface ActionSectionProps {
  disabled: boolean;
}

/**
 * @author hyungjun
 *
 * @description
 * 게시글 작성 폼 하단의 제출 버튼이 있는 액션 섹션입니다.
 * 작성 완료 버튼을 렌더링하며, disabled 상태로 제출을 막을 수 있습니다.
 *
 * @param disabled - 버튼 비활성화 여부. true이면 제출할 수 없습니다.
 *
 * @example
 * ```tsx
 * <WriteActionSection disabled={!isValid} />
 * ```
 */
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
