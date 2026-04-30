tailwind.config = {
    theme: {
        extend: {
            colors: {
                dark: '#060D25',       // Deep Navy Dhiyafah
                primary: '#0B1E59',    // Biru Navy Utama
                accent: '#FFC000',     // Emas Dhiyafah
                highlight: '#E60000',  // Merah Aksen
                glass: 'rgba(255, 255, 255, 0.05)',
                'navy-light': '#1A3080',
                'gold-light': '#FFD54F',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
                mono: ['Space Grotesk', 'monospace'],
            },
            backgroundImage: {
                'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
            }
        }
    }
}