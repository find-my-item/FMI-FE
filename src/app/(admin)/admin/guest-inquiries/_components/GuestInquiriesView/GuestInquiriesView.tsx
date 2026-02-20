import { AdminFilter, AdminSearch } from "../../../_components";
import GuestInquiriesList from "../GuestInquiriesList/GuestInquiriesList";

// TODO(지권): 필터 기능 추가
const guestInquiriesFilters = [
  {
    label: "상태",
    onSelected: false,
    onClick: () => {},
  },
  {
    label: "답변",
    onSelected: false,
    onClick: () => {},
  },
];

const GuestInquiriesView = () => {
  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={guestInquiriesFilters} />

      <GuestInquiriesList />
    </div>
  );
};

export default GuestInquiriesView;
