import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState, useEffect } from "react";
import ToggleButton from "./ToggleButton";

const meta = {
  title: "공통 컴포넌트/ToggleButton",
  component: ToggleButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [toggleState, setToggleState] = useState(args.toggleState);

    // args.toggleState가 바뀌면 내부 상태도 업데이트
    useEffect(() => {
      setToggleState(args.toggleState);
    }, [args.toggleState]);

    return (
      <ToggleButton
        {...args}
        toggleState={toggleState}
        onClick={() => setToggleState((prev) => !prev)}
      />
    );
  },
  args: {
    toggleState: false,
    disabled: false,
  },
};
