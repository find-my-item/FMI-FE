"use client";

import useAxios from "../axios/useAxios";
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

// 제네릭
// TVariables: mutate 호출 시 넣는 데이터 타입 (ex: {title: string; content: string})
// TData: 서버에서 반환하는 데이터 타입, 기본 unknown
// TError: 쿼리 요청 실패 시 에러 타입, 기본 unknown
// TContext: onMutate / onError / onSettled에서 사용할 context 타입
//           보통 mutate 전 상태나, mutation 성공 시 반환된 데이터 중
//           rollback이나 후속 처리에 필요할 수 있는 값의 타입을 넣음
//           예시: 이전 데이터 배열, 임시 ID, 서버 응답 데이터 등

// 파라미터
// apiType: 'auth' -> 토큰이 필요한 요청, 'public' -> 공개 API
// url: api 요청 엔드포인트
// method: HTTP method
// option: 추가 useMutation option (ex: {onSuccess: (data)=> ...} (객체로 삽입))

const useAppMutation = <TVariables, TData = unknown, TError = unknown, TContext = unknown>(
  apiType: "auth" | "public",
  url: string,
  method: "post" | "put" | "patch" | "delete",
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const axios = useAxios(apiType);

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const { data } = await axios[method]<TData>(url, variables);
      return data;
    },
    retry: 0,
    ...options,
  });
};

export default useAppMutation;
