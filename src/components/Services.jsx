import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

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
    career: 'Akomodasi, transportasi, konsumsi, visa, asuransi, bimbingan ibadah, dan perlengkapan umrah (kain ihram, buku panduan).',
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
    career: 'Paket all-inclusive: Umrah lengkap + tiket antar destinasi, hotel di semua kota, tour guide lokal, dan dokumentasi perjalanan.',
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
    career: 'Layanan end-to-end: pengurusan dokumen haji, akomodasi premium, konsumsi, transportasi, perlengkapan, dan pendampingan penuh selama di tanah suci.',
  },
}

const serviceItems = [
  {
    key: 'umrah-reguler',
    img: '/assets/img/gallery-umrah.png',
    label: 'UMRAH',
    title: 'Umrah Reguler',
    subtitle: 'Paket Terjangkau · Jadwal Rutin · Fasilitas Lengkap',
    titleClass: 'font-display text-4xl sm:text-6xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
  {
    key: 'umrah-plus',
    img: '/assets/img/gallery-istanbul.png',
    label: 'UMRAH PLUS',
    title: 'Umrah Plus',
    subtitle: 'Turki · Aqsa · Kairo · Destinasi Tambahan',
    titleClass: 'font-display text-4xl sm:text-5xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
  {
    key: 'haji',
    img: '/assets/img/gallery-haji.png',
    label: 'HAJI',
    title: 'Paket Haji',
    subtitle: 'Haji Reguler & Plus · Pendampingan Penuh',
    titleClass: 'font-display text-4xl sm:text-5xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
]

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const modalRef = useRef(null)

  // Touch gesture states
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isRightSwipe = distance < -minSwipeDistance

    if (isRightSwipe) {
      closeModal()
    }
  }

  const openModal = (key) => {
    const data = servicesData[key]
    if (!data) return

    setSelectedService(data)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'

    // Animate modal content in
    setTimeout(() => {
      gsap.to('.service-modal-content-anim', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })
    }, 50)
  }

  const closeModal = () => {
    gsap.to('.service-modal-content-anim', { y: 20, opacity: 0, duration: 0.3 })
    setTimeout(() => {
      setIsModalOpen(false)
      setSelectedService(null)
      document.body.style.overflow = ''
    }, 500)
  }

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  return (
    <section className="py-24 sm:py-32 relative bg-dark z-20 overflow-hidden" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-10 sm:mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-accent tracking-widest uppercase mb-2 text-xs sm:text-sm font-bold">
              Paket Perjalanan Ibadah
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
              Layanan <span className="text-gray-600">Kami</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-2 md:mt-0">
            Klik pada paket untuk melihat detail fasilitas &amp; itinerary.
          </p>
        </div>

        <div className="services-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceItems.map((item) => (
            <div
              key={item.key}
              className="service-card group cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] sm:aspect-[3/4] flex flex-col hoverable transition-all duration-500 hover:border-accent/40 shadow-lg"
              onClick={() => openModal(item.key)}
            >
              {/* Background Image */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a18] via-[#030a18]/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top Section - Label */}
              <div className="absolute top-0 left-0 w-full p-6 sm:p-8 flex justify-between items-start z-10">
                <span className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/40 text-accent font-mono text-[10px] sm:text-xs tracking-widest uppercase rounded-full backdrop-blur-md">
                  {item.label}
                </span>
                
                <div className="w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-accent group-hover:text-dark group-hover:border-accent transition-all duration-300">
                  <i className="fa-solid fa-arrow-right -rotate-45"></i>
                </div>
              </div>

              {/* Bottom Section - Content */}
              <div className="relative z-10 mt-auto p-6 sm:p-8">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {item.subtitle}
                </p>
                
                <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm font-sans font-semibold uppercase tracking-widest text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <span>Lihat Detail Program</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {isModalOpen && selectedService && (
        <div
          id="serviceModal"
          ref={modalRef}
          className="fixed inset-0 z-[99999] transition-opacity duration-500"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
            id="serviceModalBackdrop"
            onClick={closeModal}
          ></div>

          <button
            className="fixed top-4 right-4 md:top-10 md:right-10 z-[100000] w-10 h-10 md:w-14 md:h-14 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95 closeServiceModalBtn shadow-lg"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark text-lg md:text-2xl"></i>
          </button>

          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-[35vh] md:h-auto relative shrink-0">
                <button
                  className="md:hidden absolute top-4 left-4 z-[100000] w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center active:scale-95 shadow-lg"
                  onClick={closeModal}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <img
                  src={selectedService.img}
                  id="serviceModalImg"
                  alt={selectedService.fullTitle}
                  className="absolute inset-0 w-full h-full object-cover grayscale md:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent md:hidden"></div>
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-20 relative bg-dark">
                <div className="max-w-xl service-modal-content-anim translate-y-10 opacity-0 pt-6 md:pt-0 pb-16 md:pb-0">
                  <span
                    id="serviceModalCategory"
                    className="text-accent tracking-[0.3em] uppercase text-xs md:text-sm font-bold block mb-4"
                  >
                    {selectedService.category}
                  </span>
                  <h2
                    id="serviceModalTitle"
                    className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white"
                  >
                    {selectedService.fullTitle}
                  </h2>

                  <p
                    id="serviceModalDesc"
                    className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 font-light border-l-2 border-accent pl-4 md:pl-6"
                  >
                    {selectedService.desc}
                  </p>

                  <div className="mb-8 sm:mb-10">
                    <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-xs md:text-sm">
                      Keunggulan Paket Ini
                    </h4>
                    <ul id="serviceModalPoints" className="space-y-3 md:space-y-4 text-sm md:text-base">
                      {selectedService.points.map((point, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <i className="fa-solid fa-check text-accent mt-1 mr-3 text-sm flex-shrink-0"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 sm:p-6 bg-white/5 rounded-xl border border-accent/20">
                    <h4 className="text-white font-bold mb-2 text-sm md:text-base">
                      <i className="fa-solid fa-gift text-accent mr-2"></i>Yang Didapat Jamaah
                    </h4>
                    <p id="serviceModalCareer" className="text-gray-400 text-xs sm:text-sm">
                      {selectedService.career}
                    </p>
                  </div>

                  <a
                    href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20ini"
                    target="_blank"
                    rel="noopener"
                    className="mt-6 sm:mt-8 group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-dark font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full hover:bg-gold-light transition-all duration-300"
                  >
                    <i className="fa-brands fa-whatsapp text-base sm:text-lg"></i>
                    <span>Tanya via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
