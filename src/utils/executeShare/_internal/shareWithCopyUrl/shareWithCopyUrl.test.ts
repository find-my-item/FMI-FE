import { shareWithCopyUrl } from "./shareWithCopyUrl";

describe("shareWithCopyUrl", () => {
  it("클립보드 복사 실패 시 prompt를 호출한다", async () => {
    const url = "https://example.com";

    Object.defineProperty(window, "location", {
      value: { href: url },
      writable: true,
    });

    const writeTextMock = jest.fn().mockRejectedValue(new Error("fail"));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const promptSpy = jest.spyOn(window, "prompt").mockImplementation(() => null);

    await shareWithCopyUrl();

    expect(promptSpy).toHaveBeenCalledWith("링크를 복사하세요.", url);
  });
});
