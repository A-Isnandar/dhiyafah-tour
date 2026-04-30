// List komponen yang mau di-inject
const components = [
    { id: 'preloader-container', file: 'components/preloader.html' },
    { id: 'navbar-container', file: 'components/navbar.html' },
    { id: 'hero-container', file: 'components/hero.html' },
    { id: 'vision-container', file: 'components/vision.html' },
    { id: 'about-container', file: 'components/about.html' },
    { id: 'services-container', file: 'components/services.html' },
    { id: 'howto-container', file: 'components/howto.html' },
    { id: 'testimonials-container', file: 'components/testimonials.html' },
    { id: 'certifications-container', file: 'components/certifications.html' },
    { id: 'footer-container', file: 'components/footer.html' }
];

// Fungsi async untuk load HTML
async function loadAllComponents() {
    try {
        const promises = components.map(async (comp) => {
            const response = await fetch(comp.file);
            const html = await response.text();
            const element = document.getElementById(comp.id);
            if (element) element.innerHTML = html;
        });

        // Tunggu semua file selesai di-load
        await Promise.all(promises);
        
        console.log("All components loaded!");
        
        // Setelah HTML lengkap, baru kita load script.js secara dinamis
        // biar animasi gak error karena elemennya belum ada.
        const script = document.createElement('script');
        script.src = 'js/script.js';
        document.body.appendChild(script);

    } catch (error) {
        console.error("Error loading components:", error);
    }
}

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", loadAllComponents);