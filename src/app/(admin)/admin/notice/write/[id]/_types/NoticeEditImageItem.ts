export interface NoticeEditImageItem {
  /**
   * 수정 페이지에서는 기존 업로드된 이미지는 URL로만 존재합니다.
   * 새로 추가한 이미지만 File이 존재합니다.
   */
  file?: File;
  /**
   * 기존 이미지: 배포된 URL (https://...)
   * 신규 이미지: 미리보기 blob URL
   */
  previewUrl: string;
}
