import ManualHeader from "./_components/ManualHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ManualHeader />
      {children}
    </>
  );
};

export default layout;
