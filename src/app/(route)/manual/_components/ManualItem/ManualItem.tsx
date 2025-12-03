"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Icon } from "@/components";
import { cn } from "@/utils";

type Item = {
  title: string;
  content: ReactNode;
  href?: string;
  btnText?: string;
};

interface ManualItemProps {
  item: Item;
  isOpen?: boolean;
  onToggle?: () => void;
}

const ManualItem = ({ item, isOpen, onToggle }: ManualItemProps) => {
  const { title, content, href, btnText } = item;

  return (
    <>
      <div
        aria-expanded={isOpen}
        aria-controls="매뉴얼 아이템 패널"
        onClick={onToggle}
        className="w-full cursor-pointer border-b border-neutral-normal-default px-[20px] py-[26px]"
      >
        <Button
          variant="outlined"
          ignoreBase
          className="flex w-full items-center justify-between border-none"
        >
          <p className="text-body1-semibold text-neutral-normal-default">{title}</p>
          <span className={cn("transition-transform duration-200", isOpen && "rotate-180")}>
            <Icon name="ArrowDown" />
          </span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden bg-fill-neutral-strong-default"
          >
            <div className="flex flex-col items-start justify-center px-[20px] py-[24px] text-body2-regular text-layout-body-default">
              <p className="mb-[26px]">{content}</p>
              {href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-[6px] rounded-[10px] border border-neutral-normal-default bg-white py-[10px] text-center text-body2-semibold text-neutral-normal-default"
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
