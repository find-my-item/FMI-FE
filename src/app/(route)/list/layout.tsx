import { FloatingButton } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-60px)] w-full">
      {children}
      <div className="fixed bottom-5 right-5">
        <FloatingButton ariaLabel="글쓰기" />
      </div>
    </div>
  );
};

export default layout;
