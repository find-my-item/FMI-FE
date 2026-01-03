import { FloatingButton } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-base">
      {children}
      <div className="fixed bottom-5 right-5">
        <FloatingButton ariaLabel="글쓰기" />
      </div>
    </div>
  );
};

export default layout;
