tailwind.config = {
    theme: {
        extend: {
            colors: {
                dark: '#0a0a0a',
                primary: '#3b82f6', // Electric Blue
                accent: '#eab308',  // Gold
                glass: 'rgba(255, 255, 255, 0.05)',
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Syne', 'sans-serif'],
            },
            backgroundImage: {
                'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
            }
        }
    }
}