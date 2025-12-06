import { Suspense } from "react";
import { AlertTab, AlertCategory, AlertView } from "./_components";

const Alert = () => {
  return (
    <Suspense fallback="">
      <AlertTab />
      <AlertCategory />
      <AlertView />
    </Suspense>
  );
};

export default Alert;
