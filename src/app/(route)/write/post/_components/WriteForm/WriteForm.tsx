import { useFormContext } from "react-hook-form";
import { PostWriteFormValues } from "../../_types/PostWriteType";
import usePostWriteSubmit from "../../_hooks/usePostWriteSubmit/usePostWriteSubmit";
import { DetailHeader } from "@/components/layout";
import {
  ImageSection,
  ActionSection,
  CategorySection,
  ContentSection,
  LocationSection,
  TitleSection,
} from "../_internal";

const WriteForm = ({ title }: { title: string }) => {
  const methods = useFormContext<PostWriteFormValues>();
  const values = methods.watch();
  const { onSubmit, isPosting, canSubmit } = usePostWriteSubmit({ methods });
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  return (
    <>
      <DetailHeader title={title} />
      <h1 className="sr-only">{`${title} 페이지`}</h1>
      <form onSubmit={onSubmit} className="flex flex-col h-base">
        <div className="flex min-h-0 flex-1 flex-col">
          <ImageSection />
          <CategorySection />
          <TitleSection />
          <ContentSection />
          <LocationSection />
        </div>
        <ActionSection disabled={isSubmitDisabled} />
      </form>
    </>
  );
};

export default WriteForm;
