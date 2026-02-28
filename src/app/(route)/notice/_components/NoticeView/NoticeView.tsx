import { noticeListObject } from "../../_constant/noticeListObject";
import { PostListItem } from "@/components/domain";

const NoticeView = () => {
  return (
    <>
      {noticeListObject.map((item) => (
        <PostListItem
          key={item.id}
          post={{
            postId: item.id,
            title: item.title,
            summary: item.body,
            thumbnailUrl: "",
            address: "",
            category: "ELECTRONICS",
            itemStatus: "SEARCHING",
            postType: "LOST",
            favoriteCount: 0,
            viewCount: 0,
            createdAt: "",
            new: false,
            hot: false,
          }}
          linkState="notice"
        />
      ))}
    </>
  );
};

export default NoticeView;
