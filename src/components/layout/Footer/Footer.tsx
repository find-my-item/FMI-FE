"use client";

import { FooterItem } from "./_internal";
import { usePathname } from "next/navigation";
import { useHiddenPath } from "@/hooks";
import { useGetUsersMe } from "@/api/fetch/user";
import type { MouseEvent } from "react";
import useLoginNoticeTimer from "./_hooks/useLoginNoticeTimer";
import { FOOTER_LINK, FooterLinkHref } from "./_constants/CONST_FOOTER";

const Footer = () => {
  const isHidden = useHiddenPath();
  const pathname = usePathname();
  const isActive = (href: FooterLinkHref) =>
    pathname === href ? "text-neutral-strong-focused" : undefined;

  const { data: userData, isError } = useGetUsersMe();
  const isLoggedIn = !!userData && !isError;
  const isUserRole = userData?.result?.role ?? "USER";

  const { loginNoticeFor, setLoginNoticeFor } = useLoginNoticeTimer();

  if (isHidden) return null;

  const getTargetHref = (link: (typeof FOOTER_LINK)[number]): FooterLinkHref => {
    const isMypage = link.href === "/mypage";
    const canUseAdminHref =
      isMypage && isUserRole === "ADMIN" && "adminHref" in link && !!link.adminHref;
    return canUseAdminHref ? (link.adminHref as FooterLinkHref) : link.href;
  };

  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    link: (typeof FOOTER_LINK)[number]
  ) => {
    if (!link.requiresLogin) return;
    if (isLoggedIn) return;

    e.preventDefault();
    if (loginNoticeFor === link.href) return;
    setLoginNoticeFor(link.href);
  };

  return (
    <footer className="sticky bottom-0 left-1/2 z-50 mx-auto w-full max-w-[768px] overflow-visible border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
      <nav className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
        {FOOTER_LINK.map((link) => {
          const targetHref = getTargetHref(link);
          const isLoginRequiredDisabled = Boolean(link.requiresLogin) && !isLoggedIn;

          return (
            <FooterItem
              key={link.href}
              link={link}
              href={targetHref}
              isActive={isActive(targetHref)}
              isLoginRequiredDisabled={isLoginRequiredDisabled}
              showLoginRequiredNotice={isLoginRequiredDisabled && loginNoticeFor === link.href}
              onClick={(e) => handleItemClick(e, link)}
            />
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
