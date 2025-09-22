"use client";

import { useHiddenPath } from "@/hooks/useHiddenPath";
import Link from "next/link";

const FooterLink = [
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = () => {
  const isHidden = useHiddenPath();
  if (isHidden) return null;

  return (
    <footer className="sticky bottom-0 w-full bg-gray-300 text-black py-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <nav className="flex gap-6 text-sm" aria-label="하단 네비게이션">
          {FooterLink.map((link) => (
            <Link key={link.name} href={link.href} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FMI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
