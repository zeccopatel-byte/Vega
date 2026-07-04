import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Linkedin, X, Facebook, Instagram } from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: "001",
    title: "Research",
    desc: "Exploring insights through structured analysis and clear intention. Fuel uncovers patterns and direction, creating a grounded foundation that shapes purposeful design decisions.",
    includes: [
      "Market discovery & visual mapping",
      "Brand positioning review",
      "Dedicated creative, 20 hrs weekly"
    ]
  },
  {
    num: "002",
    title: "Experiment",
    desc: "Translating ideas into visual concepts with clarity, balance, and exploration. Fuel moves beyond predictable form, crafting variations that reveal new creative possibilities.",
    includes: [
      "Concept sketches & directions",
      "Visual style development",
      "Dedicated creative, 20 hrs weekly"
    ]
  },
  {
    num: "003",
    title: "Refinement",
    desc: "Polishing every detail with precision and structure. Fuel refines layout, tone, and expression, delivering a cohesive system shaped for clarity and long-term impact.",
    includes: [
      "Final design adjustments",
      "System-wide consistency check",
      "Dedicated creative, 20 hrs weekly"
    ]
  }
];

const TEAM = [
  {
    id: 1,
    name: "Oleksandra Prokofieva",
    role: "UI & UX Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    bio: "A small studio with highly talented, top-notch designers and professionals.",
    smallText: "Bringing curious\nenergy\nthoughtful design",
    quote: "Our big dream is to make Kyiv the world capital of design. We believe in that. We love that.",
    time: "1h"
  },
  {
    id: 2,
    name: "Aksel Ceylan",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    bio: "Leading creative vision and pushing boundaries in digital storytelling.",
    smallText: "Crafting visually\nstunning\nexperiences",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    time: "3h"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    bio: "Animating ideas and breathing life into static concepts globally.",
    smallText: "Motion is the\nlanguage of\nintuition",
    quote: "Every frame is a new opportunity to tell a compelling story and engage the viewer.",
    time: "5h"
  },
  {
    id: 4,
    name: "James Gordon",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    bio: "Building robust, scalable applications from end to end.",
    smallText: "Engineering\nExcellence\nReliability",
    quote: "Code is like humor. When you have to explain it, it's bad.",
    time: "8h"
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    bio: "Orchestrating teams and delivering projects on time with high quality.",
    smallText: "Strategic\nPlanning\nExecution",
    quote: "Good project management is about making the impossible look easy.",
    time: "1d"
  }
];

const variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    x: direction > 0 ? '50%' : '-50%',
    z: -250,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    x: 0,
    z: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    x: direction > 0 ? '-50%' : '50%',
    z: -250,
    opacity: 0,
    zIndex: 0,
  })
};

const Particles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white/40"
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
        }}
      />
    ))}
    <style>{`
      @keyframes twinkle {
        0% { opacity: 0.1; transform: scale(0.8); }
        100% { opacity: 0.8; transform: scale(1.5); }
      }
    `}</style>
  </div>
);

