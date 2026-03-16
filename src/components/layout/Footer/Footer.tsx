"use client";

import { FOOTER_LINK, FooterLinkHref, FooterItem, useLoginNoticeTimer } from "./_internal";
import { usePathname, useRouter } from "next/navigation";
import { useHiddenPath } from "@/hooks";
import { useGetUsersMe } from "@/api/fetch/user";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: FooterLinkHref) =>
    pathname === href ? "text-neutral-strong-focused" : undefined;
  const isHidden = useHiddenPath();
  const { data: userData, isError } = useGetUsersMe();
  const isLoggedIn = !!userData && !isError;
  const { loginNoticeFor, setLoginNoticeFor } = useLoginNoticeTimer();

  if (isHidden) return null;

  const handleClick = (href: FooterLinkHref) => {
    const needsLogin = href === "/chat" || href === "/alert";
    if (!isLoggedIn && needsLogin) {
      if (loginNoticeFor === href) return;
      setLoginNoticeFor(href);
      return;
    }
    router.push(href);
  };

  return (
    <footer className="sticky bottom-0 left-1/2 z-50 mx-auto w-full max-w-[768px] overflow-visible border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
      <nav className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
        {FOOTER_LINK.map((link) => (
          <FooterItem
            key={link.href}
            link={link}
            isActive={isActive}
            isLoggedIn={isLoggedIn}
            showLoginRequiredNotice={loginNoticeFor === link.href}
            onClick={() => handleClick(link.href)}
          />
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
