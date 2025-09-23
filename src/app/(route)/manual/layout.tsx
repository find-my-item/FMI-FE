import ManualHeader from "./_components/ManualHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ManualHeader />
      <div className="w-full h-[calc(100vh-60px)]">{children}</div>
    </>
  );
};

export default layout;
