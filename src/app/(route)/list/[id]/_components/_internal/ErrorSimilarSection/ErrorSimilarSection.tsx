import { Button } from "@/components/common";

const ErrorSimilarSection = () => {
  return (
    <div className="space-y-[18px] py-[10px] flex-col-center">
      <div className="">{/* TODO(지권): 아이콘 추가 예정 */}</div>
      <div className="space-y-7 flex-col-center">
        <div className="space-y-2 text-center">
          <p className="text-h2-bold text-layout-header-default">게시글을 불러올 수 없습니다.</p>
          <span className="block text-body2-regular text-layout-body-default">
            오류가 발생해 게시글을 불러오지 못했습니다.
            <br />
            다시 한 번 시도해 주세요.
          </span>
        </div>
        <Button variant="outlined" className="h-[36px] w-[67px] px-3">
          새로고침
        </Button>
      </div>
    </div>
  );
};

export default ErrorSimilarSection;
