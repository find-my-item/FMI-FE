"use client";

import { FOOTER_LINK, FooterLinkHref, FooterItem } from "./_internal";
import { usePathname, useRouter } from "next/navigation";
import { useHiddenPath } from "@/hooks";
import { useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: FooterLinkHref) =>
    pathname === href ? "text-neutral-strong-focused" : "";
  const isHome = pathname === "/";
  const isHidden = useHiddenPath();
  const [showLoginRequiredNotice, setShowLoginRequiredNotice] = useState(false);

  if (isHidden) return null;

  const handleChatClick = () => {
    setShowLoginRequiredNotice(true);
    setTimeout(() => {
      setShowLoginRequiredNotice(false);
      router.push("/chat");
    }, 2500);
  };

  return (
    <div className={!isHome ? "pt-[86.67px]" : ""}>
      <footer className="fixed bottom-0 left-1/2 z-50 w-full max-w-[768px] -translate-x-1/2 overflow-visible border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
        <div className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
          {FOOTER_LINK.map((link) => (
            <FooterItem
              key={link.name}
              link={link}
              isActive={isActive}
              showLoginRequiredNotice={showLoginRequiredNotice}
              onClick={handleChatClick}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
