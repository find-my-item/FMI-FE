import PostSearchView from "./components/PostSearchView";
import RegionSearchView from "./components/RegionSearchView";
import { LIST_SEARCH_PLACEHOLDER } from "./LIST_SEARCH_PLACEHOLDER";

interface ListSearch {
  searchMode: "region" | "post";
}

const ListSearch = ({ searchMode }: ListSearch) => {
  return (
    <>
      <form className="px-[20px] py-[10px]">
        <input
          type="text"
          placeholder={LIST_SEARCH_PLACEHOLDER[searchMode]}
          className="min-h-[40px] w-full rounded-full px-[20px] py-[8px] text-body1-regular text-black bg-fill-neutral-subtle-default placeholder:text-neutral-normal-placeholder"
        />
      </form>
      {searchMode === "post" ? <PostSearchView /> : <RegionSearchView />}
    </>
  );
};

export default ListSearch;
