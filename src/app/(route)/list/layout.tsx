const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-[calc(100vh-60px)] w-full">{children}</div>;
};

export default layout;
