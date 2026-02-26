import { Icon } from "@/components/common";

const AlertEmpty = () => {
  return (
    <div className="gap-5 py-20 flex-col-center">
      <Icon name="AlertBell" size={70} />
      <p className="text-h2-bold text-layout-header-default">아직 새 소식이 없어요</p>
      <span className="whitespace-pre-line text-center text-body2-regular text-layout-body-default">
        {`주변을 계속 살펴보고 있어요.\n새로운 알림이 생기면 바로 알려드릴게요.`}
      </span>
    </div>
  );
};

export default AlertEmpty;
