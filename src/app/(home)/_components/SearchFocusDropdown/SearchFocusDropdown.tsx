import AutoCompleteList from "./_internal/AutoCompleteList";
import LatestList from "./_internal/LatestList";

const SearchFocusDropdown = ({ focused }: { focused: boolean }) => {
  if (!focused) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[77.33px] z-[9999] mx-auto max-w-[768px] bg-white px-5 py-3">
      <AutoCompleteList />
      <LatestList />
    </div>
  );
};

export default SearchFocusDropdown;
