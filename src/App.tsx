import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import { ChevronDown, X, Instagram, Facebook, Linkedin } from 'lucide-react';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import InfiniteLogoScroll from './components/InfiniteLogoScroll';
import ContactSection from './components/ContactSection';
import ExperienceSection from './components/ExperienceSection';
import TeamPage from './pages/TeamPage';

const IMAGES = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80',
];

const PROJECTS = [
  { category: "DOCUMENTARY", title1: "OUTSIDER", title2: "FREUD", director: "YAIR QEDAR", year: "2024", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
  { category: "BRAND", title1: "SILENT", title2: "ECHOES", director: "SARAH CHEN", year: "2021", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
  { category: "FILMS", title1: "NEON", title2: "NIGHTS", director: "MARCUS WEBB", year: "2018", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { category: "DOCUMENTARY", title1: "THE LOST", title2: "CHAPTER", director: "ELENA ROSTOVA", year: "2022", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&h=100&fit=crop" }
];

const VIDEOS = [
  'https://videos.pexels.com/video-files/19205434/19205434-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/10273125/10273125-uhd_2732_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/10276474/10276474-uhd_2732_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/1826904/1826904-hd_1920_1080_24fps.mp4'
];

const PASTEL_COLORS = [
  '#FFFAA0', // Pastel Yellow
  '#FFB3BA', // Pastel Pink
  '#BAFFC9', // Pastel Green
  '#BAE1FF', // Pastel Blue
  '#E0BBE4', // Pastel Purple
];

const GRID_SIZE = 5;
const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;

function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleSquares, setVisibleSquares] = useState<number[]>([]);

  useEffect(() => {
    const duration = 4000; // 4 seconds total loading
    const interval = 50; // update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      if (currentStep % 5 === 0) {
        const numVisible = Math.floor(5 + (currentProgress / 100) * 12);
        const newVisible = [];
        const available = Array.from({ length: TOTAL_SQUARES }, (_, i) => i);
        
        for (let i = 0; i < numVisible; i++) {
          const randomIndex = Math.floor(Math.random() * available.length);
          newVisible.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
        setVisibleSquares(newVisible);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600); // Small delay at 100% before transitioning
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const imageIndex = Math.min(Math.floor(progress / 20), IMAGES.length - 1);

  return (
    <motion.div 
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black text-[#a0a0a0] font-sans overflow-hidden selection:bg-[#FFFAA0] selection:text-black"
    >
      <div className="absolute top-8 left-8 z-10">
        <img src="/Vega.svg" alt="Vega Logo" className="h-6 md:h-8 w-auto" />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        <div 
          className="absolute inset-0 mix-blend-multiply z-20 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: PASTEL_COLORS[imageIndex] }}
        ></div>
        <img 
          src={IMAGES[imageIndex]} 
          alt="Art" 
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 z-10 transition-opacity duration-500"
        />
        <div className="absolute inset-0 z-30 grid grid-cols-5 grid-rows-5">
          {Array.from({ length: TOTAL_SQUARES }).map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-full bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: visibleSquares.includes(i) ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-10 flex items-baseline gap-2 md:gap-3"
      >
        <div className="text-[100px] md:text-[140px] leading-none font-semibold font-sans tabular-nums tracking-tighter text-white">
          {Math.floor(progress)}
        </div>
        <span className="text-4xl md:text-5xl font-medium font-sans text-white/50">%</span>
      </motion.div>
    </motion.div>
  );
}

const SlideCard: React.FC<{ 
  videoSrc: string;
  project: { category: string; title1: string; title2: string; director: string; year: string; image?: string };
  onInteractiveEnter: () => void;
  onInteractiveLeave: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ 
  videoSrc,
  project,
  onInteractiveEnter,
  onInteractiveLeave,
  onPrev,
  onNext
}) => {
  return (
    <div className="relative w-full h-full flex-shrink-0 text-white select-none">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none cursor-none"
      />
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />

      {/* Bottom Content Area */}
      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 pointer-events-none">
        
        {/* Left Side: Title & Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-6 pointer-events-auto cursor-auto w-full md:w-auto"
          onMouseEnter={onInteractiveEnter}
          onMouseLeave={onInteractiveLeave}
        >
          <div className="text-[10px] tracking-widest uppercase opacity-80 mb-2">{project.category}</div>
          
          <div className="font-sans font-black text-6xl md:text-8xl leading-[0.85] tracking-tighter mix-blend-difference flex flex-col uppercase cursor-text items-center md:items-start w-full text-center md:text-left">
            <span>{project.title1}</span>
            <span className="md:ml-24">{project.title2}</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 w-full md:w-auto">
            <button onClick={onPrev} className="relative w-[46px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id={`arrow-left-clip-${project.title1}`}>
                    <path d="M 0 4 A 4 4 0 0 0 4 0 L 42 0 A 4 4 0 0 0 46 4 L 46 42 A 4 4 0 0 0 42 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
                  </clipPath>
                </defs>
                <rect x="0" y="0" height="46" fill="white" className="w-0 group-hover:w-[46px] transition-all duration-300 ease-out" clipPath={`url(#arrow-left-clip-${project.title1})`} />
                <path d="M 0 4 
                         A 4 4 0 0 0 4 0 
                         L 42 0 
                         A 4 4 0 0 0 46 4 
                         L 46 42 
                         A 4 4 0 0 0 42 46 
                         L 4 46 
                         A 4 4 0 0 0 0 42 
                         Z" 
                      fill="transparent" stroke="currentColor" strokeWidth="1" className="text-white/60 group-hover:text-white transition-all duration-300" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white group-hover:text-black transition-colors duration-300">
                <span className="text-xl leading-none font-light mb-[2px] transform -translate-y-[1px] group-hover:-translate-x-1 transition-transform">←</span>
              </div>
            </button>
            <button onClick={onNext} className="relative w-[46px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id={`arrow-right-clip-${project.title1}`}>
                    <path d="M 0 4 A 4 4 0 0 0 4 0 L 42 0 A 4 4 0 0 0 46 4 L 46 42 A 4 4 0 0 0 42 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
                  </clipPath>
                </defs>
                <rect x="0" y="0" height="46" fill="white" className="w-0 group-hover:w-[46px] transition-all duration-300 ease-out" clipPath={`url(#arrow-right-clip-${project.title1})`} />
                <path d="M 0 4 
                         A 4 4 0 0 0 4 0 
                         L 42 0 
                         A 4 4 0 0 0 46 4 
                         L 46 42 
                         A 4 4 0 0 0 42 46 
                         L 4 46 
                         A 4 4 0 0 0 0 42 
                         Z" 
                      fill="transparent" stroke="currentColor" strokeWidth="1" className="text-white/60 group-hover:text-white transition-all duration-300" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white group-hover:text-black transition-colors duration-300">
                <span className="text-xl leading-none font-light mb-[2px] transform -translate-y-[1px] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Side: Reviews & Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center md:items-end justify-center md:justify-end gap-8 text-center md:text-right pointer-events-auto max-w-xs md:max-w-xs w-full md:w-auto h-full pb-4"
          onMouseEnter={onInteractiveEnter}
          onMouseLeave={onInteractiveLeave}
        >
          <button className="mt-4 relative w-[160px] h-[46px] group cursor-pointer transition-transform hover:scale-[1.02]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id={`explore-clip-${project.title1}`}>
                  <path d="M 0 4 A 4 4 0 0 0 4 0 L 111 0 A 4 4 0 0 0 119 0 L 156 0 A 4 4 0 0 0 160 4 L 160 42 A 4 4 0 0 0 156 46 L 119 46 A 4 4 0 0 0 111 46 L 4 46 A 4 4 0 0 0 0 42 Z" />
                </clipPath>
              </defs>
              <rect x="0" y="0" height="46" fill="white" className="w-0 group-hover:w-[160px] transition-all duration-300 ease-out" clipPath={`url(#explore-clip-${project.title1})`} />
              <path d="M 0 4 
                       A 4 4 0 0 0 4 0 
                       L 111 0 
                       A 4 4 0 0 0 119 0 
                       L 156 0 
                       A 4 4 0 0 0 160 4 
                       L 160 42 
                       A 4 4 0 0 0 156 46 
                       L 119 46 
                       A 4 4 0 0 0 111 46 
                       L 4 46 
                       A 4 4 0 0 0 0 42 
                       Z" 
                    fill="transparent" stroke="currentColor" strokeWidth="1" className="text-white/60 group-hover:text-white transition-colors duration-300" />
              <line x1="115" y1="6" x2="115" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-white/40 group-hover:text-white/80 transition-colors duration-300" />
            </svg>
            <div className="absolute inset-0 flex text-white group-hover:text-black transition-colors duration-300">
              <div className="w-[115px] flex items-center justify-center text-[10px] tracking-[0.2em] font-bold uppercase pl-2">
                EXPLORE
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xl leading-none font-light mb-[2px]">→</span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteractiveHovered, setIsInteractiveHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < VIDEOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < VIDEOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <motion.div 
      key="hero"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="relative h-[100dvh] bg-black text-white font-sans p-3 md:p-6 flex flex-col selection:bg-white/20 selection:text-white"
    >
      {/* Inner Rounded Rectangle */}
      <div 
        className={`relative flex-1 w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#111] flex flex-col ${isInteractiveHovered ? '' : 'md:cursor-none'}`}
        onMouseEnter={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Custom Cursor */}
        <AnimatePresence>
          {isHovered && !isInteractiveHovered && (
            <motion.div
              className="hidden md:flex absolute z-50 pointer-events-none w-16 h-12 bg-transparent flex-col items-center justify-center shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x - 32,
                y: mousePos.y - 24,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            >
              <div className="w-full h-full bg-white flex flex-col justify-between py-1.5 relative overflow-hidden">
                <motion.div 
                  className="flex gap-[6px] pl-[3px] w-max"
                  animate={{ x: [0, -14] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
                >
                  {[...Array(12)].map((_, i) => (
                    <div key={`top-${i}`} className="w-2 h-1.5 bg-black rounded-[1px] flex-shrink-0" />
                  ))}
                </motion.div>
                <motion.div 
                  className="flex gap-[6px] pl-[3px] w-max"
                  animate={{ x: [0, -14] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
                >
                  {[...Array(12)].map((_, i) => (
                    <div key={`bottom-${i}`} className="w-2 h-1.5 bg-black rounded-[1px] flex-shrink-0" />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {VIDEOS.map((videoSrc, idx) => (
            <SlideCard 
              key={idx} 
              videoSrc={videoSrc} 
              project={PROJECTS[idx % PROJECTS.length]} 
              onInteractiveEnter={() => setIsInteractiveHovered(true)}
              onInteractiveLeave={() => setIsInteractiveHovered(false)}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          ))}
        </motion.div>

        {/* Top Left Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="fixed top-8 left-8 md:top-12 md:left-12 z-30 pointer-events-auto mix-blend-difference"
        >
          <Link to="/">
            <img src="/Vega.svg" alt="Vega Logo" className="h-6 md:h-8 brightness-0 invert hover:opacity-70 transition-opacity" />
          </Link>
        </motion.div>

        {/* Top Right Ticket Menu Container */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-30 flex flex-col items-end drop-shadow-2xl pointer-events-auto"
          onMouseEnter={() => setIsInteractiveHovered(true)}
          onMouseLeave={() => setIsInteractiveHovered(false)}
        >
          <div className="flex md:ticket-mask overflow-hidden md:overflow-visible">
          {/* Left Ticket */}
          <div className="hidden md:flex bg-white text-black flex-col py-2 transition-all w-full relative">
            <div className={`flex flex-col transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 px-6 pt-5 pb-4">
                <img src={PROJECTS[currentIndex % PROJECTS.length].image} alt="Avatar" className="w-10 h-10 rounded-xl object-cover" />
                <span className="font-sans font-semibold text-lg md:text-xl tracking-wide uppercase">{PROJECTS[currentIndex % PROJECTS.length].title1} {PROJECTS[currentIndex % PROJECTS.length].title2}</span>
                <ChevronDown className="w-5 h-5 ml-2" />
              </div>
              <div className="flex text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase border-t border-black/20">
                <div className="flex-1 py-3 px-4 md:px-6 text-center border-r border-black/20">{PROJECTS[currentIndex % PROJECTS.length].category}</div>
                <div className="flex-1 py-3 px-4 md:px-6 text-center">{PROJECTS[currentIndex % PROJECTS.length].year}</div>
              </div>
            </div>
            
            <div className={`absolute inset-0 flex items-center px-8 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <Link to="/">
                <img src="/Vega.svg" alt="Vega Logo" className="h-6 md:h-8 brightness-0 hover:opacity-70 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Right Ticket */}
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
              className="absolute top-[48px] right-0 w-[calc(100vw-3rem)] md:relative md:top-auto md:right-auto md:w-full md:mt-[-8px] bg-white text-black z-40 flex flex-col origin-top md:origin-top-right"
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
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {!loadingComplete ? (
          <Loader key="loader" onComplete={() => setLoadingComplete(true)} />
        ) : (
          <Routes key="routes">
            <Route path="/" element={
              <div className="flex flex-col">
                <Hero />
                <AboutSection />
                <ServicesSection />
                <TestimonialsSection />
                <InfiniteLogoScroll />
                <ContactSection />
                <ExperienceSection />
              </div>
            } />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
