import Image from "next/image";
import Link from "next/link";
import { Badge, Chip, Icon } from "@/components";

interface ListItemProps {
  id?: number;
  img: string;
  title: string;
  description: string;
  linkState?: "notice" | "list";
}

const VIEW_ITEM = [
  {
    icon: "Star",
    count: 12,
  },
  {
    icon: "Eye",
    count: 24,
  },
] as const;

const ListItem = ({ img, title, description, id, linkState = "list" }: ListItemProps) => {
  return (
    <Link
      href={linkState === "list" ? `/list/${id}` : `/notice/${id}`}
      className="duration-130 flex w-full cursor-pointer items-center gap-[14px] border-b border-b-flatGray-50 px-[20px] py-[30px] transition-colors hover:bg-[#F9F9F9]"
    >
      <div className="min-w-0 flex-1">
        {linkState === "list" && (
          <div className="mb-2 flex gap-2">
            <Chip label="찾는중" type="status" />
            <Chip label="전자기기" type="category" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <div className="flex items-center gap-1">
              <Badge variant="new" />
              <h2 className="flex-1 text-h3-semibold text-layout-header-default u-ellipsis">
                {title}
              </h2>
            </div>
            <span className="text-body2-regular text-layout-body-default">
              노원구 00동 · 30분 전
            </span>
          </div>
          <p className="w-full text-body2-regular text-neutral-normal-default u-ellipsis">
            {description}
          </p>
        </div>
        <div className="mt-2 flex gap-2">
          {VIEW_ITEM.map((item) => (
            <span
              key={item.icon}
              className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder"
            >
              <Icon name={item.icon} size={16} />
              {item.count}
            </span>
          ))}
        </div>
      </div>
      {img && (
        <Image
          src={img}
          alt="아이템 이미지"
          width={90}
          height={90}
          className="h-[90px] w-[90px] rounded-[10px]"
        />
      )}
    </Link>
  );
};

export default ListItem;
