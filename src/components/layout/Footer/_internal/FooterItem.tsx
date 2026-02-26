"use client";

import { cn } from "@/utils";
import { FOOTER_LINK, FooterLinkHref, FOOTER_ITEM_BASE_STYLE } from "./CONST_FOOTER";
import { Icon } from "@/components/common";
import LoginRequiredNotice from "./LoginRequiredNotice";
import Link from "next/link";
import { MouseEventHandler } from "react";

const CHAT_LINK_HREF = "/chat";

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

  const isChat = link.href === CHAT_LINK_HREF;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isChat) return;
    e.preventDefault();
    onClick();
  };

  return (
    <Link
      href={link.href}
      className={cn(FOOTER_ITEM_BASE_STYLE, isChat && "relative overflow-visible")}
      onClick={handleClick}
    >
      <Icon
        name={link.icon}
        size={28}
        className={cn(iconClassName, "group-hover:text-brand-normal-pressed")}
      />
      <span className={cn("py-[2px]", isActive(link.href))}>{link.name}</span>
      {isChat && showLoginRequiredNotice ? <LoginRequiredNotice /> : null}
    </Link>
  );
};

export default FooterItem;
