import { AutoCompleteList, LatestList } from "./_internal";

const SearchFocusDropdown = ({
  focused,
  setFocused,
}: {
  focused: boolean;
  setFocused: (focused: boolean) => void;
}) => {
  if (!focused) return null;

  return (
    <>
      <AutoCompleteList />
      <LatestList setFocused={setFocused} />
    </>
  );
};

export default SearchFocusDropdown;
