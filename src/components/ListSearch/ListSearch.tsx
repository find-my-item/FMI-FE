interface ListSearch {
  placeholder: string;
}

const ListSearch = ({ placeholder }: ListSearch) => {
  return (
    <div>
      <form className="px-[20px] py-[10px]">
        <input
          type="text"
          placeholder={placeholder}
          className="min-h-[40px] w-full rounded-full px-[20px] py-[8px] text-body1-regular text-neutral-normal-placeholder bg-fill-neutral-subtle-default"
        />
      </form>
    </div>
  );
};

export default ListSearch;
