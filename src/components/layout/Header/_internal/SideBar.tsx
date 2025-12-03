import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ManualPopup from "@/app/(route)/manual/_components/ManualPopup/ManualPopup";
import { useState } from "react";
import { HEADER_LINK } from "../CONST_HEADER";
import { useModalBackdrop, useModalLockAndEsc } from "@/hooks";
import Icon from "@/components/common/Icon/Icon";

// TODO(지권): 추후 디자인 수정 필요

/**
 * @author jikwon
 *
 * header 컴포넌트의 사이드바 컴포넌트입니다.
 *
 * @param isOpen - 사이드바가 열려있는지 여부
 * @param onClose - 사이드바를 닫는 함수
 *
 * @example
 * ```tsx
 * <SideBar isOpen={isOpen} onClose={onClose} />
 * ```
 */
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
              {HEADER_LINK.map((link) => (
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
