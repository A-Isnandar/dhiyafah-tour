// js/script.js

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
// Kita select ulang .hoverable karena elemennya baru masuk ke DOM
const hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('mousemove', (e) => {
  // Safety check kalau cursor ada
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

hoverables.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// 3. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Loader Animation (Transisi pembuka)
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
const heroTimeline = gsap.timeline({ delay: 3 }); // Delay nunggu loader kelar
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

// Tan Malaka Quote Reveal
const quoteElement = document.getElementById('tm-quote');
if (quoteElement) {
  const quoteText = quoteElement.innerText;
  quoteElement.innerHTML = quoteText
    .split(' ')
    .map(
      (word) =>
        `<span class='inline-block opacity-0 translate-y-4 quote-word'>${word}&nbsp;</span>`
    )
    .join('');

  gsap.to('.quote-word', {
    scrollTrigger: {
      trigger: '#tan-malaka',
      start: 'top 70%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 1,
    ease: 'power3.out',
  });
}

gsap.to('#tm-image', {
  scrollTrigger: {
    trigger: '#tan-malaka',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  y: -50,
  scale: 1,
});

// ... kode-kode sebelumnya ...

// --- MAJORS INTERACTIVE LOGIC (HOVER + MODAL) ---

// 1. Database Konten Jurusan
const majorsData = {
  tkj: {
    category: 'TEKNOLOGI INFORMASI',
    title: 'TKJ',
    fullTitle: 'Teknik Komputer & Jaringan',
    img: '/assets/img/tkj.png',
    desc: 'Membekali siswa dengan keahlian tingkat lanjut dalam merakit, mengelola, dan mengamankan jaringan komputer. Program ini dirancang dengan standar industri terkini untuk mencetak teknisi jaringan yang handal.',
    points: [
      'Laboratorium Standar Industri (Mikrotik Academy)',
      'Kurikulum berbasis Fiber Optic & Cloud Computing',
      'Fokus pada Cyber Security Dasar',
      'Praktek Instalasi Jaringan LAN/WAN Real Device',
    ],
    career:
      'Network Engineer, System Administrator, IT Support, Teknisi Fiber Optic, Cyber Security Analyst.',
  },
  perbankan: {
    category: 'BISNIS & MANAJEMEN',
    title: 'Perbankan',
    fullTitle: 'Layanan Perbankan',
    img: '/assets/img/perbankan.png',
    desc: 'Program keahlian yang fokus pada penguasaan administrasi keuangan, akuntansi perbankan, dan layanan nasabah yang profesional. Menggabungkan teori akuntansi modern dengan etika layanan prima.',
    points: [
      'Mini Bank YADIKA (Simulasi Transaksi Riil)',
      'Sertifikasi Komputer Akuntansi (MYOB/Zahir)',
      'Laboratorium Simulasi Kasir & Teller',
      'Kerjasama Magang dengan Bank Nasional & BUMN',
    ],
    career:
      'Teller Bank, Customer Service, Staff Administrasi Keuangan, Akuntan Junior, Kasir Profesional.',
  },
};

// 2. Hover Image Reveal Logic (Existing)
const majorsContainer = document.querySelector('.majors-container');
const revealImg = document.querySelector('.major-reveal-img');
const majorItems = document.querySelectorAll('.major-item');

// Hover Logic
if (majorsContainer) {
  majorItems.forEach((item) => {
    // Hover Effect (Desktop Only)
    item.addEventListener('mouseenter', () => {
      const imgUrl = item.getAttribute('data-img');
      if (revealImg && window.innerWidth > 768) {
        revealImg.src = imgUrl;
        revealImg.classList.add('active');
      }
    });
    item.addEventListener('mouseleave', () => {
      if (revealImg) revealImg.classList.remove('active');
    });

    // Re-add cursor hover
    item.addEventListener(
      'mouseenter',
      () => cursor && cursor.classList.add('hovered')
    );
    item.addEventListener(
      'mouseleave',
      () => cursor && cursor.classList.remove('hovered')
    );

    // 3. CLICK OPEN MODAL LOGIC
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-key');
      openMajorModal(key);
    });
  });
}

// 4. Modal Functions
let modal = document.getElementById('majorModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeBtns = document.querySelectorAll('.closeModalBtn');

function openMajorModal(key) {
  // RE-SELECT modal karena mungkin DOM-nya berubah setelah di-inject loader.js
  modal = document.getElementById('majorModal');

  const data = majorsData[key];
  if (!data || !modal) return;

  // --- FIX STACKING CONTEXT ---
  // Pindahkan modal ke body agar z-indexnya menang lawan Navbar
  document.body.appendChild(modal);
  // ---------------------------

  // Populate Data
  document.getElementById('modalCategory').innerText = data.category;
  document.getElementById('modalTitle').innerText = data.fullTitle;
  document.getElementById('modalImg').src = data.img;
  document.getElementById('modalDesc').innerText = data.desc;
  document.getElementById('modalCareer').innerText = data.career;

  // Populate Points
  const pointsContainer = document.getElementById('modalPoints');
  pointsContainer.innerHTML = '';
  data.points.forEach((point) => {
    const li = document.createElement('li');
    li.className = 'flex items-start text-gray-300';
    li.innerHTML = `<i class="fa-solid fa-check text-accent mt-1 mr-3 text-sm"></i> <span>${point}</span>`;
    pointsContainer.appendChild(li);
  });

  // Show Modal
  modal.classList.remove('hidden');
  void modal.offsetWidth; // Force reflow
  modal.classList.remove('opacity-0');

  // Stop Scroll
  lenis.stop();
  document.body.style.overflow = 'hidden';

  // Animasi Konten
  gsap.to('.modal-content-anim', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
  });
}

function closeMajorModal() {
  modal = document.getElementById('majorModal');
  if (!modal) return;

  modal.classList.add('opacity-0');
  gsap.to('.modal-content-anim', { y: 20, opacity: 0, duration: 0.3 });

  setTimeout(() => {
    modal.classList.add('hidden');
    lenis.start();
    document.body.style.overflow = '';

    // Opsional: Kembalikan modal ke tempat asalnya jika perlu,
    // tapi dibiarkan di body juga aman karena hidden.
  }, 500);
}

// Event Listeners buat Close
closeBtns.forEach((btn) => btn.addEventListener('click', closeMajorModal));
if (modalBackdrop) modalBackdrop.addEventListener('click', closeMajorModal);

// Close on Escape Key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeMajorModal();
  }
});

