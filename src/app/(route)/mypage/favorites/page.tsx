"use client";

import { FilterSection, MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { MypageFavoritesList } from "./_components";

// TODO(수현): 바로 다음 Pr에 수정되서 올라갈 예정입니다. 지금은 빌드에러가 나기 때문에 주석처리했습니다.
const page = () => {
  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_FAVORITES" />

        {/* <MypageFavoritesList data={MOCK_MYPAGE_POSTS_LIST} /> */}
      </div>
    </>
  );
};

export default page;
