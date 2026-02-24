"use client";

import { PostMetaDataItemWithLink } from "@/types";

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

export const shareWithKakao = (data: PostMetaDataItemWithLink) => {
  console.log(data);
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
    address: data.address,
    addressTitle: data.title,
    content: {
      title: data.title,
      description: data.summary,
      imageUrl: data.thumbnailUrl,
      link: {
        mobileWebUrl: data.link,
        webUrl: data.link,
      },
    },
    social: {
      likeCount: data.likeCount,
      commentCount: data.commentCount,
      viewCount: data.viewCount,
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: data.link,
          webUrl: data.link,
        },
      },
    ],
  });
};
