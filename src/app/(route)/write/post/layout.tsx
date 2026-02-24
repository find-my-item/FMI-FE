import { ReactNode } from "react";
import { PostWriteFormProvider } from "./location/_components";

// TODO(지권): 글쓰기 페이지 우상단 임시저장 버튼 클릭 시 모달 (기획 미확정)
// TODO(지권): 이미지 미등록 모달 표시
// TODO(지권): 지도 페이지 디자인 변경사항 반영 (위치 검색, 지도 범위 선택 디자인)

const Layout = ({ children }: { children: ReactNode }) => {
  return <PostWriteFormProvider>{children}</PostWriteFormProvider>;
};

export default Layout;
