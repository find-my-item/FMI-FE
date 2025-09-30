"use client";

import Icon from "@/components/Icon/Icon";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ManualItemProps {
  title: string;
  content: React.ReactNode;
  href?: string;
  btnText?: string;
}

const ManualItem = ({ title, content, href, btnText }: ManualItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        aria-expanded={isOpen}
        aria-controls="매뉴얼 아이템 패널"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full cursor-pointer border-b border-[#E4E4E4] px-[20px] py-[26px]"
      >
        <button className="flex w-full items-center justify-between">
          <p className="text-[16px] font-semibold text-[#242424]">{title}</p>
          <span className={cn("transition-transform duration-200", isOpen && "rotate-180")}>
            <Icon name="ArrowDown" />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden bg-[#E4E4E4]"
          >
            <div className="flex flex-col items-start justify-center px-[20px] py-[38px] text-sm text-[#525252]">
              <p className="mb-[26px]">{content}</p>
              {href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-[4px] border border-[#DADADA] bg-white px-[30px] py-[14px] text-center text-[14px] font-semibold text-black"
                >
                  {btnText}
                  <Icon name="ArrowRightSmall" size={20} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ManualItem;
