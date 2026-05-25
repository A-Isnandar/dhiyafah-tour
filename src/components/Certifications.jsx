import React from 'react'

const certifications = [
  {
    icon: 'fa-landmark',
    iconColorClass: 'bg-green-600/20 border-green-500/40 group-hover:bg-green-600/30',
    iconTextClass: 'text-green-400',
    title: 'Kemenag RI',
    desc: 'Kementerian Agama Republik Indonesia',
    extraClass: '',
  },
  {
    icon: 'fa-shield-halved',
    iconColorClass: 'bg-blue-600/20 border-blue-500/40 group-hover:bg-blue-600/30',
    iconTextClass: 'text-blue-400',
    title: 'SISKOPATUH',
    desc: 'Sistem Komputerisasi Penyelenggara Ibadah Umrah',
    extraClass: '',
  },
  {
    icon: 'fa-plane-circle-check',
    iconColorClass: 'bg-accent/20 border-accent/40 group-hover:bg-accent/30',
    iconTextClass: 'text-accent',
    title: 'IATA',
    desc: 'International Air Transport Association',
    extraClass: '',
  },
  {
    icon: 'fa-certificate',
    iconColorClass: 'bg-orange-600/20 border-orange-500/40 group-hover:bg-orange-600/30',
    iconTextClass: 'text-orange-400',
    title: 'SUCOFINDO',
    desc: 'Lembaga Inspeksi & Sertifikasi Resmi',
    extraClass: '',
  },
  {
    icon: 'fa-award',
    iconColorClass: 'bg-purple-600/20 border-purple-500/40 group-hover:bg-purple-600/30',
    iconTextClass: 'text-purple-400',
    title: 'KAN',
    desc: 'Komite Akreditasi Nasional',
    extraClass: 'sm:col-start-2 lg:col-start-auto',
  },
]

const Certifications = () => {
  return (
    <section id="certifications-section" className="py-20 sm:py-24 px-4 sm:px-6 bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-accent tracking-widest uppercase text-xs sm:text-sm font-bold mb-3 block">Kepercayaan &amp; Keamanan</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Legalitas &amp; <span className="text-accent">Sertifikasi</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Dhiyafah Tour terdaftar resmi dan beroperasi di bawah pengawasan lembaga-lembaga terpercaya Indonesia dan Internasional.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`cert-badge group p-5 sm:p-6 rounded-2xl border border-accent/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center gap-3 sm:gap-4 cursor-default ${cert.extraClass}`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-colors ${cert.iconColorClass}`}>
                <i className={`fa-solid ${cert.icon} ${cert.iconTextClass} text-xl sm:text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-sans font-bold text-white text-xs sm:text-sm mb-1">{cert.title}</h3>
                <p className="text-gray-500 text-[10px] sm:text-xs leading-snug">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-gray-500 text-xs sm:text-sm font-sans">
            <i className="fa-solid fa-circle-check text-accent mr-2"></i>
            Resmi terdaftar dan diawasi — Perjalanan ibadah Anda terjamin aman dan terpercaya.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Certifications
