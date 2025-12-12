import { createChatFilterButtons } from "./createChatFilterButtons";

describe("createChatFilterButtons", () => {
  it("3개의 필터 버튼을 반환합니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    expect(buttons).toHaveLength(3);
  });

  it("첫 번째 버튼은 지역 선택 버튼입니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    const regionButton = buttons[0];
    expect(regionButton.text).toBe("지역 선택");
    expect(regionButton.icon).toBe("Location");
    expect(regionButton.iconPosition).toBe("leading");
    expect(regionButton.iconSize).toBe(16);
  });

  it("두 번째 버튼은 최신순 버튼입니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    const latestButton = buttons[1];
    expect(latestButton.text).toBe("최신순");
    expect(latestButton.icon).toBe("ArrowDown");
    expect(latestButton.iconPosition).toBe("trailing");
    expect(latestButton.iconSize).toBe(12);
  });

  it("세 번째 버튼은 습득/분실 버튼입니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    const typeButton = buttons[2];
    expect(typeButton.text).toBe("습득/분실");
    expect(typeButton.icon).toBe("ArrowDown");
    expect(typeButton.iconPosition).toBe("trailing");
    expect(typeButton.iconSize).toBe(12);
  });

  it("지역 선택 버튼의 onClick이 searchUpdateQuery를 올바른 인자로 호출합니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    const regionButton = buttons[0];
    if (regionButton.onClick) {
      regionButton.onClick();
    }

    expect(mockSearchUpdateQuery).toHaveBeenCalledTimes(1);
    expect(mockSearchUpdateQuery).toHaveBeenCalledWith("search", "region");
  });

  it("최신순 버튼과 습득/분실 버튼은 onClick이 없습니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    const latestButton = buttons[1];
    const typeButton = buttons[2];

    expect(latestButton.onClick).toBeUndefined();
    expect(typeButton.onClick).toBeUndefined();
  });

  it("각 버튼이 올바른 속성을 가지고 있습니다", () => {
    const mockSearchUpdateQuery = jest.fn();
    const buttons = createChatFilterButtons(mockSearchUpdateQuery);

    // 첫 번째 버튼 (지역 선택)
    expect(buttons[0]).toEqual({
      text: "지역 선택",
      icon: "Location",
      iconPosition: "leading",
      iconSize: 16,
      onClick: expect.any(Function),
    });

    // 두 번째 버튼 (최신순)
    expect(buttons[1]).toEqual({
      text: "최신순",
      icon: "ArrowDown",
      iconPosition: "trailing",
      iconSize: 12,
    });

    // 세 번째 버튼 (습득/분실)
    expect(buttons[2]).toEqual({
      text: "습득/분실",
      icon: "ArrowDown",
      iconPosition: "trailing",
      iconSize: 12,
    });
  });
});
