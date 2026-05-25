import React from 'react'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 scale-110" id="hero-bg">
        <img
          src="/assets/img/hero-kaabah.png"
          alt="Masjidil Haram Makkah"
          className="w-full h-full object-cover opacity-50 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30"></div>
        {/* Gold top line accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <p className="font-sans text-accent tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 text-sm sm:text-base overflow-hidden">
          <span className="hero-anim block translate-y-full">Managed by PT. Amanah Safari Internasional</span>
        </p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-4 sm:mb-6">
          <div className="overflow-hidden">
            <span className="hero-anim block translate-y-full">DHIYAFAH</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-anim block translate-y-full text-outline-gold hover:text-white transition-colors duration-500">TOUR</span>
          </div>
        </h1>
        <p className="font-sans text-gray-300 max-w-xl mx-auto overflow-hidden text-sm sm:text-base px-4">
          <span className="hero-anim block translate-y-full delay-100">
            Perjalanan Suci Menuju Tanah Haram — Umrah, Haji &amp; Tour Muslim Terpercaya.
          </span>
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center overflow-hidden px-4">
          <span className="hero-anim block translate-y-full w-full sm:w-auto">
            <a
              href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20ingin%20mendaftar%20Umrah"
              target="_blank"
              rel="noopener"
              className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3 sm:py-4 bg-accent text-dark font-sans font-bold text-xs sm:text-sm uppercase tracking-widest overflow-hidden rounded-full hover:shadow-[0_0_30px_rgba(255,192,0,0.4)] transition-all duration-300 w-full sm:w-auto"
            >
              <i className="fa-brands fa-whatsapp text-base sm:text-lg"></i>
              <span className="relative z-10">Daftar Umrah Sekarang</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </span>
          <span className="hero-anim block translate-y-full w-full sm:w-auto">
            <a
              href="#services-section"
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3 sm:py-4 border border-white/30 text-white font-sans font-medium text-xs sm:text-sm uppercase tracking-widest rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              <span>Lihat Paket</span>
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="fa-solid fa-arrow-down text-white/40 text-sm"></i>
      </div>
    </section>
  )
}

export default Hero
