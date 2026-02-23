import { shareWithKakao } from "./shareWithKakao";
import { MetaDataType } from "@/types";

describe("shareWithKakao", () => {
  it("카카오톡 공유를 실행한다", () => {
    const sendDefaultMock = jest.fn();

    (window as any).Kakao = {
      isInitialized: jest.fn().mockReturnValue(true),
      Share: {
        sendDefault: sendDefaultMock,
      },
    };

    const metaData: MetaDataType = {
      title: "제목",
      summary: "설명",
      thumbnailUrl: "https://example.com/image.png",
      link: "https://example.com",
    };

    shareWithKakao(metaData);

    expect(sendDefaultMock).toHaveBeenCalledTimes(1);
    expect(sendDefaultMock).toHaveBeenCalledWith({
      objectType: "location",
      content: {
        title: metaData.title,
        description: metaData.summary,
        imageUrl: metaData.thumbnailUrl,
        link: {
          mobileWebUrl: metaData.link,
          webUrl: metaData.link,
        },
      },
    });
  });
});
