import { AutoCompleteList, LatestList } from "./_internal";

const HEADER_HEIGHT_PX = 77;

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
    <div className={`pt-[${HEADER_HEIGHT_PX}px]`}>
      <AutoCompleteList searchKeyword={searchKeyword} setFocused={setFocused} />
      <LatestList setFocused={setFocused} />
    </div>
  );
};

export default SearchFocusDropdown;
