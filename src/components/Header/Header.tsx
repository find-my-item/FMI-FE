import React from "react";
import Link from "next/link";

const HeaderLink = [
  { name: "리스트", href: "/list" },
  { name: "글쓰기", href: "/write" },
  { name: "로그인", href: "/login" },
  { name: "회원가입", href: "/signUp" },
  { name: "프로필", href: "/profile" },
  { name: "공지사항", href: "/notice" },
  { name: "FAQ", href: "/faq" },
  { name: "채팅", href: "/chat" },
];

const Header = () => {
  return (
    <header className="sticky top-0 w-full h-16 bg-gray-300 flex justify-between items-center p-4">
      <Link href="/" aria-label="홈으로 이동">
        Logo
      </Link>
      <nav aria-label="메인 내비게이션">
        <ul className="flex gap-4">
          {HeaderLink.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="mouse-hover hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
