"use client";

import { DetailHeader } from "@/components/layout";
import { MYPAGE_POSTS_CONFIG } from "./_constants/MYPAGE_POSTS_CONFIG";
import { Chip, Filter, Icon, InputSearch } from "@/components/common";
import Link from "next/link";
import Image from "next/image";
import { formatDate, getItemCategoryLabel, getItemStatusLabel } from "@/utils";

const page = () => {
  const VIEW_ITEM = [
    {
      icon: "Star",
      count: 3,
    },
    {
      icon: "Eye",
      count: 0, // TODO(지권): API 누락
    },
  ] as const;

  const linkState = "list";
  const thumbnailUrl = "/";
  const title = "제목";
  const address = "경기도 평택시";
  const postId = 2;
  const summary = "이것은 전자기기기ㅏㅣ아ㅓ림나ㅓㅇㄹ";
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        </section>

        <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
          <h2 className="sr-only">필터링 영역</h2>
          {MYPAGE_POSTS_CONFIG.map((item) => (
            <Filter
              key={item.name}
              ariaLabel={item.name}
              icon={item.icon}
              onSelected={false}
              onClick={() => alert("테스트")}
              iconPosition={item.iconPosition}
            >
              {item.name}
            </Filter>
          ))}
        </section>

        <section>
          <h2 className="sr-only">게시글 목록 영역</h2>

          <Link
            href={linkState === "list" ? `/list/${postId}` : `/notice/${postId}`}
            className="duration-130 flex w-full cursor-pointer items-center gap-[14px] border-b border-b-flatGray-50 px-[20px] py-[30px] transition-colors hover:bg-flatGray-25"
          >
            <div className="min-w-0 flex-1">
              {linkState === "list" && (
                <div className="mb-2 flex gap-2">
                  <Chip label={getItemStatusLabel("FOUND")} type="status" />
                  <Chip label={getItemCategoryLabel("ELECTRONICS")} type="category" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <div className="flex items-center gap-1">
                    <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                      {title}
                    </h2>
                  </div>
                  <span className="text-body2-regular text-layout-body-default">
                    {address || "위치 정보가 이상해요."} · {formatDate("30분전")}
                  </span>
                </div>
                <p className="w-full text-body2-regular text-neutral-normal-default u-ellipsis">
                  {summary}
                </p>
              </div>
              <div className="mt-2 flex gap-2">
                {VIEW_ITEM.map((item) => (
                  <span
                    key={item.icon}
                    className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
                  >
                    <Icon name={item.icon} size={16} />
                    {item.count}
                  </span>
                ))}
              </div>
            </div>
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt="아이템 이미지"
                width={90}
                height={90}
                className="h-[90px] w-[90px] rounded-[10px]"
              />
            )}
          </Link>
        </section>
      </div>
    </>
  );
};

export default page;
