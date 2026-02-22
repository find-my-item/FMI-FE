import { Button, Icon } from "@/components/common";

const MainSearchEmpty = () => {
  return (
    <div className="mt-20 w-full gap-5 flex-col-center">
      {/* TODO(형준): 배경색 토큰 반영 후 변경 */}
      <div className="h-[54px] w-[54px] rounded-full border-[2.8px] border-white/30 bg-[#7AE7BB]/50 backdrop-blur-[11.19px] flex-center">
        <Icon name="MainSearchWarning" size={48} className="mt-1" />
      </div>
      <p className="text-h2-bold text-layout-header-default">검색어와 일치하는 결과가 없어요</p>
      <span className="whitespace-pre-line text-center text-body2-regular text-layout-body-default">
        {`찾으시는 물건이 아직 등록되지 않았네요.\n직접 글을 올려 더 많은 사람에게 알려보세요.`}
      </span>
      <Button variant="outlined" size="big">
        게시글 작성하러 가기
      </Button>
    </div>
  );
};

export default MainSearchEmpty;
