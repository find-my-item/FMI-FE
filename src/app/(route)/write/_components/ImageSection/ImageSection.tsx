import { Icon } from "@/components";
import { useRef } from "react";

const styles = {
  text: "text-caption1-regular text-flatGray-400",
};

const ImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      className="flex flex-col items-start justify-center gap-4 border-b border-flatGray-50 px-5 py-6"
      aria-label="이미지 업로드"
    >
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} />
      <div
        className="h-[104px] w-[104px] cursor-pointer rounded-[6px] bg-flatGray-25 flex-col-center"
        onClick={handleDivClick}
      >
        <Icon name="Camera" size={32} title="이미지 업로드" />
        <span className={styles.text}>(0/5)</span>
      </div>
      <span className={styles.text}>* 사진은 최대 5장 첨부가 가능합니다. (선택)</span>
    </section>
  );
};

export default ImageSection;
