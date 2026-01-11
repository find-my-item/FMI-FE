"use client";

import { DetailHeader } from "@/components/layout";
import { MYPAGE_POSTS_CONFIG } from "./_constants/MYPAGE_POSTS_CONFIG";
import { Button, Filter, InputSearch } from "@/components/common";
import { ListItem } from "../../list/_components";
import { useState } from "react";
import { PopupLayout } from "@/components/domain";
import Picker from "react-mobile-picker";

const page = () => {
  const [dateOpen, setDateOpen] = useState(false);

  const today = new Date();
  const [datePicker, setDatePicker] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDay(),
  });

  // 년도 배열
  const getYears = (startYear: number, endYear: number) => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => String(startYear + i));
  };
  const currentYear = today.getFullYear();
  const Years = getYears(2025, currentYear);
  const Months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const Days = Array.from({ length: 31 }, (_, i) => String(i + 1));

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
              onClick={() => setDateOpen(true)}
              iconPosition={item.iconPosition}
            >
              {item.name}
            </Filter>
          ))}

          {/* 바텀시트 */}
          <PopupLayout
            isOpen={dateOpen}
            onClose={() => setDateOpen(false)}
            className="h-[400px] gap-8 px-5 py-10 flex-col-center"
          >
            <h2 className="text-h2-medium">기간설정</h2>
            <div className="flex gap-[14px]">
              <Filter ariaLabel="시작일" onSelected={true} className="px-10 py-2">
                시작일
              </Filter>
              <Filter ariaLabel="종료일" onSelected={false}>
                종료일
              </Filter>
            </div>

            {/* 달력 */}
            <Picker
              value={datePicker}
              onChange={setDatePicker}
              wheelMode="normal" // 3D 효과를 원하면 'natural'
            >
              <Picker.Column name="year">
                {Years.map((year) => (
                  <Picker.Item key={year} value={year}>
                    {year}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="month">
                {Months.map((month) => (
                  <Picker.Item key={month} value={month}>
                    {month}월
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="day">
                {Days.map((day) => (
                  <Picker.Item key={day} value={day}>
                    {day}일
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>

            <Button onClick={() => setDateOpen(false)}>닫기</Button>
          </PopupLayout>
        </section>

        <section>
          <h2 className="sr-only">게시글 목록 영역</h2>
          {[1, 2, 3].map((item) => (
            <ListItem
              key={item}
              post={{
                postId: 1,
                title: "전자기기를 잃어버렸어요",
                summary: "전자기기를 읽어버렸다구리이부ㅜ루아ㅓㅁㄴ이5ㄱ",
                thumbnailUrl: "https://picsum.photos/400/300?random=1",
                address: "서울특별시 강남구",
                itemStatus: "SEARCHING",
                postType: "FOUND",
                category: "CARD",
                favoriteCount: 3,
                createdAt: "30분 전",
              }}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default page;
