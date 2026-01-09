export const TOAST_CONFIG = {
  success: { bg: "bg-[#46C691]", icon: "Success", size: 16 },
  error: { bg: "bg-[#FF4242]", icon: "Error", size: 20 },
  warning: { bg: "bg-[#FFC642]", icon: "Warning", size: 10 },
} as const;

export const TOAST_A11Y_CONFIG = {
  success: { role: "status", ariaLive: "polite" },
  error: { role: "alert", ariaLive: "assertive" },
  warning: { role: "status", ariaLive: "polite" },
} as const;
