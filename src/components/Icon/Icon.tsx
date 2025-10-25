"use client";

import type { SVGProps } from "react";
import * as Icons from "./index";
import { cn } from "@/utils/cn";

export type IconName = keyof typeof Icons;

type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export default function Icon({ name, size = 24, title, className, ...props }: Props) {
  const Svg = Icons[name];
  return (
    <span className={cn("inline-block [&>svg]:block", className)}>
      <Svg
        width={size}
        height={size}
        aria-label={title}
        aria-hidden={title ? false : true}
        {...props}
        className="[&_*]:!stroke-current"
      />
    </span>
  );
}
