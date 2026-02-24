import AutoCompleteList from "./_internal/AutoCompleteList";
import LatestList from "./_internal/LatestList";

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
