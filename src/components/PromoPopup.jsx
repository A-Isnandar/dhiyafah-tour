import React, { useState, useEffect } from 'react'

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [promoIndex, setPromoIndex] = useState(1)
  const [currentSrc, setCurrentSrc] = useState(null)

  useEffect(() => {
    // Cek apakah user sudah menghabiskan semua urutan promo di sesi ini
    if (sessionStorage.getItem('hasSeenAllPromos')) return

    const loadPromo = (index) => {
      const img = new window.Image()
      img.src = `/promo/promo${index}.jpg`
      
      img.onload = () => {
        setCurrentSrc(img.src)
        setTimeout(() => setIsOpen(true), index === 1 ? 2000 : 300)
      }
      
      img.onerror = () => {
        setIsOpen(false)
        sessionStorage.setItem('hasSeenAllPromos', 'true')
      }
    }

    loadPromo(promoIndex)
  }, [promoIndex])

  const handleNextPromo = () => {
    setIsOpen(false)
    setPromoIndex((prev) => prev + 1)
  }

  if (!isOpen || !currentSrc) return null

  const waMessage = encodeURIComponent("Assalamualaikum Dhiyafah Tour, saya tertarik dengan promo yang muncul di website. Boleh minta detail informasinya?")
  const waLink = `https://wa.me/6282176275013?text=${waMessage}`

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-500">
      {/* Backdrop Hitam Blur */}
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        onClick={handleNextPromo}
      ></div>

      {/* Kontainer Luar Utama */}
      <div className="relative z-10 max-w-[90vw] sm:max-w-sm mx-auto animate-fade-in-up flex flex-col items-center">
        
        {/* INNER WRAPPER: inline-block bikin boks ini menciut presisi hanya seukuran GAMBAR */}
        <div className="relative inline-block rounded-2xl border-4 border-white/20 bg-dark shadow-2xl group hover:border-accent/60 hover:scale-[1.01] transition-all duration-300">
          
          {/* Tombol Close (X) - Sekarang dijamin 100% nempel di pojok border gambar */}
          <button
            onClick={handleNextPromo}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 bg-accent text-dark border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark transition-all duration-300 shadow-xl z-20"
            title="Tutup Promo"
          >
            <i className="fa-solid fa-xmark text-sm sm:text-base"></i>
          </button>

          {/* Gambar Promo Link to WhatsApp */}
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden cursor-pointer relative"
            onClick={handleNextPromo}
          >
            <img 
              src={currentSrc} 
              alt={`Promo Dhiyafah ${promoIndex}`} 
              className="block w-full h-auto max-h-[60vh] sm:max-h-[68vh] object-contain mx-auto rounded-xl"
            />
            
            {/* Overlay Hover Effect */}
            <div className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-accent text-dark font-bold font-sans uppercase tracking-widest text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                <i className="fa-brands fa-whatsapp text-lg"></i> Klaim Promo
              </span>
            </div>
          </a>
        </div>

        {/* Teks Petunjuk Bawah (Dikeluarkan dari wrapper gambar agar tidak merusak border) */}
        <div className="text-center mt-4 w-full">
          <p className="text-white/70 text-xs sm:text-sm font-sans drop-shadow-md bg-dark/40 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5 whitespace-nowrap">
            Klik gambar untuk klaim promo via WhatsApp.
          </p>
        </div>

      </div>
    </div>
  )
}

export default PromoPopup