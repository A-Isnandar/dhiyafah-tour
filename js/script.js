// js/script.js — Dhiyafah Tour

// 1. Initialize Lenis (Smooth Scrolling)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Logic
const cursor = document.getElementById('cursor');
const hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

hoverables.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovered'));
});

// 3. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Loader Animation
const loaderTimeline = gsap.timeline();
loaderTimeline
  .to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
  .to(
    '.loader-text',
    { y: 0, duration: 1, stagger: 0.1, ease: 'power4.out' },
    '-=1'
  )
  .to('.loader', { y: '-100%', duration: 1, ease: 'power4.inOut', delay: 0.5 });

// Hero Animations
const heroTimeline = gsap.timeline({ delay: 3 });
heroTimeline.to('.hero-anim', {
  y: 0,
  duration: 1.5,
  stagger: 0.1,
  ease: 'power4.out',
});

// Parallax Effect for Hero
gsap.to('#hero-bg', {
  scrollTrigger: {
    trigger: '#home',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  y: 200,
  scale: 1.2,
});

// Vision Quote Reveal
const visionQuote = document.getElementById('vision-quote');
if (visionQuote) {
  const quoteText = visionQuote.innerText;
  visionQuote.innerHTML = quoteText
    .split(' ')
    .map(
      (word) =>
        `<span class='inline-block opacity-0 translate-y-4 quote-word'>${word}&nbsp;</span>`
    )
    .join('');

  gsap.to('.quote-word', {
    scrollTrigger: {
      trigger: '#vision-section',
      start: 'top 70%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 1,
    ease: 'power3.out',
  });
}

gsap.to('#vision-image', {
  scrollTrigger: {
    trigger: '#vision-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  y: -50,
  scale: 1,
});

// --- SERVICES INTERACTIVE LOGIC (HOVER + MODAL) ---

// 1. Database Konten Layanan
const servicesData = {
  'umrah-reguler': {
    category: 'PAKET UMRAH',
    title: 'Umrah Reguler',
    fullTitle: 'Umrah Reguler',
    img: '/assets/img/gallery-umrah.png',
    desc: 'Paket umrah terjangkau dengan jadwal keberangkatan rutin, fasilitas lengkap, dan pendampingan mutawwif berpengalaman. Cocok untuk jamaah yang menginginkan perjalanan ibadah yang fokus dan khusyuk.',
    points: [
      'Hotel bintang 3–4 dekat Masjidil Haram & Masjid Nabawi',
      'Tiket pesawat PP dengan maskapai terpercaya',
      'Mutawwif berpengalaman & bersertifikat',
      'Visa umrah resmi & asuransi perjalanan',
      'Konsumsi 3x sehari selama di tanah suci',
    ],
    career:
      'Akomodasi, transportasi, konsumsi, visa, asuransi, bimbingan ibadah, dan perlengkapan umrah (kain ihram, buku panduan).',
  },
  'umrah-plus': {
    category: 'UMRAH PLUS DESTINASI',
    title: 'Umrah Plus',
    fullTitle: 'Umrah Plus (Turki / Aqsa / Kairo)',
    img: '/assets/img/gallery-istanbul.png',
    desc: 'Gabungkan ibadah umrah dengan wisata ke destinasi-destinasi peradaban Islam yang menakjubkan — Istanbul Turki, Masjidil Aqsa Palestina, atau Kairo Mesir. Sebuah perjalanan spiritual yang tak terlupakan.',
    points: [
      'Semua fasilitas Umrah Reguler Premium',
      'Tambahan destinasi wisata Islam (Turki / Aqsa / Kairo)',
      'Hotel bintang 4–5 di semua destinasi',
      'Tour guide lokal berbahasa Indonesia',
      'Jadwal kunjungan situs sejarah Islam',
    ],
    career:
      'Paket all-inclusive: Umrah lengkap + tiket antar destinasi, hotel di semua kota, tour guide lokal, dan dokumentasi perjalanan.',
  },
  haji: {
    category: 'IBADAH HAJI',
    title: 'Paket Haji',
    fullTitle: 'Paket Haji Reguler & Plus',
    img: '/assets/img/gallery-haji.png',
    desc: 'Layanan haji lengkap dengan pendampingan penuh dari keberangkatan hingga kepulangan. Tim Dhiyafah Tour memastikan setiap jamaah dapat menjalani ibadah haji dengan khusyuk, aman, dan sesuai syariat.',
    points: [
      'Pendampingan mutawwif & pembimbing ibadah bersertifikat',
      'Hotel dekat Masjidil Haram (Makkah) & Masjid Nabawi (Madinah)',
      'Transportasi premium antar kota suci',
      'Konsultasi kesehatan & pendampingan jamaah lansia',
      'Laporan perkembangan jamaah real-time kepada keluarga',
    ],
    career:
      'Layanan end-to-end: pengurusan dokumen haji, akomodasi premium, konsumsi, transportasi, perlengkapan, dan pendampingan penuh selama di tanah suci.',
  },
};

// 2. Hover Image Reveal Logic
const servicesContainer = document.querySelector('.services-container');
const serviceRevealImg = document.querySelector('.service-reveal-img');
const serviceItems = document.querySelectorAll('.service-item');

if (servicesContainer) {
  serviceItems.forEach((item) => {
    // Hover Effect (Desktop Only)
    item.addEventListener('mouseenter', () => {
      const imgUrl = item.getAttribute('data-img');
      if (serviceRevealImg && window.innerWidth > 768) {
        serviceRevealImg.src = imgUrl;
        serviceRevealImg.classList.add('active');
      }
    });
    item.addEventListener('mouseleave', () => {
      if (serviceRevealImg) serviceRevealImg.classList.remove('active');
    });

    // Cursor hover
    item.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovered'));
    item.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovered'));

    // Click Open Modal
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-key');
      openServiceModal(key);
    });
  });
}

// 3. Modal Functions
let serviceModal = document.getElementById('serviceModal');
const serviceModalBackdrop = document.getElementById('serviceModalBackdrop');
const closeServiceBtns = document.querySelectorAll('.closeServiceModalBtn');

function openServiceModal(key) {
  serviceModal = document.getElementById('serviceModal');
  const data = servicesData[key];
  if (!data || !serviceModal) return;

  document.body.appendChild(serviceModal);

  // Populate Data
  document.getElementById('serviceModalCategory').innerText = data.category;
  document.getElementById('serviceModalTitle').innerText = data.fullTitle;
  document.getElementById('serviceModalImg').src = data.img;
  document.getElementById('serviceModalDesc').innerText = data.desc;
  document.getElementById('serviceModalCareer').innerText = data.career;

  // Populate Points
  const pointsContainer = document.getElementById('serviceModalPoints');
  pointsContainer.innerHTML = '';
  data.points.forEach((point) => {
    const li = document.createElement('li');
    li.className = 'flex items-start text-gray-300';
    li.innerHTML = `<i class="fa-solid fa-check text-accent mt-1 mr-3 text-sm flex-shrink-0"></i><span>${point}</span>`;
    pointsContainer.appendChild(li);
  });

  serviceModal.classList.remove('hidden');
  void serviceModal.offsetWidth;
  serviceModal.classList.remove('opacity-0');

  lenis.stop();
  document.body.style.overflow = 'hidden';

  gsap.to('.service-modal-content-anim', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
  });
}

