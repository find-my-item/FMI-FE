import { Meta } from "@storybook/react";
import ListItem from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "Components/List/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const ListItemStory = () => <ListItem />;
