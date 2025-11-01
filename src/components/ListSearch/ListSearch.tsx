"use client";

const ListSearch = () => {
  return (
    <div>
      <form className="px-[20px] py-[10px]">
        <input
          type="text"
          placeholder="제목, 내용을 입력해 주세요."
          className="min-h-[40px] w-full rounded-full px-[20px] py-[8px] text-body1-regular text-neutral-normal-placeholder bg-fill-neutral-subtle-default"
        />
      </form>
    </div>
  );
};

export default ListSearch;
