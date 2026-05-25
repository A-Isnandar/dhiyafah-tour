import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#030a18] py-16 sm:py-20 px-4 sm:px-6 border-t border-accent/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-0 mb-0">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Dhiyafah
              </h2>
              <img
                src="/icon.png"
                alt="Dhiyafah Tour Logo"
                className="logo-icon logo-icon-footer h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              PT. Dhiyafah Ar-Rihlah Internasional — Mitra perjalanan ibadah Anda yang amanah, profesional, dan terpercaya.
            </p>
            <p className="text-gray-600 text-xs font-sans mb-6">
              <i className="fa-solid fa-users text-accent/60 mr-2"></i>
              Managed by PT. Amanah Safari Internasional
            </p>
            {/* Social Media */}
            <div className="flex gap-4 text-xl flex-wrap text-white">
              <a
                href="https://www.instagram.com/dhiyafahtour.official"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent/50 transition-colors hoverable"
                aria-label="Instagram Dhiyafah Tour"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="https://www.tiktok.com/@dhiyafahtour"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent/50 transition-colors hoverable"
                aria-label="TikTok Dhiyafah Tour"
              >
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>
              <a
                href="https://wa.me/6282176275013"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-green-400 hover:border-green-400/50 transition-colors hoverable"
                aria-label="WhatsApp Dhiyafah Tour"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-sans font-bold text-white uppercase tracking-widest text-xs sm:text-sm mb-5 sm:mb-6">Navigasi</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li><a href="#home" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Beranda</a></li>
              <li><a href="#about-section" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Tentang Kami</a></li>
              <li><a href="#services-section" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Layanan</a></li>
              <li><a href="#howto-section" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Cara Pendaftaran</a></li>
              <li><a href="#testimonials-section" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Testimoni</a></li>
              <li><a href="#certifications-section" className="text-gray-500 hover:text-accent transition-colors text-sm hoverable">Sertifikasi</a></li>
            </ul>
          </div>

          {/* Layanan Column */}
          <div>
            <h3 className="font-sans font-bold text-white uppercase tracking-widest text-xs sm:text-sm mb-5 sm:mb-6">Layanan</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="fa-solid fa-kaaba text-accent/60 text-xs"></i>
                Umrah Reguler
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="fa-solid fa-plane text-accent/60 text-xs"></i>
                Umrah Plus (Turki, Aqsa)
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="fa-solid fa-mosque text-accent/60 text-xs"></i>
                Paket Haji Reguler &amp; Plus
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="fa-solid fa-globe text-accent/60 text-xs"></i>
                Tour Muslim Mancanegara
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-sans font-bold text-white uppercase tracking-widest text-xs sm:text-sm mb-5 sm:mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/6282176275013" target="_blank" rel="noopener" className="flex items-start gap-3 text-gray-500 hover:text-accent transition-colors group">
                  <i className="fa-brands fa-whatsapp mt-0.5 text-accent/60 group-hover:text-accent text-base flex-shrink-0"></i>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-600 mb-0.5">WhatsApp CS</p>
                    <p className="text-sm">0821-7627-5013</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/dhiyafahtour.official" target="_blank" rel="noopener" className="flex items-start gap-3 text-gray-500 hover:text-accent transition-colors group">
                  <i className="fa-brands fa-instagram mt-0.5 text-accent/60 group-hover:text-accent text-base flex-shrink-0"></i>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-600 mb-0.5">Instagram</p>
                    <p className="text-sm">@dhiyafahtour.official</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-500">
                  <i className="fa-solid fa-location-dot mt-0.5 text-accent/60 text-base flex-shrink-0"></i>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-600 mb-0.5">Kantor</p>
                    <p className="text-sm leading-relaxed">Bengkulu &amp; Tangerang</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-600 text-xs">
          <p>&copy; 2025 PT. Dhiyafah Ar-Rihlah Internasional. All Rights Reserved.</p>
          <p className="text-center sm:text-right">Managed by <span className="text-accent/70">PT. Amanah Safari Internasional</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
