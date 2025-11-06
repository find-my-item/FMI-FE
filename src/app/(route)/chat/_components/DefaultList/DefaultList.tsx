import { Filter, InputSearch } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { FILTER_BUTTONS } from "../../_constants/FILTER_BUTTONS";
import ChatItem from "../ChatItem/ChatItem";
import { Props } from "@/components/Icon/Icon";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
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
              onClick={() => {
                if (text !== "지역 선택") return;
                searchUpdateQuery("search", "region");
              }}
            >
              {text}
            </Filter>
          ))}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </>
  );
};

export default DefaultList;
