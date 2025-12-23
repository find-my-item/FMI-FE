import { DetailHeader } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader />
      {children}
    </>
  );
};

export default layout;
