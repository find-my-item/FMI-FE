"use client";

import NotFound from "@/app/not-found";
import WriteForm from "../WriteForm/WriteForm";
import useWritePageType from "../../_hooks/useWritePageType/useWritePageType";

const WritePage = () => {
  const { isValid, title } = useWritePageType();
  if (!isValid) return <NotFound />;

  return <WriteForm title={title} />;
};

export default WritePage;
