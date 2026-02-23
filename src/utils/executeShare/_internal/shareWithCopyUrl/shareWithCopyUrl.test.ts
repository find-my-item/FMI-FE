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
    expect(addToast).toHaveBeenCalledWith("링크를 클립보드에 복사했어요", "success");
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

    expect(addToast).toHaveBeenCalledWith("클립보드 복사에 실패했어요", "error");
  });
});
