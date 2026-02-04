import { render, screen } from "@testing-library/react";
import PostDetailHeader from "./PostDetailHeader";

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));

const mockData = {
  imageUrls: [],
  id: "1",
  userData: {
    userId: 1,
    nickName: "글자확인용임시닉네임",
    profileImage: "",
    postCount: 0,
    chattingCount: 0,
  },
};

describe("상세페이지 상단 헤더", () => {
  it("헤더가 렌더링되어야 한다.", () => {
    render(
      <PostDetailHeader
        headerData={{ ...mockData, userData: mockData.userData, imageResponseList: [] }}
      />
    );

    const postDetailHeaderElement = screen.getByLabelText("게시글 작성자 정보");
    expect(postDetailHeaderElement).toBeInTheDocument();
  });

  it("닉네임이 렌더링되어야 한다.", () => {
    render(
      <PostDetailHeader
        headerData={{ ...mockData, userData: mockData.userData, imageResponseList: [] }}
      />
    );

    const postDetailHeaderElement = screen.getByText("글자확인용임시닉네임");
    expect(postDetailHeaderElement).toBeInTheDocument();
  });

  it("채팅하러가기 버튼이 렌더링되어야 한다.", () => {
    render(
      <PostDetailHeader
        headerData={{ ...mockData, userData: mockData.userData, imageResponseList: [] }}
      />
    );

    const postDetailHeaderElement = screen.getByRole("link", { name: "채팅하러 가기" });
    expect(postDetailHeaderElement).toBeInTheDocument();
  });
});
