import { shareWithCopyUrl } from "./shareWithCopyUrl";

describe("shareWithCopyUrl", () => {
  it("클립보드 복사 성공 시 성공 토스트를 호출한다", async () => {
    const url = "https://example.com";
    const addToast = jest.fn();

    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await shareWithCopyUrl(url, addToast);

    expect(writeTextMock).toHaveBeenCalledWith(url);
    expect(addToast).toHaveBeenCalledWith("URL이 복사되었습니다.", "success");
  });

  it("클립보드 복사 실패 시 실패 토스트를 호출한다", async () => {
    const url = "https://example.com";
    const addToast = jest.fn();

    const writeTextMock = jest.fn().mockRejectedValue(new Error("fail"));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await shareWithCopyUrl(url, addToast);

    expect(addToast).toHaveBeenCalledWith("URL 복사에 실패했습니다.", "error");
  });
});
