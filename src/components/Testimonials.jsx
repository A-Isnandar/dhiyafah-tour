import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      text: '"Alhamdulillah, pengalaman umrah bersama Dhiyafah Tour sangat memuaskan. Mutawwif yang sabar, hotel dekat Masjidil Haram, dan pelayanan yang benar-benar amanah. Insyaallah akan umrah lagi bersama Dhiyafah!"',
      name: 'Ibu Sari Dewi',
      label: 'Umrah Reguler · Bengkulu, 2024',
      offsetClass: '',
    },
    {
      text: '"Kami sekeluarga umrah plus Turki bersama Dhiyafah Tour. Subhanallah, perjalanan yang luar biasa! Dari akomodasi, transportasi, hingga bimbingan ibadah semuanya terorganisir dengan sangat baik. Recommended banget!"',
      name: 'Bpk. H. Rahman',
      label: 'Umrah Plus Turki · Tangerang, 2024',
      offsetClass: 'sm:mt-0 lg:mt-12',
    },
    {
      text: '"Sudah dua kali berangkat haji bersama Dhiyafah Tour. Kepercayaan kami tidak pernah mengecewakan. Tim yang profesional, responsif, dan selalu siap membantu jamaah 24 jam. Jazakallahu khairan!"',
      name: 'Ibu Hj. Nurlaila',
      label: 'Paket Haji · Bengkulu, 2023',
      offsetClass: '',
    },
  ]

  return (
    <section id="testimonials-section" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#040c1e]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-accent tracking-widest uppercase text-xs sm:text-sm font-bold mb-3 block">Kata Mereka</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold">
              Testimoni <br /><span className="text-gray-600">Jamaah Kami</span>
            </h2>
          </div>
          <a
            href="https://wa.me/6282176275013"
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-sans"
          >
            Konsultasi Sekarang <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className={`news-card group cursor-pointer ${item.offsetClass}`}>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 text-accent text-sm mb-4">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                  {item.text}
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-lg sm:text-xl flex-shrink-0">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-sm">{item.name}</h4>
                    <span className="text-xs text-accent font-mono tracking-widest">{item.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
