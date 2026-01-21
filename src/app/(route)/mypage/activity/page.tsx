import { InputSearch } from "@/components/common";
import { DetailHeader } from "@/components/layout";

const page = () => {
  return (
    <>
      <DetailHeader title="내 활동 내역" />
      <div className="w-full h-base">
        <h1 className="sr-only">내 활동 내역 페이지</h1>
        {/* 공통 컴포넌트로 지울 예정 */}
        <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          {/* TODO(수현): onEnter 함수 api 연결 시 코드 추가 예정 */}
          <InputSearch name="search" mode="onChange" />
        </section>
      </div>
    </>
  );
};

export default page;
