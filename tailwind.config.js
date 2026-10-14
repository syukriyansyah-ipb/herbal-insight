/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "wallpaper-search": "url('/assets/images/wallpaper-searching.svg')",
          'wallpaper-login': "url('/assets/images/wallpaper-login.png')",
        },
        colors: {
          'color-judul' : '#1A3626',
          'color-labelSearching' : '#5B8561',
        }
    },
  },
  plugins: [],
};
