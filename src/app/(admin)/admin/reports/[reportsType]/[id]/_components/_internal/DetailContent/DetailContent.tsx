import { formatDate } from "@/utils";

interface DetailContentProps {
  title: string;
  userName: string;
  createdAt: string;
  content: string;
}

const DetailContent = ({ data }: { data: DetailContentProps }) => {
  const { title, userName, createdAt, content } = data;

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2-bold text-layout-header-default">{title}</h2>
        <div className="flex items-center text-body2-regular text-layout-body-default">
          <span className="block after:mx-1 after:content-['·']">{userName}</span>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </div>
      </div>

      <p className="text-body1-regular text-layout-header-default">{content}</p>
    </div>
  );
};

export default DetailContent;
