import type { Meta, StoryObj } from "@storybook/nextjs";
import ManualItem from "./ManualList";

const meta: Meta<typeof ManualItem> = {
  title: "페이지/매뉴얼 페이지/ManualItem",
  component: ManualItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "유실물/습득물 안내 블록 컴포넌트. 제목, 내용, (선택) 버튼 링크를 표시합니다.",
      },
    },
  },
  argTypes: {
    item: {
      title: { control: "text", description: "카드 제목" },
      content: { control: "text", description: "본문 설명" },
      btnText: { control: "text", description: "버튼 텍스트(선택)" },
      href: { control: "text", description: "버튼 링크 URL(선택)" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "386px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ManualItem>;

export const Default: Story = {
  args: {
    item: {
      title: "신용카드를 분실하셨나요?",
      content: (
        <>
          신용카드는 분실 시에는 해당 카드사에 분실신고를 해야해요. <br /> 여러장의 신용카드를 분실
          했을 경우, 신용카드 분실 일괄신고 서비스를 이용해 분실할 신용카드사 중 한 곳의 고객센터에
          신고하여 타사 카드까지 분실 등록이 가능해요. <br />
          <br /> 법인카드는 개인 명의로 발급되어 있다 해도 일괄 신고를 할 수 없어 별도로 분실신고를
          해야 해요.
        </>
      ),
    },
  },
};

export const WithButtonLink: Story = {
  args: {
    item: {
      title: "경찰청 신고 내역을 확인했나요?",
      content: (
        <>
          경찰청 유실물 종합 포털(https://www.lost112.go.kr/)을 통해 경찰청에서 보관 중인 유실물을
          확인해 보세요.
        </>
      ),
      href: "https://www.lost112.go.kr/",
      btnText: "경찰청 바로가기",
    },
    isOpen: true,
  },
};
