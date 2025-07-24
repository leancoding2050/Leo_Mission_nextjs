/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 啟用暗黑模式支持
  theme: {
    extend: {
      colors: {
        'primary-1': '#1D475D',
        'primary-2': '#0071AC',
        'background': 'hsl(var(--background, 0 0% 100%))', // 使用 CSS 變量，默認為白色
        'foreground': 'hsl(var(--foreground, 0 0% 3.9%))', // 前景色
        'input': 'hsl(var(--input, 0 0% 89.8%))', // 輸入框背景
        'primary': 'hsl(var(--primary, 0 0% 9%))', // 主色
        'sub-1': '#F0EFEB',
        'sub-2': '#B7B7A4',
        'sub-3': '#A5A58D',
        'grey-1': '#F6F0ED',
        'grey-2': '#D7D7D7',
        'grey-3': '#D9D9D9',
        'grey-4': '#9C9C9C',
        'grey-5': '#898989',
        'grey-6': '#B5B5B5',
        'grey-7': '#A5A5A5',
        'grey-8': '#818181',
        'grey-9': '#646464',
        'grey-10': '#4C4C4C',
        'white': 'rgba(255, 255, 255, 1)',
        'black': 'rgb(0, 0, 0)',
        'red': '#FF0000',
        'green': '#47A66F',
        'board-white': 'rgba(255, 255, 255, 0.5)',
        'board-1': '#5f7f9495',
        'border': 'hsl(var(--border, 0 0% 89.8%))',
      },
      spacing: {
        'navbar-width': '40px',
        'navbar-height': '4rem',
      },
      boxShadow: {
        'light': '0 5px 15px rgba(0,0,0,0.1)',
        'dark': '0 5px 15px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        'default': '0.5rem',
      },
      transitionProperty: {
        'all': 'all 0.3s linear',
      },
      fontFamily: {
        'noto-sans-tc': ['"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};