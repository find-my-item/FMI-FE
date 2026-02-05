import { AdminFilter, AdminSearch } from "../../../_components";
import GuestInquiriesList from "../GuestInquiriesList/GuestInquiriesList";

const filters = [
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

      <AdminFilter filters={filters} />

      <GuestInquiriesList />
    </div>
  );
};

export default GuestInquiriesView;
