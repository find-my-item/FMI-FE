import Link from "next/link";
import { Icon } from "@/components";

const Logo = () => {
  return (
    <Link className="cursor-pointer flex-center" href={"/"}>
      <Icon name="Logo" size={50} title="로고" aria-label="메인페이지 이동" />
      <h2 className="text-[20px] font-bold text-[#1EB87B]">찾아줘!</h2>
    </Link>
  );
};

export default Logo;
