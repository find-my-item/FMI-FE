"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValue } from "../types/FormData";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return <div></div>;
};

export default Page;
