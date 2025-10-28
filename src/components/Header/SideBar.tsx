import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Icon from "../Icon/Icon";
import ManualPopup from "@/app/(route)/manual/_components/ManualPopup/ManualPopup";
import { useState } from "react";

const HeaderLink = [
  { name: "리스트", href: "/list" },
  { name: "글쓰기", href: "/write" },
  { name: "로그인", href: "/login" },
  { name: "회원가입", href: "/sign-up" },
  { name: "프로필", href: "/profile" },
  { name: "공지사항", href: "/notice?tab=notice" },
  { name: "FAQ", href: "/faq" },
  { name: "채팅", href: "/chat" },
  { name: "매뉴얼", href: "/manual" },
];

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });
  const [manualPopup, setManualPopup] = useState(false);

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="sidebar-overlay"
            className="fixed inset-0 z-40 bg-black/20"
            onMouseDown={onBackdropMouseDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-hidden="true"
          />
          <motion.aside
            key="sidebar-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col bg-white p-6 shadow-lg"
            aria-label="메인 내비게이션"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 select-none text-2xl text-gray-600 hover:text-gray-900"
              aria-label="사이드바 닫기"
            >
              <Icon name="XSecond" />
            </button>
            <ul className="mt-10 flex flex-col gap-4">
              {HeaderLink.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="select-none mouse-hover hover:underline"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setManualPopup(true)}
                  className="mt-4 rounded-[12px] bg-[#04AD69] px-[16px] py-[12px] text-[16px] text-white"
                >
                  매뉴얼 보기 버튼
                </button>
                <ManualPopup isOpen={manualPopup} onClose={() => setManualPopup(false)} />
              </li>
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
