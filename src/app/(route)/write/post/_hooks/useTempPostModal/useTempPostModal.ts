import { useEffect, useRef, useState } from "react";
import { GetTempPostResponse } from "@/api/fetch/post";

const useTempPostModal = (tempPost: GetTempPostResponse | undefined, isLoading: boolean) => {
  const [open, setOpen] = useState(false);
  const promptedRef = useRef(false);

  useEffect(() => {
    if (promptedRef.current) return;
    if (isLoading) return;

    if (tempPost?.result) {
      promptedRef.current = true;
      setOpen(true);
    }
  }, [tempPost?.result, isLoading]);

  return { open, setOpen };
};

export default useTempPostModal;
