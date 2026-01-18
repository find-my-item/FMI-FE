import { InputSearch } from "@/components/common";

const MypageCommentsSearch = () => {
  return (
    <section className="w-full px-5 py-[10px]">
      <h2 className="sr-only">검색 영역</h2>
      {/* TODO(수현): onEnter 함수 api 연결 시 코드 추가 예정 */}
      <InputSearch name="search" mode="onChange" onEnter={() => {}} />
    </section>
  );
};

export default MypageCommentsSearch;
