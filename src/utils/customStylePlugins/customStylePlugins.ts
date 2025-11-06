import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";

/**
 * flex-center
 */
export const flexCenter = plugin(function ({ addUtilities }) {
  const utilities: Record<string, CSSRuleObject> = {
    ".flex-center": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  addUtilities(utilities);
});

/**
 * flex-col-center
 */
export const flexColCenter = plugin(function ({ addUtilities }) {
  const utilities: Record<string, CSSRuleObject> = {
    ".flex-col-center": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  addUtilities(utilities);
});

/**
 * mouse-hover
 */
export const mouseHover = plugin(function ({ addUtilities }) {
  const utilities: Record<string, CSSRuleObject> = {
    ".mouse-hover": {
      transitionProperty: "colors",
      transitionDuration: "100ms",
    },
  };
  addUtilities(utilities);
});

/**
 * u-ellipsis
 */
export const uEllipsis = plugin(function ({ addUtilities }) {
  const utilities: Record<string, CSSRuleObject> = {
    ".u-ellipsis": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };
  addUtilities(utilities);
});

export const noScrollbar = plugin(function ({ addUtilities }) {
  const utilities: Record<string, CSSRuleObject> = {
    ".no-scrollbar": {
      overflowX: "auto",
      whiteSpace: "nowrap",

      "-ms-overflow-style": "none", // IE & Edge
      "scrollbar-width": "none", // Firefox

      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Opera
      },
    },
  };

  addUtilities(utilities);
});
