import { Icon } from "@/components";

interface MyPageMenuItem {
  pageName: string;
}

const MyPageMenuItem = ({ pageName }: MyPageMenuItem) => {
  return (
    <div className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default">
      {pageName}
      <button>
        <Icon name="ArrowRightSmall" size={24} />
      </button>
    </div>
  );
};

export default MyPageMenuItem;
