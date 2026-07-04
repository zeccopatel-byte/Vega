import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const SERVICES = [
  {
    id: '01',
    title: 'VIDEO EDITING',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    desc: 'We assemble and polish raw footage into smooth narratives with proper pacing, color, sound, and graphics so your message feels professional, clear, engaging, and easy.'
  },
  {
    id: '02',
    title: 'VOICE OVER & SUBTITLE',
    image: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&w=600&q=80',
    desc: 'Professional voiceovers and accurate subtitling to make your content accessible and engaging to a global audience.'
  },
  {
    id: '03',
    title: 'SOCIAL MEDIA REEL EDITING',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
    desc: 'Bite-sized, high-retention edits optimized for TikTok, Instagram Reels, and YouTube Shorts to maximize your reach.'
  },
  {
    id: '04',
    title: 'SCRIPT WRITING TO VIDEO',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    desc: 'From concept to final cut, we craft compelling scripts and bring them to life with stunning visuals and storytelling.'
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isMd, setIsMd] = useState(true);

  useEffect(() => {
    const checkMd = () => setIsMd(window.innerWidth >= 768);
    checkMd();
    window.addEventListener('resize', checkMd);
    return () => window.removeEventListener('resize', checkMd);
  }, []);

  const getAlignment = (idx: number) => {
    if (idx === 1) return 'text-center';
    if (idx === 2) return 'text-right';
    return 'text-left';
  };

  return (
    <section ref={containerRef} className="bg-black text-white py-20 px-4 md:px-12 font-sans relative">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center border-b border-dashed border-white/20 pb-4 mb-16 text-[10px] uppercase tracking-widest font-semibold text-white/50"
      >
        <div className="flex items-center gap-2">
          <div className="w-[2px] h-3 bg-white/50"></div>
          SERVICES
        </div>
        <div>CAPABILITIES</div>
      </motion.div>

      {/* Main Statement & CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24 max-w-[1400px] mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight max-w-2xl">
          Creative services that transform ideas into engaging videos for marketing
        </h2>
        
        <button className="relative w-[180px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 180 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="contact-us-clip">
                <path d="M 0 4 A 4 4 0 0 0 4 0 L 131 0 A 4 4 0 0 0 139 0 L 176 0 A 4 4 0 0 0 180 4 L 180 42 A 4 4 0 0 0 176 46 L 139 46 A 4 4 0 0 0 131 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
              </clipPath>
            </defs>
            <rect x="0" y="0" height="46" fill="white" className="w-0 group-hover:w-[180px] transition-all duration-300 ease-out" clipPath="url(#contact-us-clip)" />
            <path d="M 0 4 
                     A 4 4 0 0 0 4 0 
                     L 131 0 
                     A 4 4 0 0 0 139 0 
                     L 176 0 
                     A 4 4 0 0 0 180 4 
                     L 180 42 
                     A 4 4 0 0 0 176 46 
                     L 139 46 
                     A 4 4 0 0 0 131 46 
                     L 4 46 
                     A 4 4 0 0 0 0 42 
                     Z" 
                  fill="transparent" stroke="currentColor" strokeWidth="1" className="text-white/20 group-hover:text-white transition-colors duration-300" />
            <line x1="135" y1="6" x2="135" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-white/20 group-hover:text-white/80 transition-colors duration-300" />
          </svg>
          <div className="absolute inset-0 flex text-white group-hover:text-black transition-colors duration-300">
            <div className="w-[135px] flex items-center justify-center text-[10px] tracking-[0.2em] font-bold uppercase pl-2">
              CONTACT US
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xl leading-none font-light mb-[2px]">→</span>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Services List */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative max-w-[1400px] mx-auto"
      >
        {/* Plus symbols top */}
        <div className="hidden md:flex absolute -top-8 left-0 right-0 justify-between text-white/50 text-xl font-light">
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        <div className="flex flex-col gap-4 md:gap-0">
          {SERVICES.map((service, idx) => {
            const isActive = !isMd || idx === activeIndex;
            return (
              <div 
                key={service.id}
                className={`group ${isMd ? 'cursor-pointer' : ''}`}
                onClick={() => isMd && setActiveIndex(idx)}
              >
                <motion.div 
                  layout
                  className={`flex flex-col md:flex-row items-center gap-8 py-10 md:py-16 px-4 md:px-8 border-dashed transition-all duration-500
                    ${isActive ? 'border border-white/20 rounded-[2rem]' : `border-t ${idx === activeIndex + 1 ? 'border-transparent' : 'border-white/20'} border-x-transparent border-b-transparent`}
                  `}
                >
                  <div className="w-full md:w-32 text-xl font-mono text-white/70">
                    ( {service.id} )
                  </div>
                  
                  <motion.div 
                    layout
                    className={`flex-1 text-3xl md:text-5xl font-medium tracking-tight whitespace-pre-line w-full
                      ${isActive ? 'text-left' : getAlignment(idx)}
                    `}
                  >
                    {service.title}
                  </motion.div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col md:flex-row gap-12 items-start ml-auto shrink-0"
                      >
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full md:w-[220px] h-[160px] object-cover rounded-2xl"
                        />
                        <div className="w-full md:w-[220px] flex flex-col gap-6 pt-2">
                          <div className="text-white/50 text-xs">Desc</div>
                          <p className="text-sm leading-relaxed text-white/90">
                            {service.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
          
          <div className="border-t border-dashed border-white/20 w-full"></div>
        </div>

        {/* Plus symbols bottom */}
        <div className="hidden md:flex absolute -bottom-8 left-0 right-0 justify-between text-white/50 text-xl font-light">
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
      </motion.div>
    </section>
  );
}
