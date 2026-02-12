/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100%",
        "screen-ios": "-webkit-fill-available",
      },
      minHeight: {
        screen: "100%",
        "screen-ios": "-webkit-fill-available",
      },
    },
  },
  plugins: [],
};
