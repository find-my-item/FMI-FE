const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex h-[calc(100dvh-4px)] w-full flex-col">{children}</main>;
};

export default layout;
