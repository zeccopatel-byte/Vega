import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "end 50%"]
  });

  // We'll split the text into words and animate opacity of each word
  const text = "Egnis is a creative media studio that turns ideas into clear, engaging video content. We help brands communicate with purpose through thoughtful editing, storytelling, and reliable collaboration from first draft to final delivery.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="bg-white text-black py-20 px-4 md:px-12 font-sans relative">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center border-b border-dashed border-black/20 pb-4 mb-16 text-[10px] uppercase tracking-widest font-semibold"
      >
        <div className="flex items-center gap-2">
          <div className="w-[2px] h-3 bg-black"></div>
          WHO WE ARE
        </div>
        <div>&copy;2026</div>
      </motion.div>

      {/* Main Statement - Scroll Highlight */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight flex flex-wrap gap-x-3 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
            )
          })}
        </h2>
      </div>

      {/* 3 Column Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-[1400px] mx-auto"
      >
        {/* Plus symbols top */}
        <div className="hidden md:flex absolute -top-8 left-0 right-0 justify-between text-black/50 text-xl font-light">
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        {/* Left Column */}
        <div className="flex flex-col justify-between pt-8">
          <div className="space-y-16">
            <div>
              <div className="text-5xl md:text-[80px] leading-none font-medium mb-2">8+</div>
              <div className="text-black/60 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl md:text-[80px] leading-none font-medium mb-2">230+</div>
              <div className="text-black/60 font-medium">Happy Clients</div>
            </div>
          </div>
          
          <button className="mt-24 md:mt-0 relative w-[200px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="more-about-clip">
                  <path d="M 0 4 A 4 4 0 0 0 4 0 L 151 0 A 4 4 0 0 0 159 0 L 196 0 A 4 4 0 0 0 200 4 L 200 42 A 4 4 0 0 0 196 46 L 159 46 A 4 4 0 0 0 151 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
                </clipPath>
              </defs>
              <rect x="0" y="0" height="46" fill="black" className="w-0 group-hover:w-[200px] transition-all duration-300 ease-out" clipPath="url(#more-about-clip)" />
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
                    fill="transparent" stroke="currentColor" strokeWidth="1" className="text-black/30 group-hover:text-black transition-colors duration-300" />
              <line x1="155" y1="6" x2="155" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-black/30 group-hover:text-black/80 transition-colors duration-300" />
            </svg>
            <div className="absolute inset-0 flex text-black group-hover:text-white transition-colors duration-300">
              <div className="w-[155px] flex items-center justify-center text-[10px] tracking-[0.2em] font-bold uppercase pl-2">
                MORE ABOUT US
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xl leading-none font-light mb-[2px]">→</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center Column - Image */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80" 
            alt="Winter landscape with car"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 text-white text-xl font-light leading-none">+</div>
          <div className="absolute bottom-6 right-6 text-white text-xl font-light leading-none">+</div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between pt-8">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 pb-12 border-b border-dashed border-black/20">
              <div className="text-sm font-semibold whitespace-nowrap min-w-[80px]">( Mission )</div>
              <div className="text-sm font-medium leading-relaxed">
                Our mission is to make high quality video content accessible for any brand by combining thoughtful storytelling, skilled production, and clear communication.
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-12 pb-12 border-b border-dashed border-black/20">
              <div className="text-sm font-semibold whitespace-nowrap min-w-[80px]">( Vision )</div>
              <div className="text-sm font-medium leading-relaxed">
                Our vision is to become a trusted global creative partner for brands, known for meaningful video work that informs, inspires, and connects.
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-12 pt-4">
              <div className="text-sm font-semibold whitespace-nowrap text-black/60 min-w-[80px]">Reputation</div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] bg-black/30 flex-1"></div>
                  <div className="text-sm font-medium text-black/60">Client Retention — 98%</div>
                </div>
                <div className="flex items-center justify-end text-sm font-medium">
                  Projects Delivered — 150
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const Word: React.FC<{ children: React.ReactNode, progress: any, range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}
