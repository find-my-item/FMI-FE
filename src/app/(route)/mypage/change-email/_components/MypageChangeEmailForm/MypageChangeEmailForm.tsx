import { Button, InputText } from "@/components";
import { CHANGE_EMAIL_INPUT_CONFIG } from "../../_constants/CHANGE_EMAIL_INPUT_CONFIG";

const MypageChangeEmailForm = () => {
  return (
    <form className="flex flex-col h-base">
      <div className="flex w-full flex-col gap-5 px-5 py-[30px]">
        {CHANGE_EMAIL_INPUT_CONFIG.map((item) => (
          <div key={item.name} className="h-[92px]">
            <InputText {...item}>{item.children}</InputText>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 mt-auto h-[88px] w-full border-t border-divider-default bg-white px-4 py-3">
        <Button type="submit" variant="auth" ariaLabel="설정완료 버튼">
          설정 완료
        </Button>
      </div>
    </form>
  );
};

export default MypageChangeEmailForm;
