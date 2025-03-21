/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mansory: ["Mansory", "sans-serif"],
        poppins : ["Poppins", "sans-serif"],
        poppinsRegular: ["Poppins-Regular", "sans-serif"],
        forumRegular: ["Forum-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
