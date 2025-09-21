import { useModalBackdrop, useModalLockAndEsc } from "@/utils/useOverlayHandlers";
import { AnimatePresence, motion } from "framer-motion";
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
  { name: "메뉴얼", href: "/manual" },
];

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  useModalLockAndEsc({ isOpen, onClose });
  const onBackdropMouseDown = useModalBackdrop({ onClose });

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="sidebar-overlay"
            className="fixed inset-0 bg-black/20 z-40"
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
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 flex flex-col"
            aria-label="메인 내비게이션"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl select-none"
              aria-label="사이드바 닫기"
            >
              {/* TODO(지권): 아이콘 변경 필요 */}
              &times;
            </button>
            <ul className="flex flex-col gap-4 mt-10">
              {HeaderLink.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mouse-hover hover:underline select-none"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
