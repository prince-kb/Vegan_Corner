/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  //   "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  theme: {
    extend: {
      fontFamily: {
        cav : ['Cav'],
        cavo : ['CavBold'],
        bubble:['Bubble'],
        janime:['Janime'],
        walto:['Walto'],
        peach:['Peach']
      },
      colors: {
        orange: "#FFB84D",
        brown : "#533030",
        darkbrown : "#3B1F1F",
        grey : {
        1 : "#EEE9E9"
      }
      },
    },
    plugins: [],
  },
};
