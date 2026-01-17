import { InputSearch } from "@/components/common";

const MypageCommentsSearch = () => {
  return (
    <section className="w-full px-5 py-[10px]">
      <h2 className="sr-only">검색 영역</h2>
      <InputSearch name="search" mode="onChange" onEnter={() => {}} />
    </section>
  );
};

export default MypageCommentsSearch;
