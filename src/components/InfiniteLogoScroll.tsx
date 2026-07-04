import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const LOGOS = [
  "Vogue",
  "Forbes",
  "Wired",
  "GQ",
  "Hypebeast",
  "Dazed",
  "i-D",
  "Complex",
  "Highsnobiety",
  "Kinfolk"
];

export default function InfiniteLogoScroll() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-transparent text-black py-16 overflow-hidden relative"
    >
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-fit">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
          className="flex whitespace-nowrap"
        >
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32">
            {LOGOS.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex items-center justify-center min-w-fit">
                <span className="font-serif italic text-3xl md:text-5xl opacity-50 hover:opacity-100 transition-opacity cursor-default">{logo}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32">
            {LOGOS.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex items-center justify-center min-w-fit">
                <span className="font-serif italic text-3xl md:text-5xl opacity-50 hover:opacity-100 transition-opacity cursor-default">{logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
