import { useEffect } from "react";

/**
 * 알림 상태에 따라 파비콘을 동적으로 교체하는 커스텀 훅
 * @param hasNotification 알림이 존재하는지 여부
 */
export const useFaviconNotification = (hasNotification: boolean) => {
  useEffect(() => {
    const links = document.querySelectorAll("link[rel*='icon']");
    const basePath = hasNotification ? "/favicon/notification" : "/favicon/default";

    links.forEach((link) => {
      const size = link.getAttribute("sizes");

      if (size === "16x16") {
        link.setAttribute("href", `${basePath}/favicon-16.png`);
      } else if (size === "32x32") {
        link.setAttribute("href", `${basePath}/favicon-32.png`);
      } else if (size === "48x48") {
        link.setAttribute("href", `${basePath}/favicon-48.png`);
      } else if (!size) {
        link.setAttribute("href", `${basePath}/favicon-32.png`);
      }
    });
  }, [hasNotification]);
};

export default useFaviconNotification;
