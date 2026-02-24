"use client";

import { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PostWriteFormValues } from "../../../_types/PostWriteType";
import { useWriteFlowStore } from "@/store";

const defaultValues: PostWriteFormValues = {
  postType: "",
  title: "",
  date: "",
  address: "",
  latitude: null,
  longitude: null,
  radius: null,
  category: "",
  content: "",
  images: [],
  temporarySave: false,
};

const PostWriteFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<PostWriteFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const resetWriteFlow = useWriteFlowStore((s) => s.resetWriteFlow);

  useEffect(() => {
    return () => {
      resetWriteFlow();
    };
  }, [resetWriteFlow]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default PostWriteFormProvider;
