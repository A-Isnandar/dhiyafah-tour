import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ═══════════════════════════════════════════════════════ */
/*  Helper Components                                     */
/* ═══════════════════════════════════════════════════════ */

const StarRating = ({ rating, maxStars = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: maxStars }, (_, i) => (
      <i
        key={i}
        className={`fa-star text-xs ${
          i < rating ? 'fa-solid text-accent' : 'fa-regular text-gray-600'
        }`}
      ></i>
    ))}
  </div>
)

const AccordionItem = ({ title, children, isOpen, onToggle }) => (
  <div className="mb-3 overflow-hidden rounded-lg">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-3.5 bg-primary border-l-4 border-accent text-white font-bold text-sm sm:text-base tracking-wide hover:bg-primary/80 transition-all duration-300"
    >
      <span>{title}</span>
      <i
        className={`fa-solid fa-chevron-down text-accent text-xs transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      ></i>
    </button>
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="p-5 bg-white/5 border border-white/10 border-t-0 rounded-b-lg">
        {children}
      </div>
    </div>
  </div>
)

/* ═══════════════════════════════════════════════════════ */
/*  Services Data                                         */
/* ═══════════════════════════════════════════════════════ */

const servicesData = {
  umroh: {
    category: 'PAKET UMROH',
    title: 'Umroh',
    fullTitle: 'Paket Umroh',
    img: '/assets/img/gallery-umrah.png',
    desc: 'Paket umroh terjangkau dengan jadwal keberangkatan rutin, fasilitas lengkap, dan pendampingan mutawwif berpengalaman. Cocok untuk jamaah yang menginginkan perjalanan ibadah yang fokus dan khusyuk.',
    jenisPaket: 'UMRAH REGULER',
    maskapai: 'Saudi Airlines',
    hotelMakkah: { nama: 'Grand Zamzam', bintang: 4 },
    hotelMadinah: { nama: 'Dallah Taibah', bintang: 4 },
    hotelLabels: { makkah: 'Makkah', madinah: 'Madinah' },
    penerbangan: {
      berangkat: { dari: 'CGK', ke: 'JED' },
      kembali: { dari: 'JED', ke: 'CGK' },
    },
    itinerary: [
      'Hari 1 : JAKARTA – JEDDAH\nJamaah berkumpul di Bandara Soekarno-Hatta untuk keberangkatan. Setiba di Jeddah, jamaah diarahkan untuk pemeriksaan imigrasi lalu melanjutkan perjalanan menuju Madinah.',
      'Hari 2 : MADINAH\nCheck-in hotel Madinah. Jamaah melaksanakan sholat di Masjid Nabawi dan ziarah ke Makam Rasulullah SAW.',
      'Hari 3 : ZIARAH MADINAH\nZiarah kota Madinah mengunjungi Jabal Uhud, Masjid Quba, Kebun Kurma, dan tempat-tempat bersejarah lainnya.',
      'Hari 4 : MADINAH\nJamaah bebas beribadah di Masjid Nabawi. Melaksanakan Sholat Sunnah dan berdoa di Raudhah.',
      'Hari 5 : MADINAH – MAKKAH\nCheck-out hotel Madinah, perjalanan menuju Makkah. Check-in hotel Makkah dan melaksanakan ibadah Umrah (Thawaf, Sa\'i, dan Tahallul).',
      'Hari 6 : MAKKAH\nMemperbanyak ibadah di Masjidil Haram (Free Program).',
      'Hari 7 : ZIARAH MAKKAH\nZiarah kota Makkah mengunjungi Padang Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Jabal Tsur.',
      'Hari 8 : MAKKAH\nMemperbanyak ibadah di Masjidil Haram (Free Program).',
      'Hari 9 : MAKKAH – JEDDAH – JAKARTA\nTawaf Wada, check-out hotel, menuju Airport Jeddah untuk penerbangan kembali ke Tanah Air.',
    ],
    fasilitas: [
      'Tour Leader sejak keberangkatan dari Tanah Air',
      'Tiket Pesawat Domestik PP',
      'Tiket Pesawat Internasional PP',
      'Transportasi / Bus ber AC',
      'Visa Umroh',
      'Akomodasi / Hotel sesuai Paket (makan 3x sehari fullboard)',
      'Manasik Umroh, Muthawwif B.Indonesia',
      'Air Zam-zam 5 Liter / Orang (apabila diizinkan)',
      'Ziarah Madinah & Makkah',
      'Perlengkapan Umroh dan Asuransi Perjalanan',
    ],
    persyaratan: [
      'Paspor asli dengan masa berlaku minimal 7 bulan',
      'Foto berwarna ukuran 4x6 (8 lembar) dengan latar belakang putih',
      'Fotokopi KTP & Kartu Keluarga',
      'Buku Vaksin Meningitis (suntik meningitis)',
      'Surat Mahram (untuk wanita di bawah 45 tahun tanpa pendamping)',
      'Akte Lahir / Surat Nikah (untuk pasangan suami istri)',
      'Membayar uang muka (DP) sesuai ketentuan',
    ],
    syaratKetentuan: [
      'Pembayaran DP minimal 30% dari total harga paket saat pendaftaran.',
      'Pelunasan dilakukan selambat-lambatnya 1 bulan sebelum keberangkatan.',
      'Pembatalan setelah pelunasan dikenakan biaya administrasi sesuai kebijakan.',
      'Perubahan jadwal keberangkatan mengikuti ketersediaan seat maskapai.',
      'Harga paket dapat berubah sewaktu-waktu mengikuti kurs dan kebijakan maskapai.',
      'Peserta wajib mengikuti seluruh rangkaian manasik yang dijadwalkan.',
      'Dhiyafah Tour tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ketiga (maskapai, imigrasi, dll).',
    ],
  },

  haji: {
    category: 'IBADAH HAJI',
    title: 'Paket Haji',
    fullTitle: 'Paket Haji Reguler & Plus',
    img: '/assets/img/gallery-haji.png',
    desc: 'Layanan haji lengkap dengan pendampingan penuh dari keberangkatan hingga kepulangan. Tim Dhiyafah Tour memastikan setiap jamaah dapat menjalani ibadah haji dengan khusyuk, aman, dan sesuai syariat.',
    jenisPaket: 'HAJI REGULER & PLUS',
    maskapai: 'Garuda Indonesia',
    hotelMakkah: { nama: 'Hilton Suites Makkah', bintang: 5 },
    hotelMadinah: { nama: 'Millennium Al Aqeeq', bintang: 5 },
    hotelLabels: { makkah: 'Makkah', madinah: 'Madinah' },
    penerbangan: {
      berangkat: { dari: 'CGK', ke: 'MED' },
      kembali: { dari: 'JED', ke: 'CGK' },
    },
    itinerary: [
      'Hari 1 : JAKARTA – MADINAH\nJamaah berkumpul di Bandara Soekarno-Hatta. Penerbangan langsung menuju Madinah.',
      'Hari 2 : MADINAH\nCheck-in hotel. Ziarah Masjid Nabawi, Makam Rasulullah SAW, dan Raudhah.',
      'Hari 3–5 : ZIARAH MADINAH\nProgram ibadah dan ziarah kota Madinah. Kunjungan ke Jabal Uhud, Masjid Quba, Kebun Kurma.',
      'Hari 6 : MADINAH – MAKKAH\nPerjalanan menuju Makkah. Check-in hotel dan melaksanakan Umrah Wajib.',
      'Hari 7 : MAKKAH\nFree program memperbanyak ibadah di Masjidil Haram.',
      'Hari 8 : TARWIYAH – ARAFAH\nMenuju Arafah untuk Wukuf (rukun haji terbesar).',
      'Hari 9 : MUZDALIFAH – MINA\nMabit di Muzdalifah, melontar Jumrah Aqobah di Mina.',
      'Hari 10–11 : MINA\nMelontar Jumrah Ula, Wustha, dan Aqobah. Mabit di Mina.',
      'Hari 12 : MAKKAH\nKembali ke Makkah, Thawaf Ifadhah dan Sa\'i.',
      'Hari 13–15 : MAKKAH\nFree program, memperbanyak ibadah di Masjidil Haram.',
      'Hari 16 : MAKKAH – JEDDAH – JAKARTA\nThawaf Wada, menuju bandara untuk penerbangan pulang ke Tanah Air.',
    ],
    fasilitas: [
      'Tour Leader & Pembimbing Ibadah berpengalaman',
      'Tiket Pesawat PP (Internasional)',
      'Transportasi Bus ber AC selama di Tanah Suci',
      'Visa Haji Resmi',
      'Akomodasi Hotel bintang 5 di Makkah & Madinah',
      'Konsumsi 3x sehari (Fullboard)',
      'Perlengkapan Haji lengkap',
      'Asuransi Perjalanan',
      'Air Zam-zam 5 Liter / Orang (apabila diizinkan)',
      'Tenda VIP di Arafah & Mina',
      'Pendampingan Kesehatan (Dokter & Paramedis)',
    ],
    persyaratan: [
      'Memiliki nomor porsi haji yang masih aktif',
      'Paspor asli dengan masa berlaku minimal 7 bulan',
      'Foto berwarna ukuran 4x6 (8 lembar) latar belakang putih',
      'Fotokopi KTP & Kartu Keluarga',
      'Surat Keterangan Sehat dari dokter',
      'Buku Vaksin Meningitis',
      'Akte Lahir / Surat Nikah',
      'Membayar biaya sesuai ketentuan Kemenag RI',
    ],
    syaratKetentuan: [
      'Pendaftaran haji berdasarkan nomor porsi dan kuota Kemenag RI.',
      'Pembayaran BPIH (Biaya Penyelenggaraan Ibadah Haji) sesuai ketentuan pemerintah.',
      'Pelunasan biaya tambahan (upgrade) dilakukan sebelum keberangkatan.',
      'Jadwal keberangkatan mengikuti ketetapan Kemenag RI.',
      'Pembatalan dikenakan biaya sesuai kebijakan yang berlaku.',
      'Peserta wajib mengikuti manasik haji yang diselenggarakan.',
      'Dhiyafah Tour tidak bertanggung jawab atas perubahan jadwal oleh pihak berwenang.',
    ],
  },

  'tour-muslim': {
    category: 'TOUR MUSLIM',
    title: 'Tour Muslim',
    fullTitle: 'Tour Muslim — Wisata Peradaban Islam',
    img: '/assets/img/gallery-istanbul.png',
    desc: 'Jelajahi jejak peradaban Islam di kota-kota bersejarah dunia. Dari megahnya Istanbul, kemegahan Kairo, hingga keagungan Cordoba dan Granada — sebuah perjalanan wisata religi yang memperkaya wawasan dan iman.',
    jenisPaket: 'TOUR MUSLIM PREMIUM',
    maskapai: 'Turkish Airlines',
    hotelMakkah: { nama: 'Hilton Istanbul Bosphorus', bintang: 5 },
    hotelMadinah: { nama: 'Steigenberger Hotel El Tahrir', bintang: 5 },
    hotelLabels: { makkah: 'Istanbul', madinah: 'Kairo' },
    penerbangan: {
      berangkat: { dari: 'CGK', ke: 'IST' },
      kembali: { dari: 'CAI', ke: 'CGK' },
    },
    itinerary: [
      'Hari 1 : JAKARTA – ISTANBUL\nPenerbangan menuju Istanbul, Turki. Tiba dan transfer menuju hotel untuk istirahat.',
      'Hari 2 : ISTANBUL\nKunjungan ke Hagia Sophia, Blue Mosque (Sultan Ahmed Camii), dan Topkapi Palace.',
      'Hari 3 : ISTANBUL\nKunjungan ke Grand Bazaar, Basilica Cistern, dan Masjid Suleymaniye. Cruise di Selat Bosphorus.',
      'Hari 4 : ISTANBUL – KAIRO\nPenerbangan menuju Kairo, Mesir. Check-in hotel dan istirahat.',
      'Hari 5 : KAIRO\nKunjungan ke Piramida Giza, Sphinx, dan Museum Mesir.',
      'Hari 6 : KAIRO\nKunjungan ke Masjid Al-Azhar, Masjid Amr Ibn Al-Ash, dan Khan El-Khalili Bazaar.',
      'Hari 7 : KAIRO\nCity tour Kairo Islami: Benteng Salahuddin, Masjid Muhammad Ali, dan kawasan Al-Muizz.',
      'Hari 8 : KAIRO – JAKARTA\nFree program, belanja oleh-oleh, transfer ke bandara untuk penerbangan pulang.',
      'Hari 9 : TIBA DI JAKARTA\nTiba di Indonesia dengan kenangan dan wawasan yang tak terlupakan.',
    ],
    fasilitas: [
      'Tour Leader berpengalaman dari Indonesia',
      'Tiket Pesawat PP (Internasional & Antar Destinasi)',
      'Transportasi Bus ber AC di setiap destinasi',
      'Visa Turki & Mesir',
      'Akomodasi Hotel bintang 4–5 di semua destinasi',
      'Konsumsi 3x sehari (Fullboard)',
      'Tour Guide lokal berbahasa Indonesia',
      'Tiket masuk seluruh tempat wisata sesuai itinerary',
      'Asuransi Perjalanan',
      'Dokumentasi perjalanan profesional',
    ],
    persyaratan: [
      'Paspor asli dengan masa berlaku minimal 7 bulan',
      'Foto berwarna ukuran 4x6 (6 lembar) latar belakang putih',
      'Fotokopi KTP',
      'Mengisi formulir pendaftaran',
      'Membayar uang muka (DP) sesuai ketentuan',
    ],
    syaratKetentuan: [
      'Pembayaran DP minimal 30% dari total harga paket.',
      'Pelunasan dilakukan selambat-lambatnya 3 minggu sebelum keberangkatan.',
      'Pembatalan kurang dari 14 hari sebelum keberangkatan dikenakan biaya 50%.',
      'Pembatalan kurang dari 7 hari sebelum keberangkatan tidak dapat di-refund.',
      'Perubahan jadwal mengikuti ketersediaan seat maskapai.',
      'Harga dapat berubah sewaktu-waktu mengikuti kurs mata uang.',
    ],
  },
}

/* ═══════════════════════════════════════════════════════ */
/*  Card Grid Items (Front-facing cards)                  */
/* ═══════════════════════════════════════════════════════ */

const serviceItems = [
  {
    key: 'umroh',
    img: '/assets/img/gallery-umrah.png',
    label: 'UMROH',
    title: 'Umroh',
    subtitle: 'Paket Terjangkau · Jadwal Rutin · Fasilitas Lengkap',
    titleClass: 'font-display text-4xl sm:text-6xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
  {
    key: 'haji',
    img: '/assets/img/gallery-haji.png',
    label: 'HAJI',
    title: 'Paket Haji',
    subtitle: 'Haji Reguler & Plus · Pendampingan Penuh',
    titleClass: 'font-display text-4xl sm:text-5xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
  {
    key: 'tour-muslim',
    img: '/assets/img/gallery-istanbul.png',
    label: 'TOUR MUSLIM',
    title: 'Tour Muslim',
    subtitle: 'Istanbul · Kairo · Andalusia · Kota Bersejarah',
    titleClass: 'font-display text-4xl sm:text-5xl md:text-8xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300',
  },
]

/* ═══════════════════════════════════════════════════════ */
/*  Services Component                                    */
/* ═══════════════════════════════════════════════════════ */

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const modalRef = useRef(null)

  // Touch gesture states
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  // Detail toggle & accordion states
  const [showDetail, setShowDetail] = useState(false)
  const [openAccordions, setOpenAccordions] = useState({})

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
    if (isRightSwipe) closeModal()
  }

  const openModal = (key) => {
    const data = servicesData[key]
    if (!data) return

    setSelectedService(data)
    setIsModalOpen(true)
    setShowDetail(false)
    setOpenAccordions({})
    document.body.style.overflow = 'hidden'

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
      setShowDetail(false)
      setOpenAccordions({})
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

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  /* ─── Shared Modal Content Renderer ─── */
  const renderModalContent = () => {
    if (!selectedService) return null
    const s = selectedService

    return (
      <>
        {/* ── A. Category & Title ── */}
        <span className="text-accent tracking-[0.3em] uppercase text-xs md:text-sm font-bold block mb-3">
          {s.category}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
          {s.fullTitle}
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light border-l-2 border-accent pl-4 md:pl-6">
          {s.desc}
        </p>

        {/* ── B. Info Summary Box ── */}
        <div className="border border-white/15 rounded-xl p-5 sm:p-6 mb-6 bg-white/[0.03]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {/* Hotel Makkah / Istanbul */}
            <div>
              <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 font-semibold">
                Hotel {s.hotelLabels?.makkah || 'Makkah'}
              </p>
              <p className="text-white font-semibold text-xs sm:text-sm mb-1">
                <i className="fa-solid fa-hotel text-accent mr-1.5 text-[10px] sm:text-xs"></i>
                {s.hotelMakkah.nama}
              </p>
              <StarRating rating={s.hotelMakkah.bintang} />
            </div>

            {/* Hotel Madinah / Cairo */}
            <div>
              <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 font-semibold">
                Hotel {s.hotelLabels?.madinah || 'Madinah'}
              </p>
              <p className="text-white font-semibold text-xs sm:text-sm mb-1">
                <i className="fa-solid fa-hotel text-accent mr-1.5 text-[10px] sm:text-xs"></i>
                {s.hotelMadinah.nama}
              </p>
              <StarRating rating={s.hotelMadinah.bintang} />
            </div>

            {/* Jenis Paket */}
            <div>
              <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 font-semibold">
                Jenis Paket
              </p>
              <p className="text-white font-bold text-xs sm:text-sm">{s.jenisPaket}</p>
            </div>

            {/* Maskapai */}
            <div>
              <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 font-semibold">
                Maskapai
              </p>
              <p className="text-white font-semibold text-xs sm:text-sm">
                <i className="fa-solid fa-plane-departure text-accent mr-1.5 text-[10px] sm:text-xs"></i>
                {s.maskapai}
              </p>
            </div>
          </div>
        </div>

        {/* ── C. Detail Toggle Button ── */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="text-accent font-semibold text-sm hover:text-accent/80 transition-colors inline-flex items-center gap-2 hoverable"
          >
            <span className="underline underline-offset-4 decoration-accent/40">
              {showDetail ? 'Sembunyikan Informasi Detail' : 'Tampilkan Informasi Detail'}
            </span>
            <i
              className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${
                showDetail ? 'rotate-180' : ''
              }`}
            ></i>
          </button>
        </div>

        {/* ── Expanded Detail Content ── */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetail ? 'max-h-[3000px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'
          }`}
        >
          {/* Informasi Hotel */}
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
            <i className="fa-solid fa-bed text-accent mr-2"></i>Informasi Hotel
          </h4>

          {/* Hotel Card 1 */}
          <div className="border border-white/10 rounded-xl p-4 sm:p-5 mb-4 bg-white/[0.03] relative">
            <span className="absolute top-3 right-3 px-3 py-1 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
              {s.hotelLabels?.makkah || 'Makkah'}
            </span>
            <p className="text-white font-bold text-base mb-1">{s.hotelMakkah.nama}</p>
            <StarRating rating={s.hotelMakkah.bintang} />
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/10">
              <div>
                <p className="text-gray-500 text-xs mb-1">Check-In :</p>
                <p className="text-gray-400 text-sm">
                  <i className="fa-regular fa-calendar text-accent mr-1.5 text-xs"></i>—
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Check-Out :</p>
                <p className="text-gray-400 text-sm">
                  <i className="fa-regular fa-calendar text-accent mr-1.5 text-xs"></i>—
                </p>
              </div>
            </div>
          </div>

          {/* Hotel Card 2 */}
          <div className="border border-white/10 rounded-xl p-4 sm:p-5 mb-6 bg-white/[0.03] relative">
            <span className="absolute top-3 right-3 px-3 py-1 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
              {s.hotelLabels?.madinah || 'Madinah'}
            </span>
            <p className="text-white font-bold text-base mb-1">{s.hotelMadinah.nama}</p>
            <StarRating rating={s.hotelMadinah.bintang} />
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/10">
              <div>
                <p className="text-gray-500 text-xs mb-1">Check-In :</p>
                <p className="text-gray-400 text-sm">
                  <i className="fa-regular fa-calendar text-accent mr-1.5 text-xs"></i>—
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Check-Out :</p>
                <p className="text-gray-400 text-sm">
                  <i className="fa-regular fa-calendar text-accent mr-1.5 text-xs"></i>—
                </p>
              </div>
            </div>
          </div>

          {/* Informasi Pesawat */}
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
            <i className="fa-solid fa-plane text-accent mr-2"></i>Informasi Pesawat
          </h4>

          {/* Flight Card — Berangkat */}
          <div className="border border-white/10 rounded-xl p-4 sm:p-5 mb-4 bg-white/[0.03] relative">
            <span className="absolute top-3 right-3 px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Berangkat
            </span>
            <p className="text-accent font-bold text-sm sm:text-base mb-3">{s.maskapai}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-plane-departure text-gray-500 text-sm"></i>
                <div>
                  <p className="text-gray-400 text-sm">
                    <i className="fa-regular fa-calendar text-xs mr-1"></i>—
                  </p>
                  <p className="text-gray-500 text-xs">
                    <i className="fa-solid fa-location-dot text-xs mr-1"></i>{s.penerbangan.berangkat.dari}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-plane-arrival text-gray-500 text-sm"></i>
                <div>
                  <p className="text-gray-400 text-sm">
                    <i className="fa-regular fa-calendar text-xs mr-1"></i>—
                  </p>
                  <p className="text-gray-500 text-xs">
                    <i className="fa-solid fa-location-dot text-xs mr-1"></i>{s.penerbangan.berangkat.ke}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Card — Kembali */}
          <div className="border border-white/10 rounded-xl p-4 sm:p-5 bg-white/[0.03] relative">
            <span className="absolute top-3 right-3 px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Kembali
            </span>
            <p className="text-accent font-bold text-sm sm:text-base mb-3">{s.maskapai}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-plane-departure text-gray-500 text-sm"></i>
                <div>
                  <p className="text-gray-400 text-sm">
                    <i className="fa-regular fa-calendar text-xs mr-1"></i>—
                  </p>
                  <p className="text-gray-500 text-xs">
                    <i className="fa-solid fa-location-dot text-xs mr-1"></i>{s.penerbangan.kembali.dari}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-plane-arrival text-gray-500 text-sm"></i>
                <div>
                  <p className="text-gray-400 text-sm">
                    <i className="fa-regular fa-calendar text-xs mr-1"></i>—
                  </p>
                  <p className="text-gray-500 text-xs">
                    <i className="fa-solid fa-location-dot text-xs mr-1"></i>{s.penerbangan.kembali.ke}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── D. Accordion Sections ── */}
        <div className="mb-8">
          {/* Itinerary */}
          <AccordionItem
            title="Itinerary"
            isOpen={!!openAccordions['itinerary']}
            onToggle={() => toggleAccordion('itinerary')}
          >
            <div className="space-y-4">
              {s.itinerary.map((item, i) => {
                const parts = item.split('\n')
                const dayTitle = parts[0]
                const dayDesc = parts.slice(1).join(' ')
                return (
                  <div key={i} className="border-l-2 border-accent/30 pl-4">
                    <p className="text-white font-bold text-sm mb-1">{dayTitle}</p>
                    {dayDesc && (
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {dayDesc}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </AccordionItem>

          {/* Fasilitas */}
          <AccordionItem
            title="Fasilitas"
            isOpen={!!openAccordions['fasilitas']}
            onToggle={() => toggleAccordion('fasilitas')}
          >
            <div>
              <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">
                Harga Termasuk
              </p>
              <ul className="space-y-2.5">
                {s.fasilitas.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm">
                    <i className="fa-solid fa-check text-accent mt-0.5 mr-2.5 text-xs flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>

          {/* Persyaratan Peserta */}
          <AccordionItem
            title="Persyaratan Peserta"
            isOpen={!!openAccordions['persyaratan']}
            onToggle={() => toggleAccordion('persyaratan')}
          >
            <ul className="space-y-2.5">
              {s.persyaratan.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300 text-sm">
                  <i className="fa-solid fa-circle-check text-accent mt-0.5 mr-2.5 text-xs flex-shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionItem>

          {/* Syarat & Ketentuan */}
          <AccordionItem
            title="Syarat & Ketentuan"
            isOpen={!!openAccordions['syaratKetentuan']}
            onToggle={() => toggleAccordion('syaratKetentuan')}
          >
            <ol className="space-y-2.5">
              {s.syaratKetentuan.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300 text-sm">
                  <span className="text-accent font-bold mr-2.5 text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                    {i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </AccordionItem>
        </div>

        {/* ── E. WhatsApp CTA ── */}
        <a
          href={`https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(s.title)}`}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-dark font-sans font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full hover:bg-gold-light transition-all duration-300 hoverable"
        >
          <i className="fa-brands fa-whatsapp text-base sm:text-lg"></i>
          <span>Tanya via WhatsApp</span>
        </a>
      </>
    )
  }

  /* ═════════════════════════════════════════ */
  /*  Component Render                        */
  /* ═════════════════════════════════════════ */

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

      {/* ════════════════════════════════════════ */}
      {/*  Service Detail Modal                   */}
      {/* ════════════════════════════════════════ */}
      {isModalOpen && selectedService && (
        <div
          id="serviceModal"
          ref={modalRef}
          className="fixed inset-0 z-[99999] transition-opacity duration-500"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
            id="serviceModalBackdrop"
            onClick={closeModal}
          ></div>

          {/* Close button — below navbar on desktop, smaller */}
          <button
            className="fixed top-4 right-4 md:top-[5.5rem] md:right-6 z-[100000] w-10 h-10 md:w-11 md:h-11 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95 closeServiceModalBtn shadow-lg"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark text-base md:text-lg"></i>
          </button>

          {/* Mobile back button — fixed below navbar */}
          <button
            className="md:hidden fixed top-[4.5rem] left-4 z-[100000] w-10 h-10 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center active:scale-95 shadow-lg hover:bg-white/20 transition-all"
            onClick={closeModal}
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>

          {/* ── Mobile Layout — stacked, full scroll ── */}
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:hidden">
            <div className="min-h-full flex flex-col">
              <div className="w-full h-[35vh] relative shrink-0">
                <img
                  src={selectedService.img}
                  alt={selectedService.fullTitle}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
              </div>

              <div className="w-full p-6 sm:p-10 relative bg-dark">
                <div className="service-modal-content-anim translate-y-10 opacity-0 pt-4 pb-16">
                  {renderModalContent()}
                </div>
              </div>
            </div>
          </div>

          {/* ── Desktop Layout — fixed split pane, right scrolls ── */}
          <div className="hidden md:flex absolute inset-0 flex-row">
            {/* Left: fixed image */}
            <div className="w-1/2 h-full relative shrink-0">
              <img
                src={selectedService.img}
                alt={selectedService.fullTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right: scrollable content */}
            <div className="w-1/2 h-full overflow-y-auto bg-dark">
              <div className="p-10 lg:p-14 xl:p-16">
                <div className="max-w-xl service-modal-content-anim translate-y-10 opacity-0">
                  {renderModalContent()}
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
