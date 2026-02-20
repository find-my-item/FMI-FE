import { InputText } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { CHANGE_PASSWORD_CONFIG } from "../../_constants/CHANGE_PASSWORD_CONFIG";

const ChangePasswordForm = () => {
  return (
    <form className="flex h-dvh flex-col">
      <fieldset className="flex w-full flex-col gap-5 px-5 py-[30px]">
        <legend className="sr-only">비밀번호 변경 정보 입력</legend>
        {CHANGE_PASSWORD_CONFIG.map((item) => (
          <div key={item.inputOption.name} className="h-[92px]">
            <InputText {...item} />
          </div>
        ))}
      </fieldset>
      <FooterButton
        label="변경 완료"
        // TODO(수현): 기능 구현 브랜치로 disabled 제어 함수 추가 예정
        // disabled={ }
      />
    </form>
  );
};

export default ChangePasswordForm;
