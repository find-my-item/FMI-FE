import Link from "next/link";
import { Icon } from "@/components/common";

const LogoLink = () => {
  return (
    <Link className="cursor-pointer flex-center" href={"/"} aria-label="메인페이지 이동">
      <Icon name="Logo" size={50} title="로고" />
      <h2 className="text-h2-bold text-flatGreen-500">찾아줘!</h2>
    </Link>
  );
};

export default LogoLink;
