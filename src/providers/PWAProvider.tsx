"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// TODO(지권): 배포 후 모바일 테스트 필요

interface PWAContextType {
  canInstall: boolean;
  showPrompt: boolean;
  installApp: () => Promise<void>;
  incrementViewCount: () => void;
  closePrompt: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

const PWA_INFO_KEY = "fi-pwa-info";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

interface PWAInfo {
  viewCount: number;
  hasShown: boolean;
  startDate: number;
}

const getPWAInfo = (): PWAInfo => {
  const stored = localStorage.getItem(PWA_INFO_KEY);
  if (!stored) return { viewCount: 0, hasShown: false, startDate: Date.now() };
  try {
    return JSON.parse(stored);
  } catch {
    return { viewCount: 0, hasShown: false, startDate: Date.now() };
  }
};

const setPWAInfo = (info: PWAInfo) => {
  localStorage.setItem(PWA_INFO_KEY, JSON.stringify(info));
};

export const PWAProvider = ({ children }: { children: ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. 구버전 키 삭제 및 만료 체크
    localStorage.removeItem("pwa-post-view-count");
    localStorage.removeItem("pwa-prompt-shown");
    localStorage.removeItem("pwa-storage-date");

    const info = getPWAInfo();
    const now = Date.now();

    if (now - info.startDate > ONE_MONTH_MS) {
      setPWAInfo({ viewCount: 0, hasShown: false, startDate: now });
    }

    // 2. PWA 설치 이벤트 핸들러
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const { viewCount, hasShown } = getPWAInfo();
    if (!hasShown && viewCount >= 5 && deferredPrompt) {
      setShowPrompt(true);
    }
  }, [deferredPrompt]);

  // 상세 페이지 조회 횟수를 증가시키고 5회 도달 시 팝업을 활성화합니다.
  const incrementViewCount = () => {
    const info = getPWAInfo();
    if (info.hasShown || info.viewCount >= 5) return;

    const newCount = info.viewCount + 1;
    setPWAInfo({ ...info, viewCount: newCount });

    if (newCount >= 5) {
      setShowPrompt(true);
    }
  };

  // PWA 설치 프롬프트를 실행하고 사용자의 선택 결과를 스토리지에 기록합니다.
  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      const info = getPWAInfo();
      setPWAInfo({ ...info, hasShown: true });
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  // 팝업을 닫고 다시 보지 않도록 설정합니다.
  const closePrompt = () => {
    const info = getPWAInfo();
    setPWAInfo({ ...info, hasShown: true });
    setShowPrompt(false);
  };

  return (
    <PWAContext.Provider
      value={{
        canInstall: !!deferredPrompt,
        showPrompt,
        installApp,
        incrementViewCount,
        closePrompt,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};

// PWA 관련 상태 및 함수를 사용하기 위한 커스텀 훅입니다.
export const usePWA = () => {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
};
