import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks";
import { AdminDropdown, AdminFilter } from "../../../_components";

const GuestInquiriesFilter = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<"status" | "answer" | null>(null);

  const ref = useClickOutside(() => setActiveDropdown(null));

  const guestInquiriesFilters = [
    {
      label: "상태",
      onSelected: activeDropdown === "status",
      onClick: () => setActiveDropdown((prev) => (prev === "status" ? null : "status")),
    },
    {
      label: "답변",
      onSelected: activeDropdown === "answer",
      onClick: () => setActiveDropdown((prev) => (prev === "answer" ? null : "answer")),
    },
  ];

  return (
    <div ref={ref} className="relative">
      <AdminFilter filters={guestInquiriesFilters} />

      {activeDropdown === "status" && (
        <AdminDropdown
          open={true}
          className="left-5"
          options={[
            { label: "전체", value: "" },
            { label: "접수", value: "received" },
            { label: "검토 중", value: "pending" },
            { label: "처리 완료", value: "answered" },
          ]}
          onSelect={(value) => {
            setActiveDropdown(null);
            router.push(`/admin/guest-inquiries?status=${value}`);
          }}
        />
      )}

      {activeDropdown === "answer" && (
        <AdminDropdown
          open={true}
          className="left-[100px]"
          options={[
            { label: "전체", value: "" },
            { label: "미답변", value: "unanswered" },
            { label: "답변완료", value: "answered" },
          ]}
          onSelect={(value) => {
            setActiveDropdown(null);
            router.push(`/admin/guest-inquiries?answer=${value}`);
          }}
        />
      )}
    </div>
  );
};

export default GuestInquiriesFilter;
