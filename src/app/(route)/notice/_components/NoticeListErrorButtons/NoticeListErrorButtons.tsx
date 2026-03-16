"use client";

import { Button } from "@/components/common";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const NoticeListErrorButtons = () => {
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outlined"
        size="big"
        onClick={() => queryClient.refetchQueries({ queryKey: ["notices"] })}
      >
        새로고침
      </Button>
      <Button variant="outlined" size="big" as={Link} href="/contact">
        고객센터 문의
      </Button>
    </div>
  );
};

export default NoticeListErrorButtons;
