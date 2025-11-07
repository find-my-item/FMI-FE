const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-[calc(100dvh-4px)] w-full flex-col">{children}</div>;
};

export default layout;
