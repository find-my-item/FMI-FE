/**
 * 이미지를 리사이즈하고 압축하는 함수
 * @param file 원본 이미지 파일
 * @param maxWidth 최대 너비 (기본값: 1280)
 * @param maxHeight 최대 높이 (기본값: 1280)
 * @param maxFileSize 최대 파일 크기 (바이트, 기본값: 300KB)
 * @param initialQuality 초기 압축 품질 (0.1 ~ 1.0, 기본값: 0.7)
 * @returns 리사이즈된 이미지 File 객체
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 1280,
  maxHeight: number = 1280,
  maxFileSize: number = 300 * 1024,
  initialQuality: number = 0.7
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // 비율을 유지하면서 리사이즈
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context를 가져올 수 없습니다."));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // 모든 이미지를 JPEG로 변환하여 압축 (PNG는 quality 파라미터가 작동하지 않음)
        const outputType = "image/jpeg";
        const outputFileName = file.name.replace(/\.[^/.]+$/, ".jpg");

        // 파일 크기가 제한 이하가 될 때까지 품질을 낮춰가며 압축
        const compress = (quality: number, currentWidth: number, currentHeight: number): void => {
          // 해상도를 더 낮춰야 하는 경우
          if (quality <= 0.1 && currentWidth > 800 && currentHeight > 800) {
            const newWidth = Math.floor(currentWidth * 0.8);
            const newHeight = Math.floor(currentHeight * 0.8);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            compress(0.7, newWidth, newHeight);
            return;
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("이미지 압축에 실패했습니다."));
                return;
              }

              // 파일 크기가 제한 이하이거나 품질이 너무 낮으면 완료
              if (blob.size <= maxFileSize || quality <= 0.1) {
                const resizedFile = new File([blob], outputFileName, {
                  type: outputType,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                // 품질을 0.1씩 낮춰서 다시 압축
                compress(Math.max(0.1, quality - 0.1), currentWidth, currentHeight);
              }
            },
            outputType,
            quality
          );
        };

        compress(initialQuality, width, height);
      };
      img.onerror = () => {
        reject(new Error("이미지를 로드할 수 없습니다."));
      };
    };
    reader.onerror = () => {
      reject(new Error("파일을 읽을 수 없습니다."));
    };
  });
};
