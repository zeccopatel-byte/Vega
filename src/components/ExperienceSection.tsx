import React, { useRef } from 'react';
import { useInView, motion } from 'motion/react';
import PhysicsTickets from './PhysicsTickets';


export default function ExperienceSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section ref={containerRef} className="bg-black text-[#f4ece0] font-sans relative flex flex-col items-center justify-start min-h-[90vh] overflow-hidden pt-24 pb-96">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl px-4"
      >
        <h2 className="text-[14vw] md:text-[11vw] font-black leading-[0.85] uppercase flex flex-col items-center select-none">
          <span className="scale-y-[1.25] tracking-tighter block text-white">UNLOCK</span>
          <span className="relative scale-y-[1.25] tracking-tighter block mt-4 md:mt-8 text-white">
             <span className="font-serif italic text-[#FFFAAa] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-[16vw] md:text-[13vw] z-10 scale-y-100 whitespace-nowrap lowercase font-medium tracking-normal">The</span>
             <span className="relative z-0">EXPERIENCE</span>
          </span>
        </h2>
        
        <p className="text-white uppercase tracking-widest text-xs md:text-sm mt-16 mb-12 font-bold z-10">
          EXPLORE AT YOUR OWN PACE
        </p>

        <button className="mb-32 relative w-[200px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02] z-10">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id={`explore-clip-experience`}>
                <path d="M 0 4 A 4 4 0 0 0 4 0 L 151 0 A 4 4 0 0 0 159 0 L 196 0 A 4 4 0 0 0 200 4 L 200 42 A 4 4 0 0 0 196 46 L 159 46 A 4 4 0 0 0 151 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
              </clipPath>
            </defs>
            <rect x="0" y="0" height="46" fill="white" className="w-0 group-hover:w-[200px] transition-all duration-300 ease-out" clipPath={`url(#explore-clip-experience)`} />
            <path d="M 0 4 
                     A 4 4 0 0 0 4 0 
                     L 151 0 
                     A 4 4 0 0 0 159 0 
                     L 196 0 
                     A 4 4 0 0 0 200 4 
                     L 200 42 
                     A 4 4 0 0 0 196 46 
                     L 159 46 
                     A 4 4 0 0 0 151 46 
                     L 4 46 
                     A 4 4 0 0 0 0 42 
                     Z" 
                  fill="transparent" stroke="white" strokeWidth="1" className="text-white group-hover:text-white transition-colors duration-300" />
            <line x1="155" y1="6" x2="155" y2="40" stroke="white" strokeWidth="1" strokeDasharray="3 3" className="text-white group-hover:text-white transition-colors duration-300" />
          </svg>
          <div className="absolute inset-0 flex text-white group-hover:text-black transition-colors duration-300">
            <div className="w-[155px] flex items-center justify-center text-[10px] tracking-[0.2em] font-bold uppercase pl-2">
              BOOK A CALL
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xl leading-none font-light mb-[2px]">→</span>
            </div>
          </div>
        </button>
      </motion.div>

      <PhysicsTickets />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-50" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />
    </section>
  )
}
