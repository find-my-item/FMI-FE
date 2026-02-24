"use client";

import { cn } from "@/utils";
import { FOOTER_LINK, FooterLinkHref, FOOTER_ITEM_BASE_STYLE } from "./CONST_FOOTER";
import { Icon } from "@/components/common";
import LoginRequiredNotice from "./LoginRequiredNotice";
import Link from "next/link";

const CHAT_LINK_NAME = "채팅";

interface FooterItemProps {
  link: (typeof FOOTER_LINK)[number];
  isActive: (href: FooterLinkHref) => string | undefined;
  showLoginRequiredNotice: boolean;
  onClick: () => void;
}

const FooterItem = ({ link, isActive, showLoginRequiredNotice, onClick }: FooterItemProps) => {
  const iconClassName = isActive(link.href)
    ? "text-brand-normal-pressed"
    : "text-labelsVibrant-quaternary";

  const isChat = link.name === CHAT_LINK_NAME;

  if (isChat) {
    return (
      <div
        role="link"
        tabIndex={0}
        className={cn(FOOTER_ITEM_BASE_STYLE, "relative cursor-pointer overflow-visible")}
        onClick={onClick}
      >
        <Icon name={link.icon} size={28} className={iconClassName} />
        <span className={cn("py-[2px]", isActive(link.href))}>{link.name}</span>
        {showLoginRequiredNotice ? <LoginRequiredNotice /> : null}
      </div>
    );
  }

  return (
    <Link href={link.href} className={FOOTER_ITEM_BASE_STYLE}>
      <Icon name={link.icon} size={28} className={iconClassName} />
      <span className={cn("py-[2px]", isActive(link.href))}>{link.name}</span>
    </Link>
  );
};

export default FooterItem;
