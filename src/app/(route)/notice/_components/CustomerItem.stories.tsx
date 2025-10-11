import { Meta } from "@storybook/nextjs";
import CustomerItem from "./CustomerItem";

const meta: Meta<typeof CustomerItem> = {
  title: "페이지/고객센터 리스트 페이지/CustomerItem",
  component: CustomerItem,
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

export const CustomerListStory = () => (
  <CustomerItem
    item={{
      id: 1,
      category: "로그인",
      title: "로그인이 안됩니다.",
      body: "로그인이 되지 않는 경우, 아이디와 비밀번호를 다시 확인해 주세요. 문제가 계속되면 브라우저 캐시를 지우고 재시도하거나 1:1 문의를 통해 도움을 요청할 수 있습니다.",
    }}
  />
);
