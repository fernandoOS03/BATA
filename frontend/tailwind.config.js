/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fff1f2',
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    500: '#e11d48', // Color principal (Rojo Bata vibrante)
                    600: '#be123c', // Hover
                    700: '#9f1239', // Active
                    900: '#881337',
                },
                success: '#10b981', // Verde éxito
                warning: '#f59e0b', // Amarillo alerta
                error: '#ef4444',   // Rojo error
            }, fontFamily: {
                sans: ['DM Sans', 'system-ui', 'Arial', 'sans-serif'],

            }, boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}