import { Filter, Tab } from "@/components";
import ListItem from "../ListItem/ListItem";
import { TABS } from "../../_constants/TABS";
import { Dispatch, SetStateAction } from "react";
import { IconName } from "@/components/common/Icon/Icon";

interface DefaultListProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  searchUpdateQuery: (key: string, value?: string) => void;
  dropdowns?: { value: string; setValue: Dispatch<SetStateAction<string>>; icon: IconName }[];
}

const DefaultList = ({ selected, setSelected, searchUpdateQuery, dropdowns }: DefaultListProps) => {
  return (
    <>
      <Tab tabs={TABS} selected={selected} onValueChange={setSelected} />

      <div className="flex h-[67px] w-full items-center gap-2 px-5">
        <Filter
          ariaLabel="지역 선택 필터 버튼"
          children={"지역 선택"}
          onSelected={false}
          icon={{ name: "Location", size: 16 }}
          onClick={() => searchUpdateQuery("search", "region")}
        />
        {/* TODO(형준): UI 깨짐 현상으로 인한 주석처리 */}
        {/* {dropdowns.map(({ value, setValue, icon }, idx) => (
          <Dropdown key={idx} options={[]} onSelect={setValue} className="gap-[4px]">
            {idx === 0 && <Icon name={icon} size={16} />}
            <span className="text-[16px] font-semibold text-[#525252]">{value}</span>
            {idx !== 0 && <Icon name="ArrowDown" size={12} />}
          </Dropdown>
        ))} */}
      </div>

      {/* 아이템 */}
      <div className="w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <ListItem
            id={1}
            linkState="list"
            img="/test_list.JPG"
            title="게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목"
            description="서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다"
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default DefaultList;
