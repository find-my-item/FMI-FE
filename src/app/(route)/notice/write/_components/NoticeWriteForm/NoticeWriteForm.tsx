import { UseFormReturn } from "react-hook-form";
import TitleInput from "./_internal/TitleInput";
import ContentInput from "./_internal/ContentInput";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
    <form onSubmit={methods.handleSubmit(() => {})}>
      <TitleInput />
      <ContentInput />
    </form>
  );
};

export default NoticeWriteForm;
