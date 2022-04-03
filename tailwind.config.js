module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hrm-bg": "url('/login/bg.png')",
        "hrm-bg-top": "url('/work/bg.png')",
        none: "none",
      },
      backgroundColor: {
        primary: "#677CAF",
      },

      boxShadow: {
        normal: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        normalMd: "0px 4px 15px rgba(0, 0, 0, 0.25)",
        table: "0px 4px 40px 0px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        iranYekan: "iranYekan",
        bittypix: "bittypix",
      },

      colors: {
        firstColor: {
          100: "rgba(31, 120, 180,0.1)",
          200: "rgba(31, 120, 180,0.2)",
          300: "rgba(31, 120, 180,0.3)",
          400: "rgba(31, 120, 180,0.4)",
          500: "rgba(31, 120, 180,0.5)",
          600: "rgba(31, 120, 180,0.6)",
          700: "rgba(31, 120, 180,0.75)",
          800: "rgba(31, 120, 180,0.9)",
          900: "rgba(31, 120, 180, 1)",
        },
        secondColor: {
          100: "rgba(186, 132, 105, 0.1)",
          200: "rgba(186, 132, 105, 0.2)",
          300: "rgba(186, 132, 105, 0.3)",
          400: "rgba(186, 132, 105,0.4)",
          500: "rgba(186, 132, 105,0.5)",
          600: "rgba(186, 132, 105, 0.6)",
          700: "rgba(186, 132, 105,0.75)",
          800: "rgba(186, 132, 105, 0.9)",
          900: "rgba(186, 132, 105, 1)",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
