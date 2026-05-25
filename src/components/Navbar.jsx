import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setThemeState] = useState('dark')
  const navRef = useRef(null)
  const mobileLinksRef = useRef([])
  const menuIconRef = useRef(null)

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
      applyTheme('light')
    } else {
      applyTheme('dark')
    }
  }, [])

  const applyTheme = (mode) => {
    const html = document.documentElement
    if (mode === 'light') {
      html.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      html.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    }
    setThemeState(mode)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
  }

  // Scroll tracking for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)

    if (newState) {
      // Open menu
      gsap.to(mobileLinksRef.current, {
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power4.out',
      })
    } else {
      // Close menu
      gsap.to(mobileLinksRef.current, { y: '100%', duration: 0.1 })
    }
  }

  const handleMobileLinkClick = () => {
    if (isMenuOpen) {
      toggleMobileMenu()
    }
  }

  // Build nav classes dynamically
  const navClasses = [
    'fixed w-full top-0 z-50 px-4 sm:px-6 transition-all duration-300 text-white',
    isScrolled ? 'nav-scrolled py-2' : 'py-4',
    !isScrolled && !isMenuOpen ? 'mix-blend-difference' : '',
  ].filter(Boolean).join(' ')

  // Mobile menu classes
  const mobileMenuClasses = [
    'fixed inset-0 bg-dark z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col items-center justify-center',
    isMenuOpen ? '' : 'translate-x-full',
  ].filter(Boolean).join(' ')

  const mobileLinks = [
    { href: '#home', text: 'Beranda' },
    { href: '#about-section', text: 'Tentang' },
    { href: '#services-section', text: 'Layanan' },
    { href: '#howto-section', text: 'Pendaftaran' },
    { href: '#testimonials-section', text: 'Testimoni' },
  ]

  return (
    <>
      <nav ref={navRef} className={navClasses}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#"
            className="font-display font-bold text-xl md:text-2xl tracking-tight hoverable flex items-center gap-0 sm:gap-0"
            data-cursor="hover"
          >
            <span className="text-white">Dhiyafah</span>
            <img
              src="/icon.png"
              alt="Dhiyafah Tour Logo"
              className="logo-icon h-9 sm:h-10 md:h-11 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="flex gap-5 lg:gap-8 font-sans text-xs lg:text-sm tracking-widest uppercase">
              <a href="#home" className="nav-link relative hoverable">Beranda</a>
              <a href="#about-section" className="nav-link relative hoverable">Tentang</a>
              <a href="#services-section" className="nav-link relative hoverable">Layanan</a>
              <a href="#howto-section" className="nav-link relative hoverable">Pendaftaran</a>
              <a href="#testimonials-section" className="nav-link relative hoverable">Testimoni</a>
            </div>

            <div className="w-[1px] h-4 bg-white/20"></div>

            <button
              className="theme-toggle hoverable text-xl transition-transform hover:rotate-12 active:scale-90"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              <i className={`fa-solid fa-sun ${theme === 'dark' ? 'hidden' : ''} dark-icon text-yellow-400`}></i>
              <i className={`fa-solid fa-moon ${theme === 'light' ? 'hidden' : ''} light-icon`}></i>
            </button>

            <a
              href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20ingin%20konsultasi%20paket%20Umrah/Haji"
              target="_blank"
              rel="noopener"
              className="hoverable inline-flex items-center gap-2 px-4 py-2 bg-accent text-dark font-sans font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-gold-light transition-all duration-300 active:scale-95"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>Konsultasi</span>
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4 sm:gap-6">
            <button
              className="theme-toggle hoverable text-xl transition-transform active:scale-90"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              <i className={`fa-solid fa-sun ${theme === 'dark' ? 'hidden' : ''} dark-icon text-yellow-400`}></i>
              <i className={`fa-solid fa-moon ${theme === 'light' ? 'hidden' : ''} light-icon`}></i>
            </button>

            <button
              className="text-2xl hoverable z-50 relative w-8 h-8 flex items-center justify-center"
              id="menuToggle"
              onClick={toggleMobileMenu}
            >
              <i
                ref={menuIconRef}
                className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} transition-transform duration-300`}
                style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      <div className={mobileMenuClasses} id="mobileMenu">
        <div className="flex flex-col gap-6 text-center font-display text-4xl sm:text-5xl font-bold">
          {mobileLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link overflow-hidden block"
              onClick={handleMobileLinkClick}
            >
              <span
                ref={(el) => (mobileLinksRef.current[index] = el)}
                className="block translate-y-full"
              >
                {link.text}
              </span>
            </a>
          ))}
        </div>
        <a
          href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20ingin%20konsultasi%20paket%20Umrah/Haji"
          target="_blank"
          rel="noopener"
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-sans font-semibold text-sm tracking-widest uppercase rounded-full"
        >
          <i className="fa-brands fa-whatsapp"></i>
          <span>Konsultasi via WhatsApp</span>
        </a>
      </div>
    </>
  )
}

export default Navbar
