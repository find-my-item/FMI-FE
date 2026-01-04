import { Icon } from "@/components/common";
import Link from "next/link";

interface CustomerItemProp {
  item: {
    id: number;
    category: string;
    title: string;
    body: string;
  };
}

const CustomerItem = ({ item }: CustomerItemProp) => {
  return (
    <Link
      key={item.id}
      href={`notice/customer/${item.id}`}
      className="w-full border-b border-b-[#E4E4E4] py-[24px] hover:bg-gray-100"
    >
      <section>
        <div className="mb-2 flex items-center gap-3">
          <p className="rounded-[4px] bg-emerald-100 px-2 py-[2px] text-[12px] text-emerald-700">
            {item.category}
          </p>
          <h2 className="text-[16px] font-semibold text-[#242424] u-ellipsis">{item.title}</h2>
        </div>

        <div className="mb-2 flex items-center gap-3 text-[13px] text-[#5D5D5D]">
          <span>작성자1</span>
          <time className="text-[#9D9D9D]">3일전</time>
        </div>

        <div className="mt-1 flex gap-4 text-[13px] text-[#9D9D9D]">
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={16} /> 24
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Star" size={16} /> 12
          </span>
        </div>
      </section>
    </Link>
  );
};

export default CustomerItem;
