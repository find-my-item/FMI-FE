"use client";

import { MetaDataType } from "@/types";

const getKakaoKey = () => {
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  if (!key) return null;
  return key;
};

const initKakao = () => {
  const key = getKakaoKey();
  if (!key) return false;

  const Kakao = (window as any).Kakao;
  if (!Kakao) return false;

  if (!Kakao.isInitialized?.()) {
    Kakao.init(key);
  }

  return true;
};

export const shareMessage = (data: MetaDataType) => {
  const Kakao = (window as any).Kakao;
  if (!Kakao) return;

  if (!Kakao.isInitialized?.()) {
    const ok = initKakao();
    if (!ok) return;
  }

  const sendDefault = Kakao.Share?.sendDefault;

  if (!sendDefault) return;

  sendDefault({
    objectType: "feed",
    content: {
      title: data.title,
      description: data.summary,
      imageUrl: data.thumbnailUrl,
      link: {
        mobileWebUrl: data.link,
        webUrl: data.link,
      },
    },
  });
};
