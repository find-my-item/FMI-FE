"use client";

import type { SVGProps } from "react";
import * as Icons from "./index";

export type IconName = keyof typeof Icons;

export type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export default function Icon({ name, size = 24, title, ...props }: Props) {
  const Svg = Icons[name];
  return <Svg width={size} height={size} aria-label={title} {...props} />;
}
