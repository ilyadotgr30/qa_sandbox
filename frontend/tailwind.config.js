/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    black: '#0a0a0c',
                    blue: '#00f3ff',
                    pink: '#ff00ff',
                    dark: '#1a1a2e'
                }
            }
        },
    },
    plugins: [],
}