"use client";

import { cn } from "@/utils";
import { FOOTER_LINK, FooterLinkHref, FOOTER_ITEM_BASE_STYLE } from "./CONST_FOOTER";
import { Icon } from "@/components/common";
import LoginRequiredNotice from "./LoginRequiredNotice";
import Link from "next/link";
import { MouseEventHandler } from "react";

const CHAT_LINK_HREF = "/chat";
const ALERT_LINK_HREF = "/alert";

interface FooterItemProps {
  link: (typeof FOOTER_LINK)[number];
  isActive: (href: FooterLinkHref) => string | undefined;
  isLoggedIn: boolean;
  showLoginRequiredNotice: boolean;
  onClick: () => void;
}
// TODO(형준): 알림있을 경우 알림 아이콘에 초록점 표시
const FooterItem = ({
  link,
  isActive,
  isLoggedIn,
  showLoginRequiredNotice,
  onClick,
}: FooterItemProps) => {
  const iconClassName = isActive(link.href)
    ? "text-brand-normal-pressed"
    : "text-labelsVibrant-quaternary";

  const isChat = link.href === CHAT_LINK_HREF;
  const isAlert = link.href === ALERT_LINK_HREF;
  const needsLogin = isChat || isAlert;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!needsLogin) return;

    if (!isLoggedIn) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      href={link.href}
      className={cn(FOOTER_ITEM_BASE_STYLE, needsLogin && "relative overflow-visible")}
      onClick={handleClick}
    >
      <div className="relative">
        <Icon
          name={link.icon}
          size={28}
          className={cn(iconClassName, "group-hover:text-brand-normal-pressed")}
        />
        {"alert" in link && link.alert && <div className={cn("footer-alert-dot", link.alert)} />}
      </div>
      <span className={cn("py-[2px]", isActive(link.href))}>{link.name}</span>
      {needsLogin && !isLoggedIn && showLoginRequiredNotice ? <LoginRequiredNotice /> : null}
    </Link>
  );
};

export default FooterItem;
