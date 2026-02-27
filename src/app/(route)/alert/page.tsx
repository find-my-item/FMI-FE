import { Suspense } from "react";
import { AlertCategory, AlertView } from "./_components";
import { EmptyState } from "@/components/state";

const Alert = () => {
  return (
    <Suspense fallback="">
      <AlertCategory />
      <AlertView />
      {/* <EmptyState
        icon={{ iconName: "AlertBell", iconSize: 70 }}
        title="아직 새 소식이 없어요"
        description={`주변을 계속 살펴보고 있어요.\n새로운 알림이 생기면 바로 알려드릴게요.`}
      /> */}
    </Suspense>
  );
};

export default Alert;
