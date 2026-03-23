"use client";

import { Suspense, useState } from "react";
import { AlertCategory, AlertDetailHeader, AlertView } from "./_components";

const Alert = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <>
      <AlertDetailHeader isDeleteMode={isDeleteMode} setIsDeleteMode={setIsDeleteMode} />
      <Suspense fallback="">
        <AlertCategory />
        <AlertView isDeleteMode={isDeleteMode} setIsDeleteMode={setIsDeleteMode} />
      </Suspense>
    </>
  );
};

export default Alert;
