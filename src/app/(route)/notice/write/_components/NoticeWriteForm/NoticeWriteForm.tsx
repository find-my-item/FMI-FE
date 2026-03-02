import { UseFormReturn } from "react-hook-form";
import TitleInput from "./_internal/TitleInput";
import ContentInput from "./_internal/ContentInput";
import ImageInput from "./_internal/ImageInput";
import { ActionSection } from "@/app/(route)/write/post/_components/_internal";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
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
