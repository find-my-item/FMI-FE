import Icon from "@/components/Icon/Icon";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-60px)] w-full">
      {children}
      <button
        aria-label="글쓰기"
        className="card-glass fixed bottom-5 right-5 h-[70px] w-[70px] rounded-full border border-white bg-[#1EB87B]/70 flex-center"
      >
        <Icon name="Plus" size={32} />
      </button>
    </div>
  );
};

export default layout;
