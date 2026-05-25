import React from 'react'

const Howto = () => {
  const steps = [
    {
      icon: 'fa-comments',
      title: 'Konsultasi & Pilih Paket',
      desc: 'Hubungi tim CS kami via WhatsApp atau datang langsung ke kantor. Konsultasikan kebutuhan dan pilih paket yang paling sesuai.',
      number: '01',
      position: 'left',
    },
    {
      icon: 'fa-file-circle-check',
      title: 'Pelunasan & Pendaftaran Resmi',
      desc: 'Lakukan pembayaran DP atau pelunasan dan serahkan dokumen (paspor, foto, KK) kepada tim kami untuk proses resmi.',
      number: '02',
      position: 'right',
    },
    {
      icon: 'fa-person-praying',
      title: 'Manasik & Persiapan',
      desc: 'Ikuti bimbingan manasik intensif bersama mutawwif berpengalaman, persiapkan fisik & mental untuk ibadah yang optimal.',
      number: '03',
      position: 'left',
    },
    {
      icon: 'fa-plane-departure',
      title: 'Keberangkatan & Pendampingan',
      desc: 'Berangkat bersama rombongan dengan pendampingan mutawwif & tim Dhiyafah Tour hingga kembali ke tanah air.',
      number: '04',
      position: 'right',
    },
  ]

  return (
    <section id="howto-section" className="py-24 sm:py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-24 relative z-10">
        <span className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 block">
          Bergabung Bersama Kami
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
          Alur <span className="text-white">Pendaftaran</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
          Empat langkah mudah untuk memulai perjalanan ibadah impian Anda bersama Dhiyafah Tour.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {/* Timeline background line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 md:translate-x-[-50%]"></div>

        {/* Animated progress line */}
        <div
          className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent via-yellow-400 to-accent/30 -translate-x-1/2 md:translate-x-[-50%] origin-top h-0"
          id="ppdbProgressLine"
        ></div>

        <div className="space-y-10 sm:space-y-12 md:space-y-0 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="ppdb-step relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center group"
            >
              {step.position === 'left' ? (
                <>
                  {/* Card on left */}
                  <div className="pl-10 sm:pl-12 md:pl-0 md:pr-16 md:text-right order-1">
                    <div className="ppdb-card p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-accent/40 transition-all duration-500 group-hover:-translate-y-2">
                      <div className="text-accent text-3xl sm:text-4xl mb-3 sm:mb-4 md:flex md:justify-end">
                        <i className={`fa-solid ${step.icon}`}></i>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-dark border-2 border-gray-600 -translate-x-1/2 group-hover:border-accent group-hover:scale-125 transition-all duration-500 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                  {/* Number on right */}
                  <div className="hidden md:block order-2">
                    <span className="font-display text-7xl sm:text-8xl font-bold text-white/5 absolute top-1/2 left-1/2 translate-x-4 -translate-y-1/2 select-none">
                      {step.number}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Number on left */}
                  <div className="hidden md:block order-1 text-right relative">
                    <span className="font-display text-7xl sm:text-8xl font-bold text-white/5 absolute top-1/2 right-1/2 -translate-x-4 -translate-y-1/2 select-none">
                      {step.number}
                    </span>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-dark border-2 border-gray-600 -translate-x-1/2 group-hover:border-accent group-hover:scale-125 transition-all duration-500 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                  {/* Card on right */}
                  <div className="pl-10 sm:pl-12 md:pl-16 order-2">
                    <div className="ppdb-card p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-accent/40 transition-all duration-500 group-hover:-translate-y-2">
                      <div className="text-accent text-3xl sm:text-4xl mb-3 sm:mb-4">
                        <i className={`fa-solid ${step.icon}`}></i>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 text-center">
          <a
            href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20ingin%20mendaftar%20Umrah/Haji%20Dhiyafah%20Tour"
            target="_blank"
            rel="noopener"
            className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 py-4 sm:py-5 bg-accent text-dark font-bold uppercase tracking-widest overflow-hidden rounded-full hover:shadow-[0_0_40px_rgba(255,192,0,0.4)] transition-all duration-300 text-xs sm:text-sm"
          >
            <i className="fa-brands fa-whatsapp text-lg sm:text-xl relative z-10"></i>
            <span className="relative z-10">Daftar Sekarang via WhatsApp</span>
            <i className="fa-solid fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Howto
