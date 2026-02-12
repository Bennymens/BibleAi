/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"], // Fallback to vh, then use dvh if supported
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [],
};
