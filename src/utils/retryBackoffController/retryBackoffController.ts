type RetryFn = () => Promise<void> | void;

/**
 * 재시도 스케줄 옵션입니다.
 *
 * @author hyungjun
 * @description
 * - `immediate`: 지연 없이 즉시 실행할지 결정합니다.
 * - `resetAttempt`: attempt 카운터를 0으로 초기화한 뒤 스케줄합니다.
 */
interface RetryScheduleOptions {
  /**
   * 즉시 실행 여부.
   * true면 지연 없이 retryFn을 실행하도록 스케줄합니다.
   */
  immediate?: boolean;
  /**
   * 시도 횟수를 초기화한 뒤 스케줄합니다.
   * true면 attempt 카운터를 0으로 되돌립니다.
   */
  resetAttempt?: boolean;
}

/**
 * Exponential Backoff 계산에 필요한 옵션입니다.
 *
 * @author hyungjun
 * @description
 * - `baseDelayMs`: 최초 지연 시간(ms)입니다.
 * - `maxDelayMs`: 지연 시간 상한(ms)입니다.
 * - `jitterRatio`: 랜덤 지터 비율(예: 0.2 = +-20%)입니다.
 */
interface RetryBackoffControllerOptions {
  baseDelayMs: number;
  maxDelayMs: number;
  /**
   * 0.2면 +-20% 랜덤 지터를 적용합니다.
   */
  jitterRatio?: number;
}

const calcDelayMs = ({
  baseDelayMs,
  maxDelayMs,
  attempt,
  jitterRatio = 0,
}: {
  baseDelayMs: number;
  maxDelayMs: number;
  attempt: number;
  jitterRatio?: number;
}) => {
  const exponential = baseDelayMs * 2 ** attempt;
  const capped = Math.min(exponential, maxDelayMs);
  const jitter = capped * jitterRatio * (Math.random() * 2 - 1);

  return Math.max(0, Math.floor(capped + jitter));
};

/**
 * Exponential Backoff 기반 재시도 스케줄러(WS/SSE 공용)를 생성합니다.
 *
 * @author hyungjun
 * @description
 * - 동일한 실패 상황에서 재연결/재시도가 폭주하지 않도록 pending 타이머는 1개만 유지합니다.
 * - 실행 중(in-flight)에는 추가 스케줄을 무시합니다.
 * - `immediate` 옵션을 통해 지연 없이 즉시 실행할 수 있습니다.
 * - `resetAttempt`을 통해 attempt 카운터를 초기화할 수 있습니다.
 *
 * @param baseDelayMs 지연 시작 시간(ms)입니다.
 * @param maxDelayMs 지연 상한 시간(ms)입니다.
 * @param jitterRatio (선택) 랜덤 지터 비율(예: 0.2 = +-20%)입니다.
 * @returns `schedule`, `reset`, `cancel` 메서드를 포함한 컨트롤러 객체입니다.
 *
 * @example
 * ```ts
 * const controller = retryBackoffController({ baseDelayMs: 1000, maxDelayMs: 30000, jitterRatio: 0.2 });
 *
 * controller.schedule(async () => {
 *   // 재시도 로직
 * }, { immediate: true, resetAttempt: true });
 * ```
 */

export const retryBackoffController = ({
  baseDelayMs,
  maxDelayMs,
  jitterRatio = 0,
}: RetryBackoffControllerOptions) => {
  let attempt = 0;
  let pendingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let isExecuting = false;
  let isCancelled = false;

  const clearPending = () => {
    if (!pendingTimeoutId) return;
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  };

  const reset = () => {
    clearPending();
    attempt = 0;
    isCancelled = false;
  };

  const cancel = () => {
    clearPending();
    isCancelled = true;
  };

  const schedule = (retryFn: RetryFn, options: RetryScheduleOptions = {}) => {
    if (isCancelled) return;
    if (isExecuting) return;

    const { immediate = false, resetAttempt = false } = options;

    if (resetAttempt) {
      attempt = 0;
    }

    if (pendingTimeoutId && !immediate) return;
    clearPending();

    const nextAttempt = resetAttempt ? 0 : attempt + 1;
    attempt = nextAttempt;

    const delayMs = immediate
      ? 0
      : calcDelayMs({ baseDelayMs, maxDelayMs, attempt: nextAttempt, jitterRatio });

    pendingTimeoutId = setTimeout(() => {
      pendingTimeoutId = null;
      isExecuting = true;
      void Promise.resolve(retryFn()).finally(() => {
        isExecuting = false;
      });
    }, delayMs);
  };

  return { schedule, reset, cancel };
};
