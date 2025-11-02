import { NoticeCustomerState } from "../../_types/noticeContainer";
import ListItem from "../../../list/_components/ListItem/ListItem";
import { noticeListObject } from "../../_constant/noticeListObject";
import Customer from "../Customer/Customer";

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
    </>
  );
};

export default NoticeView;
