import { UseFormReturn } from "react-hook-form";
import { TitleInput, ContentInput, ImageInput } from "./_internal";
import { ActionSection } from "@/app/(route)/write/post/_components/_internal";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
    // TODO(형준): 내부 input 컴포넌트 value 있을 때 스타일 구현 필요
    <form onSubmit={methods.handleSubmit(() => {})}>
      <TitleInput />
      <ContentInput />
      <ImageInput />
      <div className="fixed bottom-0 w-full max-w-[764px] border-t border-divider-default bg-white">
        <ActionSection disabled={false} />
      </div>
    </form>
  );
};

export default NoticeWriteForm;
