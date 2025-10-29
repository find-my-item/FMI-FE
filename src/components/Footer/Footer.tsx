"use client";

import { useHiddenPath } from "@/hooks/useHiddenPath";
import Link from "next/link";
import { FOOTER_LINK } from "./CONST_FOOTER";

/**
 * @author jikwon
 *
 * 하단 footer 컴포넌트입니다.
 *
 * useHiddenPath 훅을 사용하여 / 메인 페이지에만 footer를 표시합니다.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

const Footer = () => {
  const isHidden = useHiddenPath();
  if (isHidden) return null;

  return (
    <footer className="sticky bottom-0 w-full bg-gray-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4">
        <nav className="flex gap-6 text-sm" aria-label="하단 네비게이션">
          {FOOTER_LINK.map((link) => (
            <Link key={link.name} href={link.href} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FMI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