function closeServiceModal() {
  serviceModal = document.getElementById('serviceModal');
  if (!serviceModal) return;

  serviceModal.classList.add('opacity-0');
  gsap.to('.service-modal-content-anim', { y: 20, opacity: 0, duration: 0.3 });

  setTimeout(() => {
    serviceModal.classList.add('hidden');
    lenis.start();
    document.body.style.overflow = '';
  }, 500);
}

closeServiceBtns.forEach((btn) => btn.addEventListener('click', closeServiceModal));
if (serviceModalBackdrop) serviceModalBackdrop.addEventListener('click', closeServiceModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModal && !serviceModal.classList.contains('hidden')) {
    closeServiceModal();
  }
});

// --- HOWTO TIMELINE ANIMATION ---
gsap.to('#ppdbProgressLine', {
  scrollTrigger: {
    trigger: '#howto-section',
    start: 'top 40%',
    end: 'bottom 80%',
    scrub: 1.5,
  },
  height: '100%',
  ease: 'none',
});

const ppdbSteps = document.querySelectorAll('.ppdb-step');
ppdbSteps.forEach((step, index) => {
  const xOffset = window.innerWidth > 768 ? (index % 2 === 0 ? -50 : 50) : 0;
  const yOffset = window.innerWidth > 768 ? 0 : 50;

  gsap.from(step.querySelector('.ppdb-card'), {
    scrollTrigger: {
      trigger: step,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: xOffset,
    y: yOffset,
    duration: 0.8,
    ease: 'power3.out',
  });

  const bigNumber = step.querySelector('.font-display.text-7xl, .font-display.text-8xl');
  if (bigNumber) {
    gsap.from(bigNumber, {
      scrollTrigger: {
        trigger: step,
        start: 'top 90%',
      },
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }
});

// Testimonials Stagger Animation
gsap.from('.news-card', {
  scrollTrigger: {
    trigger: '#testimonials-section',
    start: 'top 70%',
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1.2,
  ease: 'power4.out',
});

// Certifications Badges Animation
gsap.from('.cert-badge', {
  scrollTrigger: {
    trigger: '#certifications-section',
    start: 'top 75%',
  },
  y: 50,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: 'power3.out',
});

// Timeline Items Fade In
gsap.utils.toArray('.timeline-item').forEach((item) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });
});

// 4. Initialize Swiper
const swiperEl = document.querySelector('.mySwiper');
if (swiperEl) {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    freeMode: true,
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
  });
}

