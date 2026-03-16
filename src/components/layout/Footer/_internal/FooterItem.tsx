"use client";

import { cn } from "@/utils";
import { FOOTER_LINK, FooterLinkHref, FOOTER_ITEM_BASE_STYLE } from "./CONST_FOOTER";
import { Icon } from "@/components/common";
import LoginRequiredNotice from "./LoginRequiredNotice";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { UserType } from "@/types";

interface FooterItemProps {
  link: (typeof FOOTER_LINK)[number];
  isActive: (href: FooterLinkHref) => string | undefined;
  isLoggedIn: boolean;
  showLoginRequiredNotice: boolean;
  onClick: () => void;
  isUserRole: UserType;
}
// TODO(형준): 알림있을 경우 알림 아이콘에 초록점 표시
const FooterItem = ({
  link,
  isActive,
  isLoggedIn,
  showLoginRequiredNotice,
  onClick,
  isUserRole,
}: FooterItemProps) => {
  const iconClassName = isActive(link.href)
    ? "text-brand-normal-pressed"
    : "text-labelsVibrant-quaternary";

  const isChat = link.href === "/chat";
  const isAlert = link.href === "/alert";
  const isMypage = link.href === "/mypage";
  const needsLogin = isChat || isAlert;

  const targetHref: FooterLinkHref =
    isMypage && isUserRole === "ADMIN" && "adminHref"
      ? (link.adminHref as FooterLinkHref)
      : link.href;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!needsLogin) return;
    if (!isLoggedIn) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      href={targetHref}
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
      <span className={cn("py-[2px]", isActive(targetHref))}>{link.name}</span>
      {needsLogin && !isLoggedIn && showLoginRequiredNotice ? <LoginRequiredNotice /> : null}
    </Link>
  );
};

export default FooterItem;
