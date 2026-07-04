import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'SARAH LEE',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    text: 'Egnis took our scattered footage and turned it into a clean, watchable video that captured our product\'s value. Communication was smooth, feedback loops were fast, and delivery was early, which helped our launch.',
  },
  {
    id: 2,
    name: 'JOHN PEREZ',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=150&q=80',
    text: 'We needed clear, compelling storytelling for a fairly complicated feature set, and Egnis delivered exactly that. From the very beginning, they took the time to understand our product, audience, and goals, then translated everything.',
  },
  {
    id: 3,
    name: 'EMILY CARTER',
    role: 'Event Coordinator',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    text: 'Egnis handled our event coverage from start to finish, including filming and editing. The recap video highlighted the energy and speaker moments perfectly and arrived ready for social platforms without extra work',
  },
  {
    id: 4,
    name: 'MICHAEL BROWN',
    role: 'Digital Strategist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    text: 'Their reel edits increased engagement across social channels. Egnis understood platform trends, added clean captions, and paced everything well. Performance improved within weeks.',
  },
  {
    id: 5,
    name: 'OLIVIA CHEN',
    role: 'Startup Founder',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    text: 'We came in with no video experience and Egnis made the entire process simple. Script support, voiceover direction, and editing were handled professionally. The final video boosted credibility during investor meetings.',
  }
];

const TestimonialCard: React.FC<{ testimonial: any, index: number, scrollYProgress: MotionValue<number>, total: number }> = ({ testimonial, index, scrollYProgress, total }) => {
  const [isMd, setIsMd] = useState(true);
  
  useEffect(() => {
    const checkMd = () => setIsMd(window.innerWidth >= 768);
    checkMd();
    window.addEventListener('resize', checkMd);
    return () => window.removeEventListener('resize', checkMd);
  }, []);

  const cardWidth = isMd ? 420 : 320;
  const gap = isMd ? 24 : 16; // tailwind gap-6 is 24px, gap-4 is 16px
  const stackedOffset = isMd ? 110 : 70;

  const initialPos = index * (cardWidth + gap);
  const stackedPos = index * stackedOffset;
  const maxScrollOffset = (total - 1) * (cardWidth + gap - stackedOffset);

  const x = useTransform(scrollYProgress, (progress: number) => {
    const scrollOffset = progress * maxScrollOffset;
    const currentPos = Math.max(initialPos - scrollOffset, stackedPos);
    return currentPos - initialPos;
  });

  return (
    <motion.div 
      style={isMd ? { x, zIndex: index } : {}}
      initial={!isMd ? { opacity: 0, y: 50 } : false}
      whileInView={!isMd ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#f4f4f4] rounded-xl p-6 md:p-10 w-full md:min-w-[420px] md:w-[420px] flex flex-col justify-between shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.05)] border border-black/5"
    >
      <div>
        <div className="flex justify-between items-start mb-8 md:mb-12">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover"
          />
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black drop-shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <p className="text-base md:text-lg leading-relaxed font-medium mb-12 text-black/90">
          {testimonial.text}
        </p>
      </div>

      <div>
        <div className="font-semibold text-sm md:text-base mb-1">{testimonial.name}</div>
        <div className="text-black/50 text-xs md:text-sm font-medium">{testimonial.role}</div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={targetRef} className="bg-white text-black font-sans relative md:h-[300vh]">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden py-20 px-4 md:px-12">
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center border-b border-dashed border-black/20 pb-4 mb-10 md:mb-16 text-[10px] uppercase tracking-widest font-semibold max-w-[1400px] w-full mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-3 bg-black"></div>
            TESTIMONIALS
          </div>
          <div>TRUSTED</div>
        </motion.div>

        <div className="max-w-[1400px] mx-auto w-full relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-6 md:w-max pb-8 relative">
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialCard 
                key={testimonial.id}
                index={idx}
                testimonial={testimonial}
                scrollYProgress={scrollYProgress}
                total={TESTIMONIALS.length}
              />
            ))}
          </div>
        </div>

        {/* Plus symbols bottom */}
        <div className="hidden md:flex absolute bottom-8 left-12 right-12 justify-between text-black/50 text-xl font-light pointer-events-none">
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
      </div>
    </section>
  );
}
