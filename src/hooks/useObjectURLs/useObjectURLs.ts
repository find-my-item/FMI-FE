import { useEffect, useState } from "react";

const useObjectURLs = (images: File[]) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!images || images.length === 0) {
      setUrls([]);
      return;
    }

    const newUrls = images.map((file) => URL.createObjectURL(file));
    setUrls(newUrls);

    return () => {
      const toRevoke = [...newUrls];
      setTimeout(() => toRevoke.forEach((url) => URL.revokeObjectURL(url)), 0);
    };
  }, [images]);

  return urls;
};

export default useObjectURLs;
