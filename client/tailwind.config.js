export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                surface: '#0f172a',
                panel: '#111827',
                accent: '#2563eb',
                accentSoft: '#dbeafe'
            },
            boxShadow: {
                soft: '0 20px 60px rgba(15, 23, 42, 0.12)'
            }
        }
    },
    plugins: []
};
