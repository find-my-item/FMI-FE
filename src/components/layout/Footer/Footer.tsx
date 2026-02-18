"use client";

import Link from "next/link";
import { FOOTER_LINK, FooterLinkHref } from "./CONST_FOOTER";
import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useHiddenPath } from "@/hooks";

const Footer = () => {
  const pathname = usePathname();
  const isActive = (href: FooterLinkHref) => pathname === href && "text-neutral-strong-focused";
  const isHidden = useHiddenPath();

  if (isHidden) return null;

  return (
    <footer className="fixed bottom-0 left-1/2 z-10 w-full max-w-[390px] -translate-x-1/2 border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
      <div className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
        {FOOTER_LINK.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "w-[60px] transition-colors flex-col-center",
              "hover:text-neutral-strong-focused"
            )}
          >
            <span>
              <Icon name={link.icon as IconName} size={28} />
            </span>
            <span className={cn("py-[2px]", isActive(link.href))}>{link.name}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