export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const processContainerRef = useRef<HTMLElement>(null);
  const processTextRef = useRef<HTMLHeadingElement>(null);
  const isProcessInView = useInView(processContainerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: processTextRef,
    offset: ["start 80%", "end 50%"]
  });

  const processText = "Design-driven expression blends structured clarity and modern 3D visual systems with Swiss digital ideas, shaped by aesthetics & Fuel®.";
  const processWords = processText.split(" ");


  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TEAM.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TEAM.length) % TEAM.length);
  };

  useEffect(() => {
    const timer = setTimeout(handleNext, 6000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col relative">
      <Particles />

      {/* Top Left Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-auto mix-blend-difference"
      >
        <Link to="/">
          <img src="/Vega.svg" alt="Vega Logo" className="h-6 md:h-8 brightness-0 invert hover:opacity-70 transition-opacity" />
        </Link>
      </motion.div>

      {/* Ticket Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex flex-col items-end drop-shadow-2xl"
      >
        <div className="flex h-[48px] w-[48px] md:h-[100px] md:w-auto md:ticket-mask overflow-hidden md:overflow-visible">
        {/* Left Ticket - Text */}
        <div className="hidden md:flex bg-white text-black flex-col justify-center py-2 transition-all w-full min-w-[120px] relative">
          <div className={`flex items-center justify-center h-full hover:opacity-70 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <span className="font-bold tracking-widest uppercase text-sm md:text-base">Menu</span>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <span className="font-bold tracking-widest uppercase text-sm md:text-base">Menu</span>
          </div>
        </div>

        {/* Right Ticket - Hamburger */}
        <div className="bg-white text-black flex items-center justify-center w-[48px] h-[48px] md:w-auto md:h-auto md:px-8 md:border-l border-dashed border-black/30 md:py-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div 
            className="flex flex-col justify-center items-center gap-[4px] md:gap-1.5 hover:opacity-70 transition-opacity w-6 h-6 md:w-8 md:h-8 relative"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 md:w-8 md:h-8 absolute inset-0 m-auto" strokeWidth={1.5} />
            ) : (
              <>
                <div className="w-5 md:w-8 h-[2px] md:h-[3px] bg-black"></div>
                <div className="w-5 md:w-8 h-[2px] md:h-[3px] bg-black"></div>
                <div className="w-5 md:w-8 h-[2px] md:h-[3px] bg-black"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-[-8px] w-[260px] md:w-full bg-white text-black z-40 relative flex flex-col"
            style={{
              WebkitMaskImage: `
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16'%3E%3Cmask id='m'%3E%3Crect width='20' height='16' fill='white'/%3E%3Crect x='7' y='4' width='6' height='8' rx='1.5' fill='black'/%3E%3C/mask%3E%3Crect width='20' height='16' fill='black' mask='url(%23m)'/%3E%3C/svg%3E"),
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16'%3E%3Cmask id='m'%3E%3Crect width='20' height='16' fill='white'/%3E%3Crect x='7' y='4' width='6' height='8' rx='1.5' fill='black'/%3E%3C/mask%3E%3Crect width='20' height='16' fill='black' mask='url(%23m)'/%3E%3C/svg%3E"),
                linear-gradient(black, black)
              `,
              WebkitMaskSize: '20px 16px, 20px 16px, 100% calc(100% - 32px)',
              WebkitMaskPosition: 'top left, bottom left, center',
              WebkitMaskRepeat: 'repeat-x, repeat-x, no-repeat',
            }}
          >
            <div className="border-t border-dashed border-black/30 w-full pt-10 pb-6 px-8 flex flex-col gap-4">
              {[
                { num: '01', label: 'HOME', to: '/' },
                { num: '02', label: 'WORKS', to: '#' },
                { num: '03', label: 'BOOK', to: '#' },
                { num: '04', label: 'TEAM', to: '/team' },
              ].map((item) => (
                <Link to={item.to} key={item.num} className="flex items-baseline gap-4 cursor-pointer hover:opacity-60 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                  <span className="text-[10px] font-mono text-black/40">{item.num}</span>
                  <span className="text-3xl font-bold tracking-tighter uppercase">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-dashed border-black/30 w-full py-6 px-8 flex justify-between text-[9px] font-bold tracking-widest uppercase text-black/60">
              <span className="cursor-pointer hover:text-black">COOKIE</span>
              <span className="cursor-pointer hover:text-black">TERMS</span>
              <span className="cursor-pointer hover:text-black">PRIVACY</span>
            </div>

            <div className="border-t border-dashed border-black/30 w-full py-6 px-8 flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-60" />
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-60" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-60" />
            </div>

            <div className="border-t border-dashed border-black/30 w-full py-6 px-8 text-[9px] font-bold tracking-widest uppercase text-black/40">
              ©2024. VEGA FOUNDATION.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

      {/* Hero Section */}
      <section className="relative h-[100dvh] bg-black text-white font-sans flex flex-col justify-center items-center overflow-hidden z-10">
        {/* Blurred background image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[40px] scale-110 opacity-70"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2800')` }}
        />
        
        <div className="relative z-10 w-[95%] md:w-[85%] max-w-6xl flex flex-col gap-4 mt-8 md:mt-16">
          {/* Foreground clear image container */}
          <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-xl overflow-hidden relative flex items-center justify-center shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2800')` }}
            />
            
            <div className="absolute inset-0 bg-black/10" />

            {/* Text + Crosshairs */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="relative inline-flex items-center justify-center px-8 py-6 md:px-16 md:py-10">
                <svg className="absolute top-0 left-0 w-4 h-4 md:w-5 md:h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <svg className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-4 h-4 md:w-5 md:h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                
                <h1 className="text-[13vw] md:text-[110px] lg:text-[130px] leading-none font-medium tracking-tight text-white whitespace-nowrap">
                  We Are Here
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom text overlay */}
          <div className="flex justify-between items-start text-[10px] md:text-[11px] text-white font-medium px-1">
            <div className="drop-shadow-md">(Our Studio)</div>
            <div className="max-w-[200px] text-center text-white/90 leading-relaxed drop-shadow-md">
              One part-time creative dedicated to<br/>your continuous stream of projects.
            </div>
            <div className="drop-shadow-md">© 2025</div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processContainerRef} className="bg-white text-black font-sans min-h-screen px-4 md:px-8 py-6 md:py-8 flex flex-col relative z-10">
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center border-t border-black/20 pt-4 mb-16 md:mb-32 text-[10px] md:text-[11px] font-medium tracking-wide"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <span>(01)</span>
          </div>
          <div>(Process)</div>
          <div>© 2025</div>
        </motion.div>

        {/* Large Text */}
        <div className="max-w-6xl mx-auto w-full mb-16 md:mb-24 px-4 md:px-8">
          <h2 ref={processTextRef} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight flex flex-wrap gap-x-3 gap-y-2">
            {processWords.map((word, i) => {
              const start = i / processWords.length;
              const end = start + (1 / processWords.length);
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
              )
            })}
          </h2>
        </div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[1400px] mx-auto flex-1 min-h-[400px] md:min-h-[600px] relative rounded-t-2xl overflow-hidden mt-auto"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506634572416-48cdfe530110?auto=format&fit=crop&q=80&w=2800')` }}
          />
        </motion.div>
      </section>

      {/* Process Steps List Section */}
      <section className="bg-white text-black font-sans w-full px-4 md:px-8 py-12 md:py-24 relative z-10 flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full">
           {PROCESS_STEPS.map((step, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 md:gap-4 py-12 md:py-16 border-t border-black/20 ${i === PROCESS_STEPS.length - 1 ? 'border-b border-black/20' : ''}`}
             >
                <div className="w-full md:w-[15%] font-semibold text-sm">
                   {step.num}
                </div>
                <div className="w-full md:w-[45%]">
                   <h3 className="text-4xl md:text-6xl tracking-tight font-medium">{step.title}</h3>
                </div>
                <div className="w-full md:w-[40%] flex flex-col pt-2 md:pt-0">
                   <p className="text-black/60 font-medium leading-relaxed mb-10 max-w-md">{step.desc}</p>
                   
                   <h4 className="font-semibold text-sm mb-5 text-black">What's included</h4>
                   <ul className="flex flex-col gap-3">
                      {step.includes.map((inc, j) => (
                         <li key={j} className="flex gap-3 text-[13px] text-black/50 font-medium items-center">
                            <span>+</span>
                            <span>{inc}</span>
                         </li>
                      ))}
                   </ul>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Team Slider Section */}
      <section className="min-h-screen flex flex-col md:flex-row relative font-sans w-full">
        {/* Left Content (Details) */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end p-8 md:pr-12 lg:pr-24 relative z-10 h-auto md:h-screen pt-32 pb-12 md:py-0">
        <div className="w-full max-w-lg relative h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center gap-8 md:gap-12"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">{TEAM[activeIndex].name}</h3>
                <p className="text-sm md:text-base text-white uppercase tracking-widest font-bold">{TEAM[activeIndex].role}</p>
              </div>

              <h2 className="text-4xl md:text-[56px] font-medium leading-[1.1] tracking-tight">
                {TEAM[activeIndex].bio}
              </h2>

              <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-normal">
                {TEAM[activeIndex].quote}
              </p>

              <div className="mt-8 flex gap-4">
                <a href="#" className="w-[52px] h-[52px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group">
                  <svg className="w-5 h-5 fill-white group-hover:fill-black transition-colors" viewBox="0 0 24 24">
                     <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Content (Story + Nav) */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start md:pl-12 lg:pl-24 relative z-10 h-auto md:h-screen perspective-[1000px] pb-24 md:pb-0">
        {/* Story Card */}
        <div className="relative w-[280px] h-[480px] md:w-[360px] md:h-[640px] rounded-xl flex-shrink-0" style={{ transformStyle: 'preserve-3d' }}>
           <AnimatePresence initial={false} custom={direction}>
             <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute inset-0 bg-zinc-900 overflow-hidden rounded-xl shadow-2xl"
             >
                {/* Story Image */}
                <motion.img
                   src={TEAM[activeIndex].image}
                   className="absolute inset-0 w-full h-full object-cover grayscale"
                   animate={{ scale: [1, 1.05] }}
                   transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                {/* Progress bar */}
                <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                   <div className="h-0.5 bg-white/30 flex-1 overflow-hidden rounded-full">
                     <motion.div
                        key={activeIndex}
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                     />
                   </div>
                </div>

                {/* Story Header */}
                <div className="absolute top-8 left-4 right-4 flex items-center gap-3 z-20">
                   <img src={TEAM[activeIndex].avatar} className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover" alt="avatar" />
                   <div className="flex flex-col">
                     <span className="font-semibold text-sm drop-shadow-md text-white">{TEAM[activeIndex].name}</span>
                     <span className="text-xs text-white/80 drop-shadow-md">{TEAM[activeIndex].role}</span>
                   </div>
                   <span className="ml-auto text-xs text-white/80 font-medium">{TEAM[activeIndex].time}</span>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Navigation Sidebar */}
        <div className="hidden md:flex flex-col items-center gap-8 ml-16">
            {/* Avatars */}
            <div className="flex flex-col gap-4 relative">
                {TEAM.map((member, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <div 
                          key={member.id} 
                          className={`w-14 h-14 rounded-full p-[2px] transition-all duration-300 ${isActive ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 scale-110 z-10 shadow-lg shadow-pink-500/20' : 'bg-transparent scale-90 opacity-40 cursor-pointer hover:opacity-100'}`} 
                          onClick={() => { 
                            setDirection(idx > activeIndex ? 1 : -1); 
                            setActiveIndex(idx); 
                          }}
                        >
                            <div className="w-full h-full bg-black rounded-full overflow-hidden border-2 border-black">
                                <img src={member.avatar} className="w-full h-full object-cover grayscale" alt="nav-avatar" />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination */}
            <div className="mt-8 text-xs font-mono tracking-widest text-white/50 flex gap-1 items-center">
                <span className="text-white font-bold text-sm">{String(activeIndex + 1).padStart(2, '0')}</span> 
                <span>/</span> 
                <span>{String(TEAM.length).padStart(2, '0')}</span>
            </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center items-center gap-6 z-20">
           <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
              <ArrowLeft size={16} />
          </button>
          <div className="text-xs font-mono tracking-widest text-white/50 flex gap-1 items-center">
              <span className="text-white font-bold text-sm">{String(activeIndex + 1).padStart(2, '0')}</span> 
              <span>/</span> 
              <span>{String(TEAM.length).padStart(2, '0')}</span>
          </div>
          <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
              <ArrowRight size={16} />
          </button>
        </div>
      </div>
      </section>
      {/* Values Section */}
      <section className="min-h-screen relative flex flex-col justify-center font-sans px-8 md:px-24 py-32 z-10">
        <h2 className="text-[20vw] md:text-[200px] leading-none font-medium tracking-tighter text-[#C8C8C8] md:absolute md:top-32 md:left-24">
          VALUES
        </h2>

        <div className="flex flex-col gap-16 md:gap-32 mt-16 md:mt-48 w-full max-w-6xl mx-auto relative z-10">
          {/* Diverse Team */}
          <div className="flex items-start gap-4 md:w-[500px] md:self-end">
             <svg width="24" height="150" viewBox="0 0 24 150" fill="none" className="hidden md:block flex-shrink-0 mt-2 stroke-white/50" preserveAspectRatio="none">
                <path d="M22 1 C15 1, 15 70, 5 75 C15 80, 15 149, 22 149" strokeWidth="1.5" />
             </svg>
             <div>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-[#C8C8C8] uppercase tracking-wider mb-2">
                  WE HAVE A GLOBAL TEAM THAT<br/>
                  YIELDS INCREASED CREATIVITY<br/>
                  AND INNOVATION.<br/>
                  DRAWING FROM A CULTURALLY<br/>
                  DIVERSE TALENT POOL ALLOWS US<br/>
                  TO ATTRACT AND RETAIN THE BEST<br/>
                  TALENT.
                </p>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#C8C8C8]">
                  DIVERSE TEAM
                </h3>
             </div>
          </div>

          {/* Out of the box */}
          <div className="flex items-start gap-4 md:w-[500px] md:self-start md:ml-[10%]">
             <svg width="24" height="150" viewBox="0 0 24 150" fill="none" className="hidden md:block flex-shrink-0 mt-2 stroke-white/50" preserveAspectRatio="none">
                <path d="M22 1 C15 1, 15 70, 5 75 C15 80, 15 149, 22 149" strokeWidth="1.5" />
             </svg>
             <div>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-[#C8C8C8] uppercase tracking-wider mb-2">
                  WFN THINKS UNCONVENTIONALLY<br/>
                  WHEN IT COMES TO CREATING<br/>
                  CUTTING-EDGE SOLUTIONS.<br/>
                  WE NEED TO BE UNIQUE TO CREATE<br/>
                  PRODUCTS THAT TRULY ENGAGE<br/>
                  WITH THE AUDIENCE AND ADD<br/>
                  VALUE.
                </p>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#C8C8C8] leading-none mt-2">
                  OUT OF THE<br/>BOX THINKING
                </h3>
             </div>
          </div>

          {/* Quality Relationship */}
          <div className="flex items-start gap-4 md:w-[500px] md:self-end md:mr-[5%]">
             <svg width="24" height="150" viewBox="0 0 24 150" fill="none" className="hidden md:block flex-shrink-0 mt-2 stroke-white/50" preserveAspectRatio="none">
                <path d="M22 1 C15 1, 15 70, 5 75 C15 80, 15 149, 22 149" strokeWidth="1.5" />
             </svg>
             <div>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-[#C8C8C8] uppercase tracking-wider mb-2">
                  OUR GOAL IS TO BUILD TRUST AND<br/>
                  QUALITY RELATIONSHIPS WITH OUR<br/>
                  CLIENTS. THIS TRANSPARENT<br/>
                  COLLABORATION TURNS INTO<br/>
                  LONG-LASTING, QUALITY WORK.<br/>
                  WE FEEL THE BEST WHEN OUR<br/>
                  CLIENTS ARE WINNING.
                </p>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#C8C8C8] leading-none mt-2">
                  QUALITY<br/>RELATIONSHIP
                </h3>
             </div>
          </div>
          

        </div>
      </section>
    </div>
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
