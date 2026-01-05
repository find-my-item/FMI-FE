import { DetailHeader } from "@/components/layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader title="유실물 발생 시 매뉴얼" />
      <h1 className="sr-only">매뉴얼 페이지</h1>
      <section className="w-full h-base">{children}</section>
    </>
  );
};

export default layout;
