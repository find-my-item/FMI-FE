"use client";

import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PostWriteFormValues } from "../../../_types/PostWriteType";

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

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default PostWriteFormProvider;
