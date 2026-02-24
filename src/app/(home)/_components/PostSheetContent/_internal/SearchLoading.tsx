import { Icon } from "@/components/common";

const SearchLoading = () => {
  return (
    <div className="mt-[137px] flex-center" role="status">
      <Icon name="Loading" className="animate-spin" size={30} />
    </div>
  );
};

export default SearchLoading;
