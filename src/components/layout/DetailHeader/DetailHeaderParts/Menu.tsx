import { KebabMenuButton } from "@/components/common";
import { BaseButtonProps } from "./BaseButtonPropsType";

const Menu = (props: BaseButtonProps & { size?: "large" | "small" }) => {
  return <KebabMenuButton {...props} />;
};

export default Menu;
