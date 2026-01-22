"use client";

import { Chip, InputChat } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import MyReportsDetailComments from "../MyReportsDetailComments/MyReportsDetailComments";
import { MOCK_MY_REPORTS_COMMENT_ITEMS } from "@/mock/MOCK_DATA";
import { FormProvider, useForm } from "react-hook-form";
import { ChatRoomProvider } from "@/providers/ChatRoomProvider";

interface InputType {
  commentInput: string;
}

const MyReportsDetailContainer = () => {
  const methods = useForm<InputType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: InputType) => {
    // TODO(수현): api 연결 시 제출 함수 추가
  };

  return (
    <>
      <DetailHeader title="내 신고 내역" />

      <div className="w-full h-base">
        <div className="border-b-flat-gray-50 w-full border-b px-5 py-[30px]">
          <Chip label="접수" type="pending" />
          <h2 className="mt-[14px] text-h2-medium">실제 분실물/습득물이 아닌 내용이에요.</h2>
          <span className="mt-1 text-body2-regular text-layout-body-default">2026.01.19</span>
          <p className="mt-6 text-body1-regular text-layout-header-default">
            여기에 신고 내용이 표기됩니다.
          </p>
        </div>

        <ul>
          <li>
            {MOCK_MY_REPORTS_COMMENT_ITEMS.map((item) => (
              <MyReportsDetailComments key={item.id} {...item} />
            ))}
          </li>
        </ul>
      </div>
    </>
  );
};

export default MyReportsDetailContainer;
