import { useRef } from "react";
import { Icon } from "@/components";

const ImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 border-b border-flatGray-50 px-5 py-6">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        ref={fileInputRef}
      />
      <button
        aria-label="이미지 업로드"
        onClick={handleImgUpload}
        className="h-[104px] w-[104px] cursor-pointer rounded-[6px] bg-flatGray-25 flex-col-center"
      >
        <Icon name="Camera" size={32} />
        <span className="text-caption1-regular text-flatGray-400">(0/5)</span>
      </button>
      <span className="text-caption1-regular text-neutral-normal-placeholder">
        최대 10MB, 총 5장의 이미지를 첨부할 수 있습니다. (jpg, jpeg, png)
      </span>
    </section>
  );
};

export default ImageSection;
