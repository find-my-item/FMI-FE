"use client";

import { FOOTER_LINK, FooterLinkHref, FooterItem } from "./_internal";
import { usePathname, useRouter } from "next/navigation";
import { useHiddenPath } from "@/hooks";
import { useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: FooterLinkHref) =>
    pathname === href ? "text-neutral-strong-focused" : undefined;
  const isHidden = useHiddenPath();
  const [showLoginRequiredNotice, setShowLoginRequiredNotice] = useState(false);

  if (isHidden) return null;

  return (
    <footer className="sticky bottom-0 left-1/2 z-50 mx-auto w-full max-w-[768px] overflow-visible border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
      <nav className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
        {FOOTER_LINK.map((link) => (
          <FooterItem
            key={link.href}
            link={link}
            isActive={isActive}
            showLoginRequiredNotice={showLoginRequiredNotice}
            onClick={() => router.push(link.href)}
          />
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
