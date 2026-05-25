import React from 'react'

const Preloader = () => {
  return (
    <div className="loader" id="loader">
      <div className="flex flex-col items-center justify-center text-center font-display font-bold">
        
        <div className="overflow-hidden mb-1">
          <span className="inline-block translate-y-full loader-text text-base md:text-xl text-accent tracking-[0.4em] uppercase font-sans font-medium">
            Selamat Datang di
          </span>
        </div>

        <div className="overflow-hidden">
          <h1 className="inline-block translate-y-full loader-text text-5xl md:text-7xl text-white tracking-tighter leading-none">
            DHIYAFAH <span className="text-accent">TOUR</span>
          </h1>
        </div>

        <div className="overflow-hidden mt-3">
          <span className="inline-block translate-y-full loader-text font-sans font-normal text-xs md:text-sm text-gray-300 tracking-widest uppercase">
            Umrah &nbsp;&middot;&nbsp; Haji &nbsp;&middot;&nbsp; Tour Muslim
          </span>
        </div>

      </div>

      <div className="w-48 h-[2px] bg-white/10 mt-8 overflow-hidden rounded-full">
        <div className="h-full bg-accent w-0 loader-bar shadow-[0_0_15px_rgba(255,192,0,0.7)]"></div>
      </div>
    </div>
  )
}

export default Preloader