// Timeline Drawing
// ... kode sebelumnya ...

// --- PPDB TIMELINE ANIMATION ---

// 1. Animasi Garis Tengah (Progress Line)
gsap.to('#ppdbProgressLine', {
  scrollTrigger: {
    trigger: '#ppdb',
    start: 'top 40%', // Mulai saat section PPDB hampir di tengah layar
    end: 'bottom 80%', // Selesai saat bagian bawah hampir keluar
    scrub: 1.5, // Smooth scrubbing
  },
  height: '100%', // Isi tinggi garis dari 0 ke 100%
  ease: 'none',
});

// 2. Animasi Cards (Muncul satu per satu)
const ppdbSteps = document.querySelectorAll('.ppdb-step');
ppdbSteps.forEach((step, index) => {
  // Tentukan arah datang animasi (Ganjil dari kiri, Genap dari kanan)
  // Kecuali di mobile (semua dari bawah/kiri)
  const xOffset = window.innerWidth > 768 ? (index % 2 === 0 ? -50 : 50) : 0;
  const yOffset = window.innerWidth > 768 ? 0 : 50;

  gsap.from(step.querySelector('.ppdb-card'), {
    scrollTrigger: {
      trigger: step,
      start: 'top 85%', // Muncul saat elemen masuk 85% viewport
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: xOffset,
    y: yOffset,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Animasi Angka Besar (01, 02...)
  const bigNumber = step.querySelector('.font-display.text-8xl');
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

// News Stagger
gsap.from('.news-card', {
  scrollTrigger: {
    trigger: '#berita',
    start: 'top 70%',
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1.2,
  ease: 'power4.out',
});

// 4. Initialize Swiper
const swiperEl = document.querySelector('.mySwiper');
if (swiperEl) {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
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
    // Open menu
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
  } else {
    // Close menu
    mobileMenu.classList.add('translate-x-full');
    gsap.to(mobileLinks, { y: '100%', duration: 0.1 });
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars-staggered');
    menuIcon.style.transform = 'rotate(0deg)';
    if (window.scrollY <= 50) {
      navBar.classList.add('mix-blend-difference');
    }
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close menu when link is clicked
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMobileMenu();
    });
  });
}

// 6. Navbar Scroll Logic
function handleNavbarScroll() {
  const nav = document.querySelector('nav');

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

// ... kode sebelumnya ...

// --- STATS COUNTER ANIMATION ---
const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => {
  const target = +counter.getAttribute('data-target');
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#statsSection', // UPDATE: Sekarang trigger-nya pakai ID statsSection
      start: 'top 80%', // Mulai animasi pas sectionnya masuk 80% viewport
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      counter.innerText = Math.ceil(obj.val);
    },
  });
});

// ... kode-kode sebelumnya ...

// --- THEME TOGGLE LOGIC ---
const themeToggles = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

// 1. Cek Preference Awal (Local Storage atau System)
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
  setTheme('light');
} else {
  setTheme('dark');
}

// 2. Fungsi Set Theme
function setTheme(mode) {
  if (mode === 'light') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');

    // Update Icon: Show Moon, Hide Sun (karena di light mode kita mau switch ke dark)
    document
      .querySelectorAll('.light-icon')
      .forEach((el) => el.classList.add('hidden'));
    document
      .querySelectorAll('.dark-icon')
      .forEach((el) => el.classList.remove('hidden'));

    // Ubah warna icon toggle jadi gelap biar kelihatan di bg putih
    themeToggles.forEach((btn) => btn.classList.add('text-gray-800'));
    themeToggles.forEach((btn) => btn.classList.remove('text-white'));
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');

    // Update Icon: Show Sun, Hide Moon
    document
      .querySelectorAll('.light-icon')
      .forEach((el) => el.classList.remove('hidden'));
    document
      .querySelectorAll('.dark-icon')
      .forEach((el) => el.classList.add('hidden'));

    // Balikin warna icon jadi putih
    themeToggles.forEach((btn) => btn.classList.remove('text-gray-800'));
    themeToggles.forEach((btn) => btn.classList.add('text-white'));
  }
}

// 3. Event Listeners
themeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
});
