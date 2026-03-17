"use client";

import Image from "next/image";
import { useRef, type DragEvent } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "@/components/common";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/utils";
import { NoticeEditFormValues } from "../../../_types/NoticeEditFormValues";
import { NoticeEditImageItem } from "../../../_types/NoticeEditImageItem";

const DEFAULT_HELP_TEXT = "*사진은 최대 5장 첨부가 가능합니다. (선택)";
const MAX_IMAGES = 5;
const PREVIEW_SIZE_PX = 104;

const NoticeEditImageSection = ({ helpText = DEFAULT_HELP_TEXT }: { helpText?: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragFromIndexRef = useRef<number | null>(null);
  const { addToast } = useToast();

  const { control, getValues } = useFormContext<NoticeEditFormValues>();
  const { fields, append, remove, move } = useFieldArray({ control, name: "images" });

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;

    const fileArray = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const remainCount = MAX_IMAGES - fields.length;

    if (remainCount <= 0 || fileArray.length > remainCount) {
      addToast("이미지는 최대 5장만 첨부할 수 있어요", "warning");
      return;
    }

    fileArray.slice(0, remainCount).forEach((file) => {
      append({
        file,
        previewUrl: URL.createObjectURL(file),
      } satisfies NoticeEditImageItem);
    });
  };

  const handleRemove = (index: number) => {
    const current = getValues("images");
    const target = current?.[index];
    if (target?.file && target.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(target.previewUrl);
    }
    remove(index);
  };

  const reorderImages = (from: number, to: number) => {
    if (from === to) return;
    if (from < 0 || to < 0 || from >= fields.length || to >= fields.length) return;
    move(from, to);
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>, to: number) => {
    e.preventDefault();

    const from = dragFromIndexRef.current ?? Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;

    reorderImages(from, to);
    dragFromIndexRef.current = null;
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 border-b border-flatGray-50 px-5 py-6">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        multiple
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <div className="hide-scrollbar flex flex-nowrap items-center gap-4 overflow-x-scroll">
        <button
          type="button"
          aria-label="이미지 업로드"
          onClick={openImagePicker}
          className="size-[104px] shrink-0 rounded-[6px] bg-flatGray-25 flex-col-center"
        >
          <Icon name="Camera" size={32} className="text-neutralInversed-strong-default" />
          <span className="select-none text-caption1-regular text-flatGray-400">
            ({fields.length}/{MAX_IMAGES})
          </span>
        </button>

        <div role="list" aria-label="이미지 미리보기 목록" className="flex gap-2">
          {fields.map((image, index) => {
            const previewUrl = (image as unknown as NoticeEditImageItem).previewUrl;
            if (!previewUrl) return null;

            return (
              <div
                key={image.id}
                className={cn(
                  "relative shrink-0",
                  "cursor-grab active:cursor-grabbing",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                )}
                role="listitem"
                aria-label={`이미지 ${index + 1} 드래그로 순서 변경`}
                tabIndex={0}
                draggable
                onDragStart={(e) => {
                  dragFromIndexRef.current = index;
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(index));
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => handleImageDrop(e, index)}
                onDragEnd={() => {
                  dragFromIndexRef.current = null;
                }}
              >
                <Image
                  src={previewUrl}
                  alt=""
                  width={PREVIEW_SIZE_PX}
                  height={PREVIEW_SIZE_PX}
                  quality={100}
                  draggable={false}
                  className="size-[104px] select-none rounded-[10px] object-cover"
                />

                {index === 0 && (
                  <span
                    className={cn(
                      "absolute left-0 top-0 rounded-tl-[10px] pb-[3px] pl-[9px] pr-2 pt-[5px]",
                      "bg-flatGreen-500 text-caption1-semibold text-white"
                    )}
                  >
                    대표
                  </span>
                )}

                <button
                  type="button"
                  aria-label="이미지 삭제"
                  onClick={() => handleRemove(index)}
                  className="absolute right-1.5 top-1.5 rounded-full border border-divider-default bg-[#5D5D5D] p-[5px]"
                >
                  <Icon name="Delete" size={10} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-caption1-regular text-neutral-normal-placeholder">{helpText}</span>
    </section>
  );
};

export default NoticeEditImageSection;
