/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
      'fcfriday': ['FC Friday', 'sans-serif'],
    },
    colors: {
      // เพิ่มสีใหม่ที่นี่
      primary: '#2F80ED',       // ตัวอย่างสีฟ้า
      secondary: '#D9D9D9',     // ตัวอย่างสีเหลือง

    }
  },
  },
  plugins: [],
}

