import { InputSearch } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { PublicDataSearchList } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="게시글 검색" />
      <section className="px-5 py-[10px]">
        <InputSearch name="search" mode="onChange" placeholder="검색어를 입력해주세요." />
      </section>

      <PublicDataSearchList />
    </>
  );
};

export default page;
