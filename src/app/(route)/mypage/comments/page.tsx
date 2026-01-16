"use client";

import { DetailHeader } from "@/components/layout";
import { MypageCommentsFilter, MypageCommentsList, MypageCommentsSearch } from "./_components";

const page = () => {
  // const [isBottomOpen, setIsBottomOpen] = useState(false);
  // const [bottomState, setBottomState] = useState<"Date" | "Filter">("Date");

  // const handleFilterClick = (name: string) => {
  //   setIsBottomOpen(true);
  //   if (name === "기간") {
  //     setBottomState("Date");
  //   } else {
  //     setBottomState("Filter");
  //   }
  // };

  return (
    <>
      <DetailHeader title="내가 쓴 댓글" />
      <h1 className="sr-only">내가 쓴 댓글 페이지</h1>
      <div className="w-full h-base">
        <MypageCommentsSearch />
        <MypageCommentsFilter />
        <MypageCommentsList />
        {/* <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        </section> */}

        {/* <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
          <h2 className="sr-only">필터링 영역</h2>
          {MYPAGE_COMMENTS_FILTER.map((item) => (
            <Filter
              key={item.name}
              ariaLabel={item.name}
              icon={item.icon}
              onSelected={false}
              onClick={() => handleFilterClick(item.name)}
              iconPosition={item.iconPosition}
            >
              {item.name}
            </Filter>
          ))}

          <MypageCommentsBottomSheet
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
          />
        </section> */}

        {/* <section>
          <h2 className="sr-only">댓글 목록 영역</h2>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex w-full flex-col border-b border-divider-default px-5 py-[30px]"
            >
              <span>
                <span className="text-brand-normal-default">@대댓글 사용자 </span>
                여기 댓글 내용이 표시 됨
              </span>
              <span className="text-body2-regular text-layout-body-default">2026.01.15</span>
              <span className="flex text-body2-regular text-neutral-strong-placeholder">
                <Icon name="Star" size={16} />
                12
              </span>
            </div>
          ))}
        </section> */}
      </div>
    </>
  );
};

export default page;
