import { executeShare } from "./executeShare";
import { MetaDataType } from "@/types";
import { shareWithCopyUrl, shareWithKakao, shareWithNative } from "./_internal";

jest.mock("./_internal", () => ({
  shareWithKakao: jest.fn(),
  shareWithNative: jest.fn(),
  shareWithCopyUrl: jest.fn(),
}));

const metaData: MetaDataType = {
  title: "test",
  summary: "test",
  thumbnailUrl: "test",
  link: "test",
};

describe("executeShare", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("kakao id를 받으면 카카오톡으로 공유한다", () => {
    executeShare({
      id: "kakao",
      metaData,
    });

    expect(shareWithKakao).toHaveBeenCalledTimes(1);
    expect(shareWithKakao).toHaveBeenCalledWith({ ...metaData });
  });

  it("native id를 받으면 네이티브로 공유한다", () => {
    executeShare({
      id: "native",
      metaData,
    });

    expect(shareWithNative).toHaveBeenCalledTimes(1);
    expect(shareWithNative).toHaveBeenCalledWith({ metaData: { ...metaData } });
  });

  it("copy id를 받으면 복사한다", () => {
    executeShare({
      id: "copy",
      metaData,
    });

    expect(shareWithCopyUrl).toHaveBeenCalledTimes(1);
  });
});
