"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { useToast } from "@/context/ToastContext";

/**
 * ErrorBoundary 컴포넌트의 props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  /**
   * 에러 발생 시 표시할 fallback UI (Suspense fallback과 동일한 역할)
   * - ReactNode 또는 (error, reset) => ReactNode 함수 형태
   * - 미제공 시 null 렌더링 (showToast와 함께 사용 시 토스트만 표시 가능)
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /**
   * 에러 발생 시 토스트 알림 표시 여부
   * @default false
   */
  showToast?: boolean;
  /**
   * showToast가 true일 때 토스트에 표시할 메시지
   * @default "잠시 후 다시 시도해 주세요."
   */
  toastMessage?: string;
  /**
   * 에러 발생 시 호출되는 콜백
   * - Sentry 로깅, 리포팅, 분석 등에 활용
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * ErrorBoundary 내부 상태
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * 에러 경계(Error Boundary) 핵심 로직 - 클래스 컴포넌트
 *
 * @internal
 */
class ErrorBoundaryCore extends Component<
  Pick<ErrorBoundaryProps, "children" | "fallback" | "onError">,
  ErrorBoundaryState
> {
  constructor(props: Pick<ErrorBoundaryProps, "children" | "fallback" | "onError">) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (fallback !== undefined) {
        return typeof fallback === "function" ? fallback(error, this.reset) : fallback;
      }
      return null;
    }
    return children;
  }
}

/**
 * 에러 경계(Error Boundary)
 *
 * @description
 * 하위 컴포넌트 트리의 JavaScript 에러를 포착하여 fallback UI를 표시합니다.
 * 렌더링 중 발생한 에러만 포착하며, try/catch와 유사한 선언적 동작을 제공합니다.
 *
 * fallback UI와 토스트 알림 중 사용할 방식을 선택할 수 있습니다.
 *
 * @remarks
 * **포착하지 않는 에러:**
 * - 이벤트 핸들러 내부 에러 (try/catch 사용 권장)
 * - 비동기 코드 (setTimeout, requestAnimationFrame 콜백 등)
 * - 서버 사이드 렌더링 에러
 * - 에러 경계 자체에서 발생한 에러
 *
 * **TanStack Query 패칭 에러 포착:**
 * useQuery는 기본적으로 에러를 throw하지 않아 Error Boundary가 포착하지 못합니다.
 * 패칭 에러를 포착하려면 다음 두 가지를 적용하세요.
 * 1. 쿼리 훅에 `throwOnError: true` 옵션 추가
 * 2. 해당 훅을 사용하는 컴포넌트를 Error Boundary로 감싸기
 *
 * 패칭 실패 시 쿼리가 error 상태가 되고, 다음 렌더에서 useQuery가 에러를 throw하여
 * Error Boundary가 포착합니다.
 *
 * @see {@link https://ko.legacy.reactjs.org/docs/error-boundaries.html React Error Boundaries}
 *
 * @example fallback만 사용
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>문제가 발생했습니다.</p>
 *       <button onClick={reset}>다시 시도</button>
 *     </div>
 *   )}
 *   onError={(error) => Sentry.captureException(error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example 토스트만 사용
 * ```tsx
 * <ErrorBoundary showToast toastMessage="오류가 발생했습니다.">
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example fallback + 토스트 함께 사용
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => <ErrorFallback error={error} onRetry={reset} />}
 *   showToast
 *   toastMessage="목록을 불러오는 중 오류가 발생했습니다."
 *   onError={(error) => Sentry.captureException(error)}
 * >
 *   <Suspense fallback={<LoadingSpinner />}>
 *     <PostList />  // useGetPosts({ throwOnError: true }) 사용
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 *
 * @example TanStack Query 연동
 * ```tsx
 * // 1. 쿼리 훅에 throwOnError 추가
 * // useGetPosts.ts
 * return useAppQuery(..., { throwOnError: true });
 *
 * // 2. 해당 훅을 사용하는 컴포넌트를 Error Boundary로 감싸기
 * <ErrorBoundary fallback={(error, reset) => <ErrorFallback error={error} onRetry={reset} />}>
 *   <PostList />  // useGetPosts 사용
 * </ErrorBoundary>
 * ```
 */
export const ErrorBoundary = ({
  children,
  fallback,
  showToast = false,
  toastMessage = "잠시 후 다시 시도해 주세요.",
  onError,
}: ErrorBoundaryProps) => {
  const { addToast } = useToast();

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    if (showToast) {
      addToast(toastMessage, "error");
    }
    onError?.(error, errorInfo);
  };

  return (
    <ErrorBoundaryCore fallback={fallback} onError={handleError}>
      {children}
    </ErrorBoundaryCore>
  );
};
