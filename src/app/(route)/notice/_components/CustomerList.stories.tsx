import { Meta } from "@storybook/nextjs";
import CustomerList from "./CustomerList";

const meta: Meta<typeof CustomerList> = {
  title: "페이지/고객센터 리스트 페이지/CustomerList",
  component: CustomerList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[430px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const CustomerListStory = () => <CustomerList />;
