module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hrm-bg": "url('/login/bg.png')",
      },
      backgroundColor: {
        primary: "#677CAF",
      },

      boxShadow: {
        normal: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        iranYekan: "iranYekan",
      },
    },
  },
  plugins: [],
};
