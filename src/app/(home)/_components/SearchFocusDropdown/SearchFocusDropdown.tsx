import { AutoCompleteList, LatestList } from "./_internal";

const SearchFocusDropdown = ({
  focused,
  setFocused,
  searchKeyword,
}: {
  focused: boolean;
  setFocused: (focused: boolean) => void;
  searchKeyword: string;
}) => {
  if (!focused) return null;

  return (
    <div className="pt-[77px]">
      <AutoCompleteList searchKeyword={searchKeyword} setFocused={setFocused} />
      <LatestList setFocused={setFocused} />
    </div>
  );
};

export default SearchFocusDropdown;
