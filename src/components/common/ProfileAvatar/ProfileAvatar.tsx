"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";

/**
 * @author jikwon
 *
 * @description
 * 유저 프로필 이미지에 사용되는 컴포넌트입니다.
 * 깨진 이미지 URL 또는 값이 없는 경우 기본 프로필 이미지로 대체됩니다.
 *
 * @param src - 프로필 이미지 URL
 * @param alt - 프로필 이미지 대체 텍스트(유저 닉네임 권장)
 * @param size - 프로필 이미지 크기(px)
 * @param className - 추가 클래스명
 * @param priority - LCP 대상 여부 (헤더 등 주요 위치에서만 사용)
 */
interface ProfileAvatarProps {
  src?: string | null;
  alt?: string;
  size: number;
  className?: string;
  priority?: boolean;
}

const FALLBACK_SRC = "/user/default-profile.svg";

const ProfileAvatar = ({
  src,
  alt = "사용자",
  size,
  className,
  priority = false,
}: ProfileAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src?.trim() ? src : FALLBACK_SRC);

  useEffect(() => {
    setImgSrc(src?.trim() ? src : FALLBACK_SRC);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={`${alt} 프로필`}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      draggable={false}
      className={cn(
        "pointer-events-none select-none rounded-full object-cover",
        `w-[${size}px] h-[${size}px]`,
        className
      )}
      onError={() => {
        if (imgSrc !== FALLBACK_SRC) setImgSrc(FALLBACK_SRC);
      }}
    />
  );
};

export default ProfileAvatar;
