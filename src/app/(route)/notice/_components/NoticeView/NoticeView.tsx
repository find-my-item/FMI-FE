import { NoticeCustomerState } from "../../_types/noticeContainer";
import { noticeListObject } from "../../_constant/noticeListObject";
import Customer from "../Customer/Customer";
import { PostListItem } from "@/components/domain";

interface NoticeView {
  noticeCustomerState: NoticeCustomerState;
}

const NoticeView = ({ noticeCustomerState }: NoticeView) => {
  return (
    <>
      {noticeCustomerState === "customer" ? (
        <Customer />
      ) : (
        noticeListObject.map((item) => (
          <PostListItem
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
              createdAt: "",
            }}
            linkState="notice"
          />
        ))
      )}
    </>
  );
};

export default NoticeView;
