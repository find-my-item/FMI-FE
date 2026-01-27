"use client";

import { useEffect } from "react";

const MSWProvider = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;

    const start = async () => {
      const { worker } = await import("../mock/browser");
      await worker.start({
        onUnhandledRequest: "bypass",
      });
    };

    start();
  }, []);

  return null;
};

export default MSWProvider;
