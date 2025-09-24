import Button from "@/app/components/common/Button/Button";
import { InputStyle } from "../styles/authStyle";

const Page = () => {
  return (
    <div>
      <input type="text" className={InputStyle} />
      <input type="text" className={InputStyle} />
      <Button children="로그인" type="submit" style={InputStyle} />
      <input type="checkbox" />
    </div>
  );
};

export default Page;
