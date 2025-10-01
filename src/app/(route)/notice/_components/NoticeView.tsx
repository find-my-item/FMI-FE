import { NoticeCustomerState } from "../_types/noticeContainer";
import ListItem from "../../list/_components/ListItem/ListItem";
import { noticeListObject } from "../_constant/noticeListObject";
import Customer from "./Customer";

interface NoticeView {
  noticeCustomerState: NoticeCustomerState;
}

const NoticeView = ({ noticeCustomerState }: NoticeView) => {
  return (
    <div>
      {noticeCustomerState === "customer" ? (
        <Customer />
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
