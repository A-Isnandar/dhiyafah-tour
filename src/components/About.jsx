import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

const About = () => {
  const swiperRef = useRef(null)
  const [activeGalleryCard, setActiveGalleryCard] = useState(0)

  // Initialize Swiper
  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: true,
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
      })
      return () => swiper.destroy()
    }
  }, [])

  // Gallery card click handler (mobile)
  const handleGalleryCardClick = (index) => {
    if (window.innerWidth < 768) {
      setActiveGalleryCard(index)
    }
  }

  const galleryItems = [
    {
      img: '/assets/img/gallery-umrah.png',
      category: 'Paket Ibadah',
      title: 'Umrah Reguler',
      desc: 'Paket umrah terjangkau dengan jadwal rutin dan fasilitas lengkap untuk seluruh jamaah.',
      verticalTitle: 'UMRAH',
    },
    {
      img: '/assets/img/gallery-haji.png',
      category: 'Ibadah Wajib',
      title: 'Paket Haji',
      desc: 'Pendampingan penuh dari keberangkatan hingga kepulangan jamaah haji.',
      verticalTitle: 'HAJI',
    },
    {
      img: '/assets/img/gallery-istanbul.png',
      category: 'Wisata Islam',
      title: 'Tour Muslim',
      desc: 'Jelajahi destinasi wisata islami dunia — Turki, Aqsa, dan lebih banyak lagi.',
      verticalTitle: 'TOUR MUSLIM',
    },
    {
      img: '/assets/img/gallery-premium.png',
      category: 'Premium',
      title: 'Layanan Plus',
      desc: 'Hotel bintang 5 dekat Masjid Nabawi & Masjidil Haram, dengan pendampingan mutawwif berpengalaman.',
      verticalTitle: 'PREMIUM',
    },
  ]

  const swiperSlides = [
    { img: '/assets/img/gallery-umrah.png', alt: 'Makkah - Masjidil Haram', title: 'Makkah', desc: "Kota suci, rumah Ka'bah & Masjidil Haram yang agung." },
    { img: '/assets/img/gallery-madinah.png', alt: 'Madinah - Masjid Nabawi', title: 'Madinah', desc: 'Kota Nabi, tempat Masjid Nabawi & makam Rasulullah SAW.' },
    { img: '/assets/img/gallery-istanbul.png', alt: 'Istanbul, Turkey', title: 'Istanbul', desc: 'Kota bersejarah Islam di Turki dengan ribuan warisan peradaban.' },
    { img: '/assets/img/gallery-haji.png', alt: 'Padang Arafah - Ibadah Haji', title: 'Padang Arafah', desc: 'Tempat wukuf para jamaah haji, puncak ibadah yang paling mulia.' },
    { img: '/assets/img/gallery-premium.png', alt: 'Hotel Premium Makkah', title: 'Hotel Premium', desc: 'Akomodasi bintang 5, langkah kaki dari Masjid Nabawi & Haram.' },
  ]

  return (
    <section id="about-section" className="py-5 sm:py-24 bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
        <div className="mb-10 sm:mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
            Perjalanan Bersama <span className="text-accent">Dhiyafah</span>
          </h2>

          <div className="text-gray-400 max-w-3xl space-y-3 sm:space-y-4 leading-relaxed text-sm md:text-base">
            <p>
              Dhiyafah Tour adalah brand perjalanan ibadah yang berkomitmen menghadirkan pengalaman Umrah, Haji, dan Tour Muslim yang aman, nyaman, dan penuh makna. Kami hadir untuk memastikan setiap langkah perjalanan suci Anda berjalan lancar.
            </p>
            <p>
              Dikelola oleh PT. Amanah Safari Internasional (Asafi Group), Dhiyafah Tour telah melayani ribuan jamaah dari berbagai kota di Indonesia, termasuk Bengkulu dan Tangerang. Terdaftar resmi di Kemenag RI, IATA, dan SISKOPATUH.
            </p>
          </div>
        </div>

        {/* Expanding Gallery */}
        <div
          className="flex flex-col md:flex-row h-[450px] sm:h-[500px] gap-2 mb-16 sm:mb-20 w-full"
          id="expandingGallery"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`gallery-card relative flex-1 overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${activeGalleryCard === index ? 'active' : ''}`}
              onClick={() => handleGalleryCardClick(index)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-90 group-[.active]:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="gallery-text absolute bottom-0 left-0 p-5 sm:p-8 w-full">
                <span className="text-accent tracking-widest uppercase text-xs font-bold mb-2 block">{item.category}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 leading-none">
                  {item.title}
                </h3>
                <p className="text-white text-xs sm:text-sm md:text-base max-w-xs line-clamp-3">
                  {item.desc}
                </p>
              </div>
              <div className="vertical-title absolute bottom-8 left-8 origin-bottom-left -rotate-90 hidden md:block">
                <h3 className="font-display text-2xl font-bold text-white/40 tracking-widest whitespace-nowrap">
                  {item.verticalTitle}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          id="statsSection"
          className="border border-accent/20 bg-white/5 backdrop-blur-md rounded-3xl mx-auto max-w-6xl relative overflow-hidden group mb-20 sm:mb-32"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="py-10 sm:py-12 md:py-16 text-center group-hover:bg-white/[0.02] transition-colors duration-500">
              <div className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-2 flex justify-center items-start leading-none">
                <span className="counter" data-target="5000">0</span>
                <span className="text-accent text-3xl sm:text-4xl mt-2">+</span>
              </div>
              <span className="font-mono text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase">Jamaah Diberangkatkan</span>
            </div>
            <div className="py-10 sm:py-12 md:py-16 text-center group-hover:bg-white/[0.02] transition-colors duration-500">
              <div className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-2 leading-none">
                <span className="counter" data-target="10">0</span>
                <span className="text-accent text-2xl sm:text-3xl">+</span>
              </div>
              <span className="font-mono text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase">Tahun Pengalaman</span>
            </div>
            <div className="py-10 sm:py-12 md:py-16 text-center group-hover:bg-white/[0.02] transition-colors duration-500">
              <div className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-2 leading-none flex justify-center items-center gap-1">
                <span className="counter" data-target="49" data-decimal="true">0</span>
                <span className="text-accent text-2xl sm:text-3xl">★</span>
              </div>
              <span className="font-mono text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase">Rating Jamaah</span>
            </div>
          </div>
        </div>

        {/* Swiper Gallery Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-white/10 gap-4 md:gap-0">
          <div>
            <span className="text-accent tracking-widest uppercase text-xs sm:text-sm font-bold mb-2 block">Destinasi Pilihan</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Galeri Destinasi
            </h2>
            <p className="text-gray-400 max-w-lg text-sm sm:text-base">
              Jelajahi keindahan tanah suci dan destinasi wisata muslim dunia bersama Dhiyafah Tour.
            </p>
          </div>

          <div className="flex gap-4 mt-2 md:mt-0">
            <button className="swiper-prev hoverable w-12 h-12 sm:w-14 sm:h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all active:scale-95">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
            <button className="swiper-next hoverable w-12 h-12 sm:w-14 sm:h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-dark hover:scale-110 transition-all active:scale-95">
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div ref={swiperRef} className="swiper mySwiper pl-4 sm:pl-8 md:pl-32 pb-12 overflow-hidden w-full">
        <div className="swiper-wrapper">
          {swiperSlides.map((slide, index) => (
            <div key={index} className="swiper-slide w-[260px] sm:w-[300px] md:w-[400px]">
              <div className="relative aspect-[3/4] overflow-hidden group rounded-lg">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-5 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent w-full">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
