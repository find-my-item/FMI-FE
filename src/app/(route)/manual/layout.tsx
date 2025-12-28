import { DetailHeader } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader title="유실물 발생 시 매뉴얼" />
      <section className="min-h-[calc(100vh-60px)] w-full">{children}</section>
    </>
  );
};

export default layout;
