import { UseFormReturn } from "react-hook-form";
import TitleInput from "./_internal/TitleInput";
import ContentInput from "./_internal/ContentInput";
import ImageInput from "./_internal/ImageInput";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
    <form onSubmit={methods.handleSubmit(() => {})}>
      <TitleInput />
      <ContentInput />
      <ImageInput />
    </form>
  );
};

export default NoticeWriteForm;
