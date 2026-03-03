"use client";

import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "@/components/common";
import ImagePreviewList from "./_internal/ImagePreviewList";
import { useToast } from "@/context/ToastContext";
import { PostWriteFormValues } from "@/app/(route)/write/post/_types/PostWriteType";

const DEFAULT_HELP_TEXT = "최대 10MB, 총 5장의 이미지를 첨부할 수 있습니다. (jpg, jpeg, png)";

/**
 * @author hyungjun
 *
 * @description
 * 게시글 작성 시 이미지 업로드 섹션입니다.
 * react-hook-form의 field array(images)와 연동하며, 최대 5장까지 첨부할 수 있습니다.
 * 미리보기 목록에서 삭제·순서 변경이 가능합니다.
 *
 * @param helpText - 이미지 업로드 안내 문구. 미전달 시 기본 안내 문구가 사용됩니다.
 *
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <WriteImageSection />
 *   <WriteImageSection helpText="커스텀 안내 문구" />
 * </FormProvider>
 * ```
 */
const WriteImageSection = ({ helpText = DEFAULT_HELP_TEXT }: { helpText?: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const { control } = useFormContext<PostWriteFormValues>();

  const { fields, append, remove, move } = useFieldArray({ control, name: "images" });

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;

    const fileArray = Array.from(files).filter((file) => file.type.startsWith("image/"));

    const remainCount = 5 - fields.length;

    if (remainCount <= 0 || fileArray.length > remainCount) {
      addToast("이미지는 최대 5장만 첨부할 수 있어요.", "warning");
      return;
    }

    fileArray.slice(0, remainCount).forEach((file) => {
      append({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });
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
            ({fields.length}/5)
          </span>
        </button>
        <ImagePreviewList images={fields} onRemove={remove} onMove={move} />
      </div>
      <span className="text-caption1-regular text-neutral-normal-placeholder">{helpText}</span>
    </section>
  );
};

export default WriteImageSection;
