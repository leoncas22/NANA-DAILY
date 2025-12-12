/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'soft-blue': '#A5D8FF',
                'light-purple': '#DCD6F7',
                'soft-gray': '#F5F7FA',
                'text-black': '#1A1A1A',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(220, 214, 247, 0.3), 0 2px 4px -1px rgba(220, 214, 247, 0.2)',
                'soft-lg': '0 10px 15px -3px rgba(220, 214, 247, 0.3), 0 4px 6px -2px rgba(220, 214, 247, 0.2)',
            },
        },
    },
    plugins: [],
}
