"use no memo";

import { InputType } from "../../../types/InputType";
import { InputText } from "@/components";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useAppQuery from "@/api/query/useAppQuery";

interface SignUpItemProps {
  item: InputType;
}

type responseType = {
  isSuccess: boolean;
  code: "string";
  message: "string";
  result: "string";
};

const SignUpItem = ({ item }: SignUpItemProps) => {
  // const { getValues } = useFormContext();

  const ClickHandler = () => {};

  return (
    <div className="h-[96px]">
      {/* TODO(수현): props 줄이기  */}
      <InputText
        name={item.name}
        label={item.label}
        type={item.type}
        placeholder={item.placeholder}
        validation={item.validation}
        rule={item.rule}
        eyeShow={item.eyeShow}
        btnOnClick={ClickHandler}
      >
        {item.btnText}
      </InputText>
    </div>
  );
};

export default SignUpItem;
