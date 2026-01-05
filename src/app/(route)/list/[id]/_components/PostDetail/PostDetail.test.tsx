import { render, screen } from "@testing-library/react";
import PostDetail from "./PostDetail";

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));

const item = {
  id: 1,
  title: "서비스 점검 안내",
  body: "안정적인 서비스 제공을 위해 9월 28일(일) 새벽 2시부터 4시까지 서버 점검이 진행됩니다. 점검 시간 동안 서비스 이용이 제한되니 양해 부탁드립니다.",
};

describe("게시글 상세 페이지", () => {
  it("게시글 상세 페이지의 제목이 렌더링되어야 한다.", () => {
    render(<PostDetail type="find" item={item} />);

    const postDetailElement = screen.getByText("강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실");
    expect(postDetailElement).toBeInTheDocument();
  });

  it("게시글 상세 페이지의 시간이 렌더링되어야 한다.", () => {
    render(<PostDetail type="find" item={item} />);

    const postDetailElement = screen.getByText("30분 전");
    expect(postDetailElement).toBeInTheDocument();
  });

  it("게시글 상세 페이지의 내용이 렌더링되어야 한다.", () => {
    render(<PostDetail type="find" item={item} />);

    const postDetailElement = screen.getByText(
      "12/26 오전 9시쯤 강남역 2호선 개찰구 근처에서 에어팟(2세대, 케이스 포함)을 분실했습니다. 습득하신 분 연락 부탁드립니다."
    );
    expect(postDetailElement).toBeInTheDocument();
  });

  it("게시글 상세 페이지의 조회수와 좋아요가 렌더링되어야 한다.", () => {
    render(<PostDetail type="find" item={item} />);

    const postDetailElement = screen.getByText("조회 24");
    expect(postDetailElement).toBeInTheDocument();

    const postDetailElement2 = screen.getByText("즐겨찾기 1");
    expect(postDetailElement2).toBeInTheDocument();
  });
});
