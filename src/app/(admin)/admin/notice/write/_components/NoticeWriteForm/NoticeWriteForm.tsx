import { UseFormReturn } from "react-hook-form";
import { TitleInput, ContentInput } from "./_internal";
import { ActionSection } from "@/app/(route)/write/post/_components/_internal";
import { WriteImageSection } from "@/components/domain";

const IMAGE_HELP_TEXT = "*사진은 최대 5장 첨부가 가능합니다. (선택)";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
    // TODO(형준): 내부 input 컴포넌트 value 있을 때 스타일 구현 필요
    <form onSubmit={methods.handleSubmit(() => {})} className="flex flex-col h-base">
      <TitleInput />
      <ContentInput />
      <WriteImageSection helpText={IMAGE_HELP_TEXT} />
      <div className="sticky bottom-0 w-full max-w-[764px] border-t border-divider-default bg-white">
        <ActionSection disabled={false} />
      </div>
    </form>
  );
};

export default NoticeWriteForm;
