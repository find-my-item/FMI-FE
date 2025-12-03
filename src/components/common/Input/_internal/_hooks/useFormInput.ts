import { useCallback } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

export const useFormInput = () => {
  const { setValue, clearErrors } = useFormContext();

  // 값 삭제
  const onDelete = useCallback((name: string) => {
    setValue(name, "", {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    clearErrors(name);
  }, []);

  return {
    onDelete,
  };
};
