import DetailHeader from "@/components/DetailHeader/DetailHeader";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DetailHeader title="유실물 발생 시 매뉴얼" />
      <div className="w-full h-[calc(100vh-60px)]">{children}</div>
    </>
  );
};

export default layout;