// 5. Mobile Menu Logic
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link span');
const navBar = document.querySelector('nav');

let isMenuOpen = false;

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.remove('translate-x-full');
    gsap.to(mobileLinks, {
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.3,
      ease: 'power4.out',
    });
    menuIcon.classList.remove('fa-bars-staggered');
    menuIcon.classList.add('fa-xmark');
    menuIcon.style.transform = 'rotate(90deg)';
    navBar.classList.remove('mix-blend-difference');
    lenis.stop();
  } else {
    mobileMenu.classList.add('translate-x-full');
    gsap.to(mobileLinks, { y: '100%', duration: 0.1 });
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars-staggered');
    menuIcon.style.transform = 'rotate(0deg)';
    if (window.scrollY <= 50) {
      navBar.classList.add('mix-blend-difference');
    }
    lenis.start();
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMobileMenu();
    });
  });
}

// 6. Navbar Scroll Logic
function handleNavbarScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
    nav.classList.remove('py-4');
    nav.classList.add('py-2');
  } else {
    nav.classList.remove('nav-scrolled');
    nav.classList.remove('py-2');
    nav.classList.add('py-4');
    if (!isMenuOpen) {
      nav.classList.add('mix-blend-difference');
    }
  }
}

window.addEventListener('scroll', handleNavbarScroll);

// 7. Expanding Gallery Logic
const galleryCards = document.querySelectorAll('.gallery-card');

if (galleryCards.length > 0) {
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        galleryCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
}

// 8. Stats Counter Animation (with decimal support for 4.9★)
const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => {
  const rawTarget = +counter.getAttribute('data-target');
  const isDecimal = counter.getAttribute('data-decimal') === 'true';
  // If data-decimal, the value 49 represents 4.9
  const target = isDecimal ? rawTarget / 10 : rawTarget;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#statsSection',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      if (isDecimal) {
        counter.innerText = obj.val.toFixed(1);
      } else {
        counter.innerText = Math.ceil(obj.val).toLocaleString('id-ID');
      }
    },
  });
});

// --- THEME TOGGLE LOGIC ---
const themeToggles = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
  setTheme('light');
} else {
  setTheme('dark');
}

function setTheme(mode) {
  if (mode === 'light') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');

    document
      .querySelectorAll('.light-icon')
      .forEach((el) => el.classList.add('hidden'));
    document
      .querySelectorAll('.dark-icon')
      .forEach((el) => el.classList.remove('hidden'));

    themeToggles.forEach((btn) => btn.classList.add('text-gray-800'));
    themeToggles.forEach((btn) => btn.classList.remove('text-white'));
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');

    document
      .querySelectorAll('.light-icon')
      .forEach((el) => el.classList.remove('hidden'));
    document
      .querySelectorAll('.dark-icon')
      .forEach((el) => el.classList.add('hidden'));

    themeToggles.forEach((btn) => btn.classList.remove('text-gray-800'));
    themeToggles.forEach((btn) => btn.classList.add('text-white'));
  }
}

themeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
});
