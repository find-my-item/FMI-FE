import { Suspense } from "react";
import { AlertCategory, AlertView } from "./_components";

const Alert = () => {
  return (
    <Suspense fallback="">
      <AlertCategory />
      <AlertView />
    </Suspense>
  );
};

export default Alert;
