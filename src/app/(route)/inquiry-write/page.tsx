import { DetailHeader } from "@/components/layout";
import { HeaderPost } from "@/components/layout/DetailHeader/DetailHeaderParts";

const page = () => {
  return (
    <div className="h-base">
      <DetailHeader title="무엇을 도와드릴까요?">
        <HeaderPost />
      </DetailHeader>
      <hr className="border border-labelsVibrant-quaternary" />
      <h1 className="sr-only">1:1 문의하기 작성</h1>
    </div>
  );
};

export default page;
