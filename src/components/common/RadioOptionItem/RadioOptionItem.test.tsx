import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioOptionItem from "./RadioOptionItem";

describe("<RadioOptionItem />", () => {
  const baseProps = {
    option: { value: "FOOD", label: "음식" },
    inputName: "category",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("라벨 텍스트를 렌더링합니다.", () => {
    render(<RadioOptionItem {...baseProps} selected="" />);

    expect(screen.getByText("음식")).toBeInTheDocument();
  });

  it("radio input의 name/value가 올바르게 설정됩니다.", () => {
    render(<RadioOptionItem {...baseProps} selected="" />);

    const radio = screen.getByRole("radio", { name: "음식" });

    expect(radio).toHaveAttribute("name", "category");
    expect(radio).toHaveAttribute("value", "FOOD");
  });

  it("selected가 option.value와 같으면 checked 상태입니다.", () => {
    render(<RadioOptionItem {...baseProps} selected="FOOD" />);

    const radio = screen.getByRole("radio", { name: "음식" });

    expect(radio).toBeChecked();
  });

  it("selected가 option.value와 다르면 unchecked 상태입니다.", () => {
    render(<RadioOptionItem {...baseProps} selected="OTHER" />);

    const radio = screen.getByRole("radio", { name: "음식" });

    expect(radio).not.toBeChecked();
  });

  it("클릭하면 onChange가 value로 호출됩니다.", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<RadioOptionItem {...baseProps} selected="" onChange={onChange} />);

    await user.click(screen.getByText("음식"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("FOOD");
  });
});
