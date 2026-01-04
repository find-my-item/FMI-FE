import { Button, InputText } from "@/components";
import AuthFooterButton from "@/components/domain/AuthFooterButton/AuthFooterButton";
import { CHANGE_PASSWORD_CONFIG } from "../../_constants/CHANGE_PASSWORD_CONFIG";

const MypageChangeEmailForm = () => {
  return (
    <form className="flex flex-col h-base">
      <div className="flex w-full flex-col gap-5 px-5 py-[30px]">
        {CHANGE_PASSWORD_CONFIG.map((item) => (
          <div key={item.name} className="h-[92px]">
            <InputText {...item} />
          </div>
        ))}
      </div>
      <AuthFooterButton name="변경 완료" ariaLabel="비밀번호 변경하기" />
    </form>
  );
};

export default MypageChangeEmailForm;
