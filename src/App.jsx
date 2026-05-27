import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Vision from './components/Vision'
import About from './components/About'
import Services from './components/Services'
import Howto from './components/Howto'
import Testimonials from './components/Testimonials'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
// 1. IMPORT PROMO POPUP DI SINI
import PromoPopup from './components/PromoPopup'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Make lenis accessible globally for modal open/close
    window.__lenis = lenis

    // 2. Custom Cursor Logic
    const cursor = cursorRef.current
    const hoverables = document.querySelectorAll('.hoverable')

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', handleMouseMove)

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovered'))
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovered'))
    })

    // 3. GSAP Animations
    const ctx = gsap.context(() => {
      // Loader Animation
      const loaderTimeline = gsap.timeline()
      loaderTimeline
        .to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
        .to(
          '.loader-text',
          { y: 0, duration: 1, stagger: 0.1, ease: 'power4.out' },
          '-=1'
        )
        .to('.loader', { y: '-100%', duration: 1, ease: 'power4.inOut', delay: 0.5 })

      // Hero Animations
      const heroTimeline = gsap.timeline({ delay: 3 })
      heroTimeline.to('.hero-anim', {
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
      })

      // Parallax Effect for Hero
      gsap.to('#hero-bg', {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        scale: 1.2,
      })

      // Vision Quote Reveal (Quote is split in Vision.jsx)
      gsap.to('.quote-word', {
        scrollTrigger: {
          trigger: '#vision-section',
          start: 'top 70%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.to('#vision-image', {
        scrollTrigger: {
          trigger: '#vision-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        scale: 1,
      })

      // Howto Timeline Animation
      gsap.to('#ppdbProgressLine', {
        scrollTrigger: {
          trigger: '#howto-section',
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: 1.5,
        },
        height: '100%',
        ease: 'none',
      })

      const ppdbSteps = gsap.utils.toArray('.ppdb-step')
      ppdbSteps.forEach((step, index) => {
        const xOffset = window.innerWidth > 768 ? (index % 2 === 0 ? -50 : 50) : 0
        const yOffset = window.innerWidth > 768 ? 0 : 50

        gsap.from(step.querySelector('.ppdb-card'), {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: xOffset,
          y: yOffset,
          duration: 0.8,
          ease: 'power3.out',
        })

        const bigNumber = step.querySelector('.font-display.text-7xl, .font-display.text-8xl')
        if (bigNumber) {
          gsap.from(bigNumber, {
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
            },
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'back.out(1.7)',
          })
        }
      })

      // Testimonials Stagger Animation
      gsap.from('.news-card', {
        scrollTrigger: {
          trigger: '#testimonials-section',
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
      })

      // Certifications Badges Animation
      gsap.fromTo(
        '.cert-badge',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#certifications-section',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )

      // Stats Counter Animation
      const counters = gsap.utils.toArray('.counter')
      counters.forEach((counter) => {
        const rawTarget = +counter.getAttribute('data-target')
        const isDecimal = counter.getAttribute('data-decimal') === 'true'
        const target = isDecimal ? rawTarget / 10 : rawTarget
        const obj = { val: 0 }

        gsap.to(obj, {
          box: target,
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#statsSection',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (isDecimal) {
              counter.innerText = obj.val.toFixed(1)
            } else {
              counter.innerText = Math.ceil(obj.val).toLocaleString('id-ID')
            }
          },
        })
      })
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      lenis.destroy()
      ctx.revert() // Reverts all GSAP animations inside context (fixes StrictMode bug)
    }
  }, [])

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="cursor" id="cursor" ref={cursorRef}></div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6282176275013?text=Assalamualaikum,%20saya%20ingin%20konsultasi%20paket%20Umrah/Haji%20Dhiyafah%20Tour"
        target="_blank"
        rel="noopener"
        className="wa-floating-btn fixed bottom-6 right-6 z-[9990] w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
      </a>

      <Preloader />
      <Navbar />

      <main>
        <Hero />
        <Vision />
        <About />
        <Services />
        <Howto />
        <Testimonials />
        <Certifications />
        <Footer />
      </main>

      {/* 2. PANGGIL DI SINI AGAR LAYER POP-UP PROMO DI PALING ATAS */}
      <PromoPopup />
    </>
  )
}

export default App