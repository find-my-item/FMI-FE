import { useEffect, useState } from "react";
import { FooterLinkHref } from "./CONST_FOOTER";

const useLoginNoticeTimer = () => {
  const [loginNoticeFor, setLoginNoticeFor] = useState<FooterLinkHref | null>(null);

  useEffect(() => {
    if (!loginNoticeFor) return;

    const timerId = setTimeout(() => {
      setLoginNoticeFor(null);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [loginNoticeFor]);

  return { loginNoticeFor, setLoginNoticeFor };
};

export default useLoginNoticeTimer;
