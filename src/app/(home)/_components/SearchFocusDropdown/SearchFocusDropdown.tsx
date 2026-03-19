import { AutoCompleteList, LatestList } from "./_internal";

const SearchFocusDropdown = ({ focused }: { focused: boolean }) => {
  if (!focused) return null;

  return (
    <>
      <AutoCompleteList />
      <LatestList />
    </>
  );
};

export default SearchFocusDropdown;
