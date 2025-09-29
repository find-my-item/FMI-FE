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
      <div className="w-full px-[20px] py-[26px] border-b border-[#E4E4E4]">
        <button
          aria-expanded={isOpen}
          aria-controls="매뉴얼 아이템 패널"
          onClick={() => setIsOpen((v) => !v)}
          className="flex w-full items-center justify-between"
        >
          <p className="font-semibold text-[16px] text-[#242424]">{title}</p>
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
            className="w-full bg-[#E4E4E4] overflow-hidden"
          >
            <div className="px-[20px] py-[38px] text-sm text-[#525252]">
              <p className="mb-[26px]">{content}</p>
              {href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-[30px] py-[14px] rounded-[4px] bg-[#525252] font-semibold text-[14px] text-white"
                >
                  {btnText}
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
