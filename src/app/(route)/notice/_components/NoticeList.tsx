import NoticeItem from "./NoticeItem";
import { NoticeListObject } from "../_constant/noticeListObject";

const NoticeList = () => {
  return (
    <div>
      {NoticeListObject.map((item) => (
        <NoticeItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default NoticeList;
