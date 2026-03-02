import { UseFormReturn } from "react-hook-form";
import TitleInput from "./_internal/TitleInput";

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn }) => {
  return (
    <form onSubmit={methods.handleSubmit(() => {})}>
      <TitleInput />
    </form>
  );
};

export default NoticeWriteForm;
