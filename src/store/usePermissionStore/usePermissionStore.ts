import { create } from "zustand";

/**
 * @author suhyeon
 *
 * 초기 가입 및 권한 설정 프로세스의 상태를 관리하는 스토어입니다.
 *
 * @param isFirstSignUp - 사용자가 처음으로 회원가입을 완료한 상태인지 여부입니다.
 * - `true`인 경우, 서비스 초기 진입 시 권한 허용 안내(위치, 알림 등) 시트를 노출합니다.
 * - `false`인 경우, 일반적인 서비스 진입으로 간주합니다.
 * @param setFirstSignUp - `isFirstSignUp` 상태값을 변경하는 함수입니다.
 *
 * @example
 * ```tsx
 * const { isFirstSignUp, setFirstSignUp } = usePermissionStore();
 * * // 가입 완료 직후
 * setFirstSignUp(true);
 * ```
 */

interface PermissionState {
  isFirstSignUp: boolean;
  setFirstSignUp: (value: boolean) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  isFirstSignUp: false,
  setFirstSignUp: (value) => set({ isFirstSignUp: value }),
}));
