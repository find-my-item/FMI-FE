import Button from "@/app/components/common/Button/Button";
import { InputStyle } from "../styles/authStyle";

const Page = () => {
  return (
    <div>
      <input type="text" className={InputStyle} />
      <input type="text" className={InputStyle} />
      <Button children="로그인" type="submit" className={InputStyle} label="로그인 버튼" />
      <input type="checkbox" />
    </div>
  );
};

export default Page;
