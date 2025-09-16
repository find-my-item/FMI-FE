/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      dimension: {
        scale: "2px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "32px",
        xl: "64px"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        lg: "32px",
        md: {
          value: "16px",
          type: "spacing"
        },
        xl: "64px",
        multiValue: "8px 64px"
      },
      borderRadius: {
        sm: "4px",
        lg: "8px",
        xl: "16px",
        multiValue: "4px 8px"
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c"
        },
        red: {
          100: "#fff5f5",
          200: "#fed7d7",
          300: "#feb2b2",
          400: "#fc8181",
          500: "#f56565",
          600: "#e53e3e",
          700: "#c53030",
          800: "#9b2c2c",
          900: "#742a2a"
        },
        orange: {
          100: "#fffaf0",
          200: "#feebc8",
          300: "#fbd38d",
          400: "#f6ad55",
          500: "#ed8936",
          600: "#dd6b20",
          700: "#c05621",
          800: "#9c4221",
          900: "#7b341e"
        },
        yellow: {
          100: "#fffff0",
          200: "#fefcbf",
          300: "#faf089",
          400: "#f6e05e",
          500: "#ecc94b",
          600: "#d69e2e",
          700: "#b7791f",
          800: "#975a16",
          900: "#744210"
        },
        green: {
          100: "#f0fff4",
          200: "#c6f6d5",
          300: "#9ae6b4",
          400: "#68d391",
          500: "#48bb78",
          600: "#38a169",
          700: "#2f855a",
          800: "#276749",
          900: "#22543d"
        },
        teal: {
          100: "#e6fffa",
          200: "#b2f5ea",
          300: "#81e6d9",
          400: "#4fd1c5",
          500: "#38b2ac",
          600: "#319795",
          700: "#2c7a7b",
          800: "#285e61",
          900: "#234e52"
        },
        blue: {
          100: "#ebf8ff",
          200: "#bee3f8",
          300: "#90cdf4",
          400: "#63b3ed",
          500: "#4299e1",
          600: "#3182ce",
          700: "#2b6cb0",
          800: "#2c5282",
          900: "#2a4365"
        },
        indigo: {
          100: "#ebf4ff",
          200: "#c3dafe",
          300: "#a3bffa",
          400: "#7f9cf5",
          500: "#667eea",
          600: "#5a67d8",
          700: "#4c51bf",
          800: "#434190",
          900: "#3c366b"
        },
        purple: {
          100: "#faf5ff",
          200: "#e9d8fd",
          300: "#d6bcfa",
          400: "#b794f4",
          500: "#9f7aea",
          600: "#805ad5",
          700: "#6b46c1",
          800: "#553c9a",
          900: "#44337a"
        },
        pink: {
          100: "#fff5f7",
          200: "#fed7e2",
          300: "#fbb6ce",
          400: "#f687b3",
          500: "#ed64a6",
          600: "#d53f8c",
          700: "#b83280",
          800: "#97266d",
          900: "#702459"
        }
      },
      opacity: {
        low: 0.1,
        md: 0.5,
        high: 0.9
      },
      fontFamilies: {
        heading: "Inter",
        body: "Roboto"
      },
      lineHeights: {
        heading: 1.1,
        body: 1.4
      },
      letterSpacing: {
        default: "0",
        increased: "1.5em",
        decreased: "-0.05em"
      },
      paragraphSpacing: {
    "h1": "32px",
    "h2": "26px"
      },
      fontWeights: {
        headingRegular: 400,
        headingBold: 700,
        bodyRegular: 400,
        bodyBold: 700
      },
      fontSizes: {
    "h1": "49px",
    "h2": "39px",
    "h3": "31px",
    "h4": "25px",
    "h5": "20px",
    "h6": "16px",
        body: "16px",
        sm: "13.6px",
        xs: "10.4px"
      },
      fg: {
        default: "#000000",
        muted: "#4a5568",
        subtle: "#a0aec0"
      },
      bg: {
        default: "#ffffff",
        muted: "#f7fafc",
        subtle: "#edf2f7"
      },
      accent: {
        default: "#7f9cf5",
        onAccent: "#ffffff",
        bg: "#c3dafe"
      },
      shadows: {
        default: "#1a202c"
      },
      button: {
        primary: {
          background: "#7f9cf5",
          text: "#ffffff"
        },
        borderRadius: "8px",
        borderWidth: "8px"
      },
      card: {
        borderRadius: "8px",
        background: "#ffffff",
        padding: "16px"
      },
      boxShadow: {
        default: "5px 5px 5px 3px rgba(26, 32, 44, 0.15), 4px 4px 5px 6px #00000033"
      },
      typography: {
    "H1": {
          Bold: "700 49px/1.1 Inter",
          Regular: "400 49px/1.1 Inter"
        },
    "H2": {
          Bold: "700 39px/1.1 Inter",
          Regular: "400 39px/1.1 Inter"
        },
        Body: "400 16px/1.1 Roboto"
      }
    },
  },
}