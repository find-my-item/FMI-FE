import { DetailHeader } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader />
      <h1 className="sr-only">서비스소개 페이지</h1>
      {children}
    </>
  );
};

export default layout;
