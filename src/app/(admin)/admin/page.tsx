import { AdminMenuSection, AdminProfile } from "./_components";

const page = () => {
  return (
    <div className="h-base">
      <h1 className="sr-only">관리자 페이지</h1>

      <AdminProfile />
      <AdminMenuSection />
    </div>
  );
};

export default page;
