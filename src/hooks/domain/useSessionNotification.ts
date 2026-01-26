import { useToast } from "@/context/ToastContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSessionNotification = () => {
  const { addToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("reason") === "session-expired") {
      addToast("세션이 만료되었어요. 다시 로그인 해주세요.", "warning");
    }
  }, [searchParams, addToast, router]);
};

export default useSessionNotification;
