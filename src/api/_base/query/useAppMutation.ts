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
//      string 또는 function 형태로 전달 가능
//      - string: 고정된 API endpoint (ex: "/posts")
//      - function: mutate 시 전달된 variables를 기반으로 동적으로 URL 생성
//                  (ex: ({ commentId }) => `/comments/${commentId}`)
// method: HTTP method
// option: 추가 useMutation option (ex: {onSuccess: (data)=> ...} (객체로 삽입))
// appMutationConfig:
//   - sendDeleteBody: DELETE 요청에 variables를 JSON body로 보낼 때 true.
//     Axios는 delete 본문을 `config.data`에 넣어야 하며, 기본값 false는 기존 동작 유지(URL·쿼리키만 있고 body 없는 delete).

type UseAppMutationConfig = {
  sendDeleteBody?: boolean;
};

const useAppMutation = <TVariables, TData = unknown, TError = unknown, TContext = unknown>(
  apiType: "auth" | "public",
  url: string | ((variables: TVariables) => string),
  method: "post" | "put" | "patch" | "delete",
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  appMutationConfig?: UseAppMutationConfig
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const axios = useAxios(apiType);

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const requestUrl = typeof url === "function" ? url(variables) : url;

      if (method === "delete") {
        if (appMutationConfig?.sendDeleteBody) {
          const { data } = await axios.delete<TData>(
            requestUrl,
            variables !== undefined && variables !== null ? { data: variables } : undefined
          );
          return data;
        }
        const { data } = await axios.delete<TData>(
          requestUrl,
          variables !== undefined && variables !== null ? (variables as never) : undefined
        );
        return data;
      }

      const { data } = await axios[method]<TData>(requestUrl, variables);
      return data;
    },
    retry: 0,
    ...options,
  });
};

export default useAppMutation;
