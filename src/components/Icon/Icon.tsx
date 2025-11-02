"use client";

import type { SVGProps } from "react";
import * as Icons from "./index";

/**
 * @author jikwon
 *
 * SVG 아이콘 컴포넌트입니다.
 *
 * @param name - 사용할 아이콘의 이름 (`Icons` 객체의 key)
 * @param size - 아이콘의 크기(px). 기본값은 `24`입니다.
 * @param title - 접근성을 위한 아이콘 설명입니다.
 *   - `title`이 전달되면 `aria-label`이 설정됩니다.
 *   - 전달되지 않으면 `aria-hidden="true"`가 자동으로 추가됩니다.
 *
 * @example
 * ```tsx
 * <Icon name="Logo" size={40} title="로고 아이콘" />
 * <Icon name="Logo" size={40} />
 * ```
 */

export type IconName = keyof typeof Icons;

export type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export default function Icon({ name, size = 24, title, ...props }: Props) {
  const Svg = Icons[name];

  return (
    <Svg
      width={size}
      height={size}
      aria-label={title}
      aria-hidden={title ? false : true}
      fill="currentColor"
      stroke="currentColor"
      {...props}
    />
  );
}
