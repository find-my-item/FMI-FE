import { Meta, StoryObj } from "@storybook/nextjs";
import ImageSection from "./ImageSection";
import { ToastProvider } from "@/providers/ToastProviders";

const meta: Meta<typeof ImageSection> = {
  title: "페이지/글쓰기/ImageSection",
  component: ImageSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-[390px]">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
