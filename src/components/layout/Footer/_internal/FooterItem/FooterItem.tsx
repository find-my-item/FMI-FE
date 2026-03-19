"use client";

import { cn } from "@/utils";
import { FOOTER_ITEM_BASE_STYLE } from "../../_constants/CONST_FOOTER";
import { Icon } from "@/components/common";
import LoginRequiredNotice from "../LoginRequiredNotice/LoginRequiredNotice";
import Link from "next/link";
import type useFooterNav from "../../_hooks/useFooterNav";

interface FooterItemProps {
  item: ReturnType<typeof useFooterNav>["items"][number];
}

// TODO(형준): 알림있을 경우 알림 아이콘에 초록점 표시
const FooterItem = ({ item }: FooterItemProps) => {
  const { link, href, isActive, isLoginRequiredDisabled, showLoginRequiredNotice, onClick } = item;
  const iconClassName = isActive ? "text-brand-normal-pressed" : "text-labelsVibrant-quaternary";

  return (
    <Link
      href={href}
      aria-disabled={isLoginRequiredDisabled}
      className={cn(
        FOOTER_ITEM_BASE_STYLE,
        !isLoginRequiredDisabled && "hover:text-neutral-strong-focused",
        link.requiresLogin && "relative overflow-visible"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Icon
          name={link.icon}
          size={28}
          className={cn(
            iconClassName,
            !isLoginRequiredDisabled && "group-hover:text-brand-normal-pressed"
          )}
        />
        {"alert" in link && link.alert && <div className={cn("footer-alert-dot", link.alert)} />}
      </div>
      <span className={cn("py-[2px]", isActive)}>{link.name}</span>
      {isLoginRequiredDisabled && showLoginRequiredNotice ? <LoginRequiredNotice /> : null}
    </Link>
  );
};

export default FooterItem;
