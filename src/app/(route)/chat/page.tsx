"use client";

import { DetailHeader, Filter, InputSearch } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { Props } from "@/components/Icon/Icon";
import { FILTER_BUTTONS } from "./_constants/FILTER_BUTTONS";
import ChatList from "./_components/ChatList/ChatList";

const Chat = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full">
      <DetailHeader title="채팅" />

      <div className="px-[20px]">
        <FormProvider {...methods}>
          <div className="py-[10px]">
            <InputSearch
              mode="RHF"
              name="chatListSearch"
              placeholder="채팅 참여자를 입력해 주세요."
              onEnter={() => {}}
            />
          </div>
        </FormProvider>

        <div className="flex gap-[8px] py-[14px]">
          {FILTER_BUTTONS.map(({ text, icon, iconSize, iconPosition }) => (
            <Filter
              key={text}
              ariaLabel={`채팅 리스트 ${text}`}
              onSelected={false}
              icon={{ name: icon as Props["name"], size: iconSize }}
              iconPosition={iconPosition as "leading" | "trailing"}
            >
              {text}
            </Filter>
          ))}
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default Chat;
