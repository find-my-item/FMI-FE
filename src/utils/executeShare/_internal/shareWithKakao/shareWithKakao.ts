"use client";

// TODO(지권): 카카오 공유하기 실제 데이터 변경 필요
// https://developers.kakao.com/docs/latest/ko/message-template/default#location-object

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

export const shareWithKakao = (data: MetaDataType) => {
  const Kakao = (window as any).Kakao;
  if (!Kakao) return;

  if (!Kakao.isInitialized?.()) {
    const ok = initKakao();
    if (!ok) return;
  }

  const sendDefault = Kakao.Share?.sendDefault;

  if (!sendDefault) return;

  sendDefault({
    objectType: "location",
    address: "경기 성남시 분당구 판교역로 166 3층",
    addressTitle: "분실 테스트",
    content: {
      title: data.title,
      description: data.summary,
      imageUrl: data.thumbnailUrl || "/test_list.JPG",
      link: {
        mobileWebUrl: "https://developers.kakao.com",
        webUrl: "https://developers.kakao.com",
      },
    },
    social: {
      likeCount: 10,
      commentCount: 45,
      viewCount: 32,
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
    ],
  });
};
