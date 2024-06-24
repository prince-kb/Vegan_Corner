/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FFB84D",
        brown : "#533030",
        grey : {
        1 : "#EEE9E9"
      }
      },
    },
    plugins: [],
  },
};
