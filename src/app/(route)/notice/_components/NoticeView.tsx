import { NoticeCustomerState } from "../_types/noticeContainer";
import NoticeList from "./NoticeList";

interface NoticeView {
  noticeCustomerState: NoticeCustomerState;
}

const NoticeView = ({ noticeCustomerState }: NoticeView) => {
  return <div>{noticeCustomerState === "customer" ? <h1>고객센터</h1> : <NoticeList />}</div>;
};

export default NoticeView;
