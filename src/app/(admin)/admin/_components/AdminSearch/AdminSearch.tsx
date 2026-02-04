import { InputSearch } from "@/components/common";

interface AdminSearchProps {
  placeholder?: string;
  onEnter: () => void;
}

const AdminSearch = ({
  placeholder = "제목, 내용을 입력해 주세요.",
  onEnter,
}: AdminSearchProps) => {
  return (
    <div className="px-5 py-[10px]">
      <InputSearch placeholder={placeholder} name="search" mode="onChange" onEnter={onEnter} />
    </div>
  );
};

export default AdminSearch;
