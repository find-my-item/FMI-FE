import { shareWithKakao } from "./shareWithKakao";
import { MOCK_POST_META_DATA } from "@/mock/data";

describe("shareWithKakao", () => {
  it("카카오톡 공유를 실행한다", () => {
    const sendDefaultMock = jest.fn();

    (window as any).Kakao = {
      isInitialized: jest.fn().mockReturnValue(true),
      Share: {
        sendDefault: sendDefaultMock,
      },
    };
    shareWithKakao(MOCK_POST_META_DATA);

    expect(sendDefaultMock).toHaveBeenCalledTimes(1);
    expect(sendDefaultMock).toHaveBeenCalledWith({
      objectType: "location",
      address: MOCK_POST_META_DATA.address,
      addressTitle: MOCK_POST_META_DATA.title,
      content: {
        title: MOCK_POST_META_DATA.title,
        description: MOCK_POST_META_DATA.summary,
        imageUrl: MOCK_POST_META_DATA.thumbnailUrl,
        link: {
          mobileWebUrl: MOCK_POST_META_DATA.link,
          webUrl: MOCK_POST_META_DATA.link,
        },
      },
      social: {
        likeCount: MOCK_POST_META_DATA.likeCount,
        commentCount: MOCK_POST_META_DATA.commentCount,
        viewCount: MOCK_POST_META_DATA.viewCount,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: MOCK_POST_META_DATA.link,
            webUrl: MOCK_POST_META_DATA.link,
          },
        },
      ],
    });
  });
});
