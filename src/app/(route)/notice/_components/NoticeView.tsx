import { NoticeCustomerState } from "../_types/noticeContainer";
import ListItem from "../../list/_components/ListItem/ListItem";
import { noticeListObject } from "../_constant/noticeListObject";

interface NoticeView {
  noticeCustomerState: NoticeCustomerState;
}

const NoticeView = ({ noticeCustomerState }: NoticeView) => {
  return (
    <div>
      {noticeCustomerState === "customer" ? (
        <h1>고객센터</h1>
      ) : (
        noticeListObject.map((item) => (
          <ListItem
            id={item.id}
            title={item.title}
            description={item.body}
            img={""}
            key={item.id}
            linkState="notice"
          />
        ))
      )}
    </div>
  );
};

export default NoticeView;
