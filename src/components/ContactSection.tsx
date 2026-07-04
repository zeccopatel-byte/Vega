import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMd, setIsMd] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMd = () => setIsMd(window.innerWidth >= 768);
    checkMd();
    window.addEventListener('resize', checkMd);
    return () => window.removeEventListener('resize', checkMd);
  }, []);

  const rows = isMd ? 6 : 5;
  const cols = isMd ? 13 : 3;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const dogs = containerRef.current.querySelectorAll('.dog-icon');
    dogs.forEach((dog) => {
      const rect = dog.getBoundingClientRect();
      const dogX = rect.left + rect.width / 2;
      const dogY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - dogY, e.clientX - dogX) * (180 / Math.PI);
      // Adding 90 degrees assuming top of dog should point to cursor
      (dog as HTMLElement).style.transform = `rotate(${angle + 90}deg)`;
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!containerRef.current) return;
    const dogs = containerRef.current.querySelectorAll('.dog-icon');
    dogs.forEach((dog) => {
      (dog as HTMLElement).style.transform = `rotate(0deg)`;
    });
  };
  
  return (
    <section className="bg-white text-black font-sans relative flex flex-col pt-20">
      <div 
        ref={containerRef}
        className="w-full h-[60vh] min-h-[500px] md:min-h-[700px] bg-black relative overflow-hidden flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-10" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
          />
          {/* Grid of Dogs */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-evenly py-8 px-4 md:px-8">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-between items-center w-full">
                {Array.from({ length: cols }).map((_, colIndex) => {
                  let isCenter = false;
                  if (isMd && rowIndex >= 1 && rowIndex <= 4 && colIndex >= 5 && colIndex <= 7) isCenter = true;
                  
                  return (
                    <div key={colIndex} className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                      {!isCenter && (
                          <img 
                            src="/Dog.png" 
                            alt="Dog" 
                            className="dog-icon w-[85%] h-[85%] md:w-[95%] md:h-[95%] object-contain transition-transform duration-75"
                          />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Center Logo */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex relative z-20 w-[240px] h-[240px] md:w-[320px] md:h-[320px] items-center justify-center transition-transform duration-700 hover:scale-105"
          >
            <img 
              src="/Video.png" 
              alt="Video" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
    </section>
  );
}
