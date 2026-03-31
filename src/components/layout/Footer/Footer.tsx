"use client";

import { FooterItem } from "./_internal";
import useFooterNav from "./_hooks/useFooterNav";

const Footer = ({ hasToken = false }: { hasToken?: boolean }) => {
  const { isHidden, items } = useFooterNav(hasToken);
  if (isHidden) return null;

  return (
    <footer className="sticky bottom-0 left-1/2 z-50 mx-auto w-full max-w-[768px] overflow-visible border-t-[1.2px] border-divider-default bg-white px-5 pb-[27px] pt-[14px]">
      <nav className="flex justify-between text-caption2-medium text-labelsVibrant-secondary">
        {items.map((item) => (
          <FooterItem key={item.key} item={item} />
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
