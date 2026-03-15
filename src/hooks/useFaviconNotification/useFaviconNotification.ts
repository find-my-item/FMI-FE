import { useEffect } from "react";

const iconSizes = ["16x16", "32x32", "48x48"];

/**
 * 알림 상태에 따라 파비콘을 동적으로 교체하는 커스텀 훅
 * @param hasNotification 알림이 존재하는지 여부
 */
export const useFaviconNotification = (hasNotification: boolean) => {
  useEffect(() => {
    const basePath = hasNotification ? "/favicon/notification" : "/favicon/default";

    iconSizes.forEach((size) => {
      const existingDynamicLink = document.querySelector(`link[data-dynamic-favicon="${size}"]`);
      const link = (existingDynamicLink || document.createElement("link")) as HTMLLinkElement;

      link.rel = "icon";
      link.type = "image/png";
      link.sizes = size;
      link.setAttribute("data-dynamic-favicon", size);

      link.href = `${basePath}/favicon-${size.split("x")[0]}.png`;

      if (!existingDynamicLink) {
        document.head.appendChild(link);
      }
    });
  }, [hasNotification]);
};

export default useFaviconNotification;
