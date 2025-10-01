import clsx from "clsx";
import Link from "next/link";

interface NoticeItem {
  item: { id: number; title: string; date: string; body: string; newOrHot: string };
}

const NoticeItem = ({ item }: NoticeItem) => {
  return (
    <Link href={`/notice/${item.id}`} className="flex flex-col gap-2 border-2 p-1 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "rounded-md px-1 py-0.5 text-xs font-bold text-white",
              item.newOrHot === "NEW" ? "bg-blue-500" : "bg-red-500"
            )}
          >
            {item.newOrHot}
          </div>
          <h1 className="font-headingBold">{item.title}</h1>
        </div>
        <p className="text-sm">{item.date}</p>
      </div>
      <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-800">
        {item.body}
      </p>
    </Link>
  );
};

export default NoticeItem;
