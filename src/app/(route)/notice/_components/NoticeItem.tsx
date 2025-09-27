import clsx from "clsx";

interface NoticeItem {
  item: { id: number; title: string; date: string; body: string; newOrHot: string };
}

const NoticeItem = ({ item }: NoticeItem) => {
  return (
    <div className="flex flex-col gap-2 border-2 p-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "px-1 py-0.5 text-white text-xs rounded-md font-bold",
              item.newOrHot === "NEW" ? "bg-blue-500" : "bg-red-500"
            )}
          >
            {item.newOrHot}
          </div>
          <h1 className="font-headingBold">{item.title}</h1>
        </div>
        <p className="text-sm">{item.date}</p>
      </div>
      <p className="text-sm text-gray-800 overflow-hidden text-ellipsis line-clamp-2">
        {item.body}
      </p>
    </div>
  );
};

export default NoticeItem;
