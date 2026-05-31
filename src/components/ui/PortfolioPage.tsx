'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from 'lenis';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- CONSTANTS ---
const MOBILE_CARDS = [
  { 
    id: 1, 
    img: "/SplashScreen.svg", // Poster/Graphic Design
    title: "ENPOWER",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-1"
  },
  { 
    id: 2, 
    img: "/img2.svg", // Nike Shoe
    title: "FITSOLE",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT - CONTENT",
    number: "00-2"
  },
  { 
    id: 3, 
    img: "/img3.svg", // Abstract Orange
    title: "VANA",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-3"
  },
  { 
    id: 4, 
    img: "/img4.svg", // Product/Sneaker
    title: "LEMKUS",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-4"
  },
];

const DESKTOP_CARDS = [
  { 
    id: 1, 
    img: "/Merchandise.svg", 
    title: "ENPOWER - DESKTOP",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-1"
  },
  { 
    id: 2, 
    img: "/Hero-Section.svg", 
    title: "FITSOLE - DESKTOP",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT - CONTENT",
    number: "00-2"
  },
  { 
    id: 3, 
    img: "/thirdsvg.svg", 
    title: "VANA - DESKTOP",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-3"
  },
  { 
    id: 4, 
    img: "/4th.svg", 
    title: "LEMKUS - DESKTOP",
    tags: "RESEARCH - STRATEGY - DESIGN - DEVELOPMENT",
    number: "00-4"
  },
];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// --- COMPONENTS ---

// 0. PRELOADER COMPONENT
const WORDS = ["Full Stack Engineer", "Backend Engineer", "Mobile Engineer", "Web Developer", "API Development", "Ambitious", "Goal Driven", "Problem Solver", "Tammy"];

function Preloader({ onComplete }: { onComplete: () => void }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === WORDS.length - 1) return;

        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, index === 0 ? 1000 : 250); // Longer pause on first word

        return () => clearTimeout(timeout);
    }, [index]);

    useEffect(() => {
        if (index === WORDS.length - 1) {
             const timeout = setTimeout(() => {
                 onComplete();
             }, 1000); // Pause on last word
             return () => clearTimeout(timeout);
        }
    }, [index, onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center text-white"
        >
            <div className="overflow-hidden h-12 flex items-center justify-center">
                 <AnimatePresence mode="popLayout">
                    <motion.span
                        key={index}
                        initial={{ y: "100%", filter: "blur(10px)", opacity: 0 }}
                        animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                        exit={{ y: "-100%", filter: "blur(10px)", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-xl md:text-4xl font-normal tracking-tight whitespace-nowrap"
                    >
                        {WORDS[index]}
                    </motion.span>
                 </AnimatePresence>
            </div>
        </motion.div>
    )
}

// 1. SPLIT TEXT COMPONENT (Optimized)
// 1. SPLIT TEXT COMPONENT (Optimized & Variant-based)
function SplitText({ children, className, delay = 0 }: { children: string, className?: string, delay?: number }) {
  const words = children.split(' ');
  return (
    <div className={cn("overflow-hidden flex flex-wrap gap-x-[0.25em] gap-y-1", className)}>
        {words.map((word, i) => (
            <motion.span 
                key={i}
                variants={{
                    hidden: { y: "110%" },
                    visible: { 
                        y: 0,
                        transition: { 
                            duration: 1.5, 
                            ease: EASE,
                            delay: delay + (i * 0.03) 
                        }
                    }
                }}
                className="inline-block will-change-transform" 
            >
                {word}
            </motion.span>
        ))}
    </div>
  );
}

// 2. PARALLAX CARD COMPONENT (Optimized & Re-designed)
function ParallaxCard({ card, index, containerRef, mode }: { card: typeof MOBILE_CARDS[0], index: number, containerRef: React.RefObject<HTMLDivElement | null>, mode: 'Mobile' | 'Desktop' }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create a smaller parallax effect for the internal image
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-4 group cursor-pointer w-full transform-gpu"
      >
          {/* Card Image Container */}
          <div className="relative w-full aspect-3/4 overflow-hidden bg-gray-100">
              {/* Internal Parallax Image */}
              <motion.div 
                ref={ref}
                style={{ y }} 
                className="absolute inset-[-10%] w-[120%] h-[120%] transform-gpu"
              >
                   <img 
                      src={card.img} 
                      alt={card.title}
                      className={cn(
                          "w-full h-full object-contain",
                          mode === 'Desktop' ? "p-[17%] pr-0 object-right" : "p-[10%]"
                      )}
                   />
                   {/* Noise Overlay Removed for Performance */}
              </motion.div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Vertical Number Label */}
              <div className="absolute top-4 right-2 pointer-events-none">
                   <div className="text-[10px] font-medium tracking-widest -rotate-90 origin-top-right text-black opacity-80">
                        {card.number}
                   </div>
              </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-black my-0" />

          {/* Metadata */}
          <div className="flex flex-col gap-2">
               {/* Tags */}
               <div className="text-[10px] font-medium uppercase tracking-tight text-gray-500 line-clamp-1">
                  {card.tags}
               </div>
               
               {/* Title */}
               <div className="text-2xl font-normal uppercase tracking-tight text-black group-hover:opacity-60 transition-opacity">
                  {card.title}
               </div>
          </div>
      </motion.div>
   );
}

// 3. GRID LINE COMPONENT
// 3. GRID LINE COMPONENT
function GridLine({ vertical = false, className, delay = 1.4 }: { vertical?: boolean, className?: string, delay?: number }) {
    return (
        <motion.div 
            variants={{
                hidden: vertical ? { height: 0 } : { width: 0 },
                visible: { 
                    height: vertical ? "100%" : undefined,
                    width: vertical ? undefined : "100%",
                    transition: { duration: 1.5, ease: EASE, delay } 
                }
            }}
            className={cn("absolute bg-gray-200/50", vertical ? "w-px top-0 bottom-0" : "h-px left-0 right-0", className)}
        />
    )
}

// 4. SCROLL GROW VIDEO COMPONENT (HEAVILY OPTIMIZED)
function ScrollGrowVideo({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    const targetRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: targetRef,
      container: containerRef,
      offset: ["start end", "center center"]
    });
  
    const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["24px", "0px"]);
  
    return (
      <div ref={targetRef} className="relative w-full h-[70vh] flex items-center justify-center mb-12 mt-12 perspective-1000">
        <motion.div 
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden origin-center bg-gray-900 z-20 will-change-transform transform-gpu" // <--- GPU ACCELERATION
        >
          {/* Fallback Color */}
          <div className="absolute inset-0 bg-gray-900" />

          {/* Image - OPTIMIZED: Added 'transform-gpu' to image to prevent jitter */}
          <img 
             src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop" // Reduced width from 2070 to 1600 for performance
             alt="Modern Office"
             className="w-full h-full object-cover opacity-90 transform-gpu"
          />

          {/* Noise Overlay Removed for Performance */}
  
          {/* 'Play Reel' Button */}
          <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20 transition-transform duration-500 group-hover:scale-125">
                 <Play className="w-6 h-6 fill-white text-white ml-1" />
              </div>
              <div className="absolute mt-28 text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Play Reel
              </div>
          </div>
        </motion.div>
      </div>
    );
}

// 4.5 SCROLL GROW IMAGE COMPONENT
function ScrollGrowImage({ src, alt, containerRef, className }: { src: string, alt: string, containerRef: React.RefObject<HTMLDivElement | null>, className?: string }) {
    const targetRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: targetRef,
      container: containerRef,
      offset: ["start end", "center center"]
    });
  
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["24px", "16px"]);
  
    return (
      <div ref={targetRef} className={cn("relative max-w-[800px] w-full flex items-center justify-center perspective-1000", className)}>
        <motion.div 
          style={{ scale, borderRadius }}
          className="relative w-full overflow-hidden origin-center shadow-2xl z-20 will-change-transform transform-gpu"
        >
          <img 
             src={src}
             alt={alt}
             className="w-full h-auto object-cover transform-gpu"
          />
          {/* Overlay to darken slightly for better integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    );
}

// 4.75 MODE SWITCHER COMPONENT
function ModeSwitcher({ mode, setMode }: { mode: 'Mobile' | 'Desktop', setMode: (mode: 'Mobile' | 'Desktop') => void }) {
    const options = ['Mobile', 'Desktop'];

    return (
        <div className="flex items-center bg-[#F6F6F6] rounded-full p-1 mt-4 md:mt-0 border border-gray-100/50">
            {options.map((option) => {
                const isActive = mode === option;
                return (
                    <button
                        key={option}
                        onClick={() => setMode(option as 'Mobile' | 'Desktop')}
                        className={cn(
                            "relative z-10 px-6 py-2 rounded-full text-[15px] transition-colors duration-300",
                            isActive ? "text-black font-medium" : "text-[#737373] font-normal hover:text-black/80"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeModeBackgroundHero"
                                className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] z-[-1]"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_495_5163)">
      <path d="M80 38.6719L46.6719 5.34375L26.6719 5.34375L53.3281 32L2.33173e-06 32L1.74846e-06 45.3438L53.3281 45.3438L26.6719 72L46.6719 72L80 38.6719Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_495_5163">
        <rect width="80" height="80" fill="currentColor" transform="translate(80 3.49691e-06) rotate(90)"/>
      </clipPath>
    </defs>
  </svg>
)

// 5. PROJECT LIST COMPONENT
const PROJECTS = [
    { id: "deskit", title: "DeskIT", images: ["/Alexis Bardini.svg", "/Flyfi 3.svg"] },
    { id: "juliana", title: "Juliana" },
    { id: "reveal", title: "Reveal" },
    { id: "orchestrr", title: "Orchestrr" },
    { id: "punch", title: "Punch" },
    { id: "jetout", title: "JetOut Experience" },
    { id: "ervop", title: "Ervop" },
    { id: "gurugeeks", title: "Gurugeeks Academy" },
    { id: "veritas", title: "Veritas" },
    { id: "studyspace", title: "StudySpace" },
    { id: "blockchainballot", title: "BlockchainBallot" },
    { id: "paladin", title: "Paladin" },
];

// 6. WORK EXPERIENCE DATA
const WORK_EXPERIENCE = [
    { company: "Punch", locationType: "Remote", location: "USA", role: "Product design lead / product ideation engineer", startDate: "Aug 2025", endDate: "" },
    { company: "Clorizon", locationType: "Remote", location: "Nigeria", role: "Senior product designer", startDate: "2025", endDate: "Remote, USA" },
    { company: "Edurex", locationType: "Hybrid", location: "Nigeria", role: "Product manager / UX designer", startDate: "Apr 2025", endDate: "Nov 2025" },
    { company: "Reveal", locationType: "Remote", location: "Nigeria", role: "Product Manager / UIUX designer", startDate: "Feb 2024", endDate: "Mar 2025" },
    { company: "Gurugeeks", locationType: "Hybrid", location: "Nigeria", role: "Product designer", startDate: "Sep 2023", endDate: "Apr 2025" },
    { company: "Crayon Technologies", locationType: "Remote", location: "Nigeria", role: "Product design lead", startDate: "Dec 2023", endDate: "Feb 2024" },
    { company: "Aisdoc", locationType: "Remote", location: "Kenya", role: "Product designer", startDate: "Jan 2023", endDate: "Apr 2023" },
];

function ProjectList() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const activeProject = PROJECTS.find(p => p.id === hoveredId);
    const isAnyHovered = !!hoveredId;

    return (
        <div 
            className={cn(
                "relative w-screen left-1/2 -translate-x-1/2 py-32 md:py-48 px-6 md:px-12 flex justify-center overflow-hidden transition-colors duration-500",
                isAnyHovered ? "bg-[#141414] text-white" : "bg-[#FAFAFA] text-black"
            )}
        >
             
             {/* Floating Images for hovered project */}
             <AnimatePresence>
                 {activeProject?.images && (
                    <>
                        {/* Left image */}
                        <motion.img 
                            initial={{ opacity: 0, x: -50, y: -20, rotate: -5 }}
                            animate={{ opacity: 1, x: 0, y: 0, rotate: -10 }}
                            exit={{ opacity: 0, x: -50, y: -20, rotate: -5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            src={activeProject.images[0]}
                            className="absolute left-[-20%] md:left-[2%] lg:left-[5%] top-[20%] w-[300px] lg:w-[450px] h-auto rounded-xl shadow-2xl pointer-events-none z-0"
                            alt={`${activeProject.title} preview 1`}
                        />
                        {/* Right image */}
                        <motion.img 
                            initial={{ opacity: 0, x: 50, y: 20, rotate: 5 }}
                            animate={{ opacity: 1, x: 0, y: 0, rotate: 10 }}
                            exit={{ opacity: 0, x: 50, y: 20, rotate: 5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            src={activeProject.images[1]}
                            className="absolute right-[-20%] md:right-[2%] lg:right-[5%] top-[10%] w-[400px] lg:w-[550px] h-auto rounded-xl shadow-2xl pointer-events-none z-0"
                            alt={`${activeProject.title} preview 2`}
                        />
                    </>
                 )}
             </AnimatePresence>

             <div className="w-full max-w-[800px] flex flex-col items-start relative z-10 pl-16 md:pl-28">
                 <div className={cn(
                     "text-sm md:text-base font-medium mb-12 text-left w-full transition-colors duration-500",
                     isAnyHovered ? "text-white/50" : "text-black/50"
                 )}>
                    Work
                 </div>
                 <div className="flex flex-col w-full">
                    {PROJECTS.map((project) => {
                        const isHovered = hoveredId === project.id;
                        return (
                            <div 
                                key={project.id}
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="group relative flex items-center text-[12vw] sm:text-[10vw] md:text-[6.5vw] lg:text-[5.5rem] leading-[1.2] md:leading-[1.1] font-bold tracking-[-0.03em] cursor-pointer w-full text-left py-1"
                                onClick={() => {
                                    if (project.id === 'deskit') {
                                        window.location.href = '/projects/deskit';
                                    }
                                }}
                            >
                                <div className="absolute -left-16 md:-left-28 flex items-center justify-end pr-4 md:pr-8 w-16 md:w-28 h-full pointer-events-none">
                                    <motion.div
                                        initial={false}
                                        animate={{ 
                                            opacity: isHovered ? 1 : 0,
                                            scale: isHovered ? 1 : 0.8,
                                            x: isHovered ? 0 : -20
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        <ArrowIcon className="w-10 h-10 md:w-16 md:h-16" />
                                    </motion.div>
                                </div>
                                <span className={cn(
                                    "transition-colors duration-300",
                                    !isAnyHovered && "hover:text-black/50",
                                    isAnyHovered && !isHovered && "text-white/30"
                                )}>
                                    {project.title}
                                </span>
                            </div>
                        );
                    })}
                 </div>
             </div>
        </div>
    )
}

// 7. WORK EXPERIENCE COMPONENT
function WorkExperience() {
    return (
        <div className="relative w-screen left-1/2 -translate-x-1/2 px-6 md:px-12 bg-[#0D0D0D] text-white overflow-hidden">
            <div className="max-w-[1920px] mx-auto py-24 md:py-32">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="text-sm text-white/40 font-medium mb-16"
                >
                    Work Experience
                </motion.div>

                {/* Experience Rows */}
                <div className="flex flex-col">
                    {WORK_EXPERIENCE.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                            className="group"
                        >
                            {/* Divider */}
                            <div className="w-full h-px bg-white/10" />
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 gap-2 md:gap-4 cursor-default">
                                {/* Left: Company + Location */}
                                <div className="flex items-baseline gap-3 md:gap-4 flex-shrink-0">
                                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight group-hover:text-white/70 transition-colors duration-300">
                                        {exp.company}
                                    </span>
                                    <span className="text-xs md:text-sm text-white/30 font-normal whitespace-nowrap">
                                        {exp.locationType}, {exp.location}
                                    </span>
                                </div>

                                {/* Right: Role + Dates */}
                                <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 md:text-right">
                                    <span className="text-xs md:text-sm text-white/50 font-medium">
                                        {exp.role}
                                    </span>
                                    <span className="text-xs md:text-sm text-white/30 whitespace-nowrap">
                                        {exp.startDate}
                                        {exp.endDate && <> <span className="mx-1">——</span> {exp.endDate}</>}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {/* Final divider */}
                    <div className="w-full h-px bg-white/10" />
                </div>

                {/* Large Watermark Text */}
                <div className="relative mt-24 md:mt-32 overflow-hidden h-[120px] md:h-[180px] lg:h-[220px]">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="text-[14vw] md:text-[12vw] font-[400] tracking-tighter text-white/[0.04] whitespace-nowrap leading-none select-none uppercase"
                    >
                        WORK EXPERIENCE
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE ---

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeMode, setActiveMode] = useState<'Mobile' | 'Desktop'>('Mobile');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
        wrapper: wrapperRef.current, 
        content: contentRef.current, 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll listener: keep dark background while inside the About section
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const aboutEl = aboutRef.current;
    const gridEl = gridRef.current;
    const bgEl = bgRef.current;
    if (!wrapper || !aboutEl || !gridEl || !bgEl) return;

    let wasInAbout = false;

    const handleScroll = () => {
      const scrollTop = wrapper.scrollTop;
      const aboutTop = aboutEl.offsetTop - 200; // trigger 200px before the section
      const aboutBottom = aboutEl.offsetTop + aboutEl.offsetHeight;
      const isInAbout = scrollTop >= aboutTop && scrollTop < aboutBottom;
      
      if (isInAbout !== wasInAbout) {
        wasInAbout = isInAbout;
        if (isInAbout) {
           wrapper.classList.remove('text-black');
           wrapper.classList.add('text-white');
           bgEl.classList.add('opacity-100');
           gridEl.classList.remove('opacity-100');
           gridEl.classList.add('opacity-20');
        } else {
           wrapper.classList.remove('text-white');
           wrapper.classList.add('text-black');
           bgEl.classList.remove('opacity-100');
           gridEl.classList.remove('opacity-20');
           gridEl.classList.add('opacity-100');
        }
      }
    };

    wrapper.addEventListener('scroll', handleScroll, { passive: true });
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        ref={wrapperRef}
        variants={{
            hidden: { y: '100vh', borderRadius: "40px" },
            visible: { 
                y: 0, 
                borderRadius: "0px",
                transition: { 
                    duration: 1.2,
                    ease: EASE
                }
            }
        }}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
        exit={{ y: '100vh' }}
        className="fixed inset-0 z-100 overflow-y-auto font-sans no-scrollbar transform-gpu bg-[#FAFAFA] text-black transition-colors duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* ISOLATED BACKGROUND LAYER — transitions on its own GPU compositing layer */}
        <div
          ref={bgRef}
          className="fixed inset-0 z-0 bg-[#0D0D0D] opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none transform-gpu will-change-[opacity]"
        />

        {/* GLOBAL GRID BACKGROUND */}
        <div 
          ref={gridRef}
          className="fixed inset-0 pointer-events-none z-0 max-w-[1920px] mx-auto px-6 md:px-12 transition-opacity duration-[1200ms] ease-in-out opacity-100"
        >
            <GridLine className="left-6 md:left-12" vertical />
            <GridLine className="right-6 md:right-12" vertical />
            <GridLine className="left-1/4 hidden md:block" vertical />
            <GridLine className="left-2/4 hidden md:block" vertical />
            <GridLine className="left-3/4 hidden md:block" vertical />
        </div>

      <div ref={contentRef} className="max-w-[1920px] mx-auto px-6 md:px-12 pt-8 pb-0 min-h-screen flex flex-col justify-between relative z-10">
        
        {/* --- 1. HEADER --- */}
        <motion.header 
            variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 1.4, duration: 0.8, ease: EASE }
                }
            }}
            className="flex justify-between items-center mb-16 relative"
        >
          <div className="text-xs font-mono mb-1 tracking-[0.2em]">TAMMY // PORTFOLIO</div>
          
          <nav className="hidden md:flex gap-12 text-sm font-medium">
             <a href="#" className="hover:opacity-60 transition-opacity">About</a>
             <a href="#" className="hover:opacity-60 transition-opacity">Process</a>
             <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
          </nav>
          
          <div className="flex items-center gap-6">
             <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity">
                Let&apos;s Build Something <ArrowUpRight className="w-4 h-4" />
             </button>
             <button className="bg-[#FF4D00] text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-[#ff6a2b] transition-colors uppercase tracking-wider">
                Work
             </button>
          </div>
          
          <GridLine className="-bottom-8" />
        </motion.header>

        {/* --- 2. HERO SECTION --- */}
        <section className="mb-32 relative">
          {/* Memoji Cluster */}
          <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 1.3, duration: 0.8, ease: EASE }
                }
            }}
            className="mb-0 ml-20"
          >
            <img src="/memoji.svg" alt="Memoji" className="h-[80px] md:h-[100px] w-auto object-contain" />
          </motion.div>

          <h1 className="text-[6vw] leading-none font-normal tracking-[-0.03em] uppercase w-full mb-12">
            <SplitText delay={1.5} className="flex-nowrap">
                I'M TAMMY — A FULL STACK
            </SplitText>
            <SplitText delay={1.7} className="flex-nowrap">
                & MOBILE ENGINEER BUILDING
            </SplitText>
            <SplitText delay={1.9} className="flex-nowrap">
                SEAMLESS DIGITAL EXPERIENCES
            </SplitText>
          </h1>
          
          <motion.div 
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 2.2, duration: 1 } }
            }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full text-gray-500 text-sm md:text-base mt-8"
          >
             <p>From APIs to mobile apps, from web platforms to scalable systems</p>
             <ModeSwitcher mode={activeMode} setMode={setActiveMode} />
          </motion.div>
        </section>

        {/* --- 3. CARDS SECTION --- */}
        <section className="mb-32">
           <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <AnimatePresence mode="popLayout">
                   {(activeMode === 'Mobile' ? MOBILE_CARDS : DESKTOP_CARDS).map((card, idx) => (
                     <ParallaxCard key={`${activeMode}-${card.id}`} card={card} index={idx} containerRef={wrapperRef} mode={activeMode} />
                   ))}
               </AnimatePresence>
           </motion.div>
        </section>

        {/* --- 4. ABOUT SECTION --- */}
        <section ref={aboutRef} className="mb-32 relative">
          <GridLine className="top-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
            <div className="flex flex-col gap-2">
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: wrapperRef }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="text-4xl font-bold uppercase tracking-tighter"
                >
                    ABOUT
                </motion.h3>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: wrapperRef }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                    className="text-xl uppercase max-w-sm mt-4 leading-tight"
                >
                    I'M TAMMY — A FULL STACK & MOBILE ENGINEER
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: wrapperRef }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="text-gray-500 text-lg leading-relaxed max-w-md md:ml-auto"
            >
                <p>
                  I'm <span className="font-semibold text-inherit">Tammy</span> — a full stack & mobile <span className="italic font-serif">engineer</span> building seamless digital experiences across web and mobile platforms. 
                </p>
                <p className="mt-4">
                  From APIs to mobile apps, from scalable backends to polished frontends — I turn ideas into production-ready products.
                </p>
            </motion.div>
          </div>

            {/* Dashboard Mockup with Scroll Previews */}
            <div className="relative w-full mt-16 mb-16 flex lg:flex-row flex-col gap-4 items-start">
              {/* Left Column: Project Images */}
              <div className="flex-1 flex flex-col gap-12 w-full items-center">
                {/* Main Dashboard Image */}
                <ScrollGrowImage 
                    src="/Alexis Bardini.svg"
                    alt="DeskIt Dashboard Mockup"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Second Project Image - FlyFi */}
                <ScrollGrowImage 
                    src="/Flyfi 3.svg"
                    alt="FlyFi Web3 Platform"
                    containerRef={wrapperRef}
                    className="bg-[#0D0D0D] rounded-2xl"
                />

                {/* Third Project Image */}
                <ScrollGrowImage 
                    src="/third.svg"
                    alt="Third Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Fourth Project Image */}
                <ScrollGrowImage 
                    src="/fourth.svg"
                    alt="Fourth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Fifth Project Image */}
                <ScrollGrowImage 
                    src="/fifth.svg"
                    alt="Fifth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Sixth Project Image */}
                <ScrollGrowImage 
                    src="/sixth.svg"
                    alt="Sixth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Seventh Project Image */}
                <ScrollGrowImage 
                    src="/seventh.svg"
                    alt="Seventh Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Eighth Project Image */}
                <ScrollGrowImage 
                    src="/eighth.svg"
                    alt="Eighth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Ninth Project Image */}
                <ScrollGrowImage 
                    src="/ninth.svg"
                    alt="Ninth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Tenth Project Image */}
                <ScrollGrowImage 
                    src="/tenth.svg"
                    alt="Tenth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Eleventh Project Image */}
                <ScrollGrowImage 
                    src="/eleventh.svg"
                    alt="Eleventh Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Twelth Project Image */}
                <ScrollGrowImage 
                    src="/twelvth.svg"
                    alt="Twelth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Thirtheenth Project Image */}
                <ScrollGrowImage 
                    src="/thirteenth.svg"
                    alt="Thirteenth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Fourtheenth Project Image */}
                <ScrollGrowImage 
                    src="/foutheenth.svg"
                    alt="Fourtheenth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />

                {/* Sixtheenth Project Image */}
                <ScrollGrowImage 
                    src="/sixtheenth.svg"
                    alt="Sixtheenth Project"
                    containerRef={wrapperRef}
                    className="bg-[#141414] rounded-2xl"
                />
              </div>

              {/* Right Column: Sticky Vertical Scroll Preview Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, root: wrapperRef }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="hidden lg:flex flex-col gap-3 w-20 shrink-0 sticky top-32 self-start"
              >
                {[
                  "/Alexis Bardini.svg",
                  "/Flyfi 3.svg",
                  "/third.svg",
                  "/fourth.svg",
                  "/fifth.svg",
                  "/sixth.svg",
                  "/seventh.svg",
                  "/eighth.svg",
                  "/ninth.svg",
                  "/tenth.svg",
                  "/eleventh.svg",
                  "/twelvth.svg",
                  "/thirteenth.svg",
                  "/foutheenth.svg",
                  "/sixtheenth.svg"
                ].map((img, i) => (
                  <div 
                    key={i}
                    className="relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-white/50 transition-all bg-[#141414]"
                  >
                    <img 
                      src={img} 
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {i === 0 && (
                      <div className="absolute inset-0 ring-2 ring-white rounded-md" />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

           {/* <ScrollGrowVideo containerRef={wrapperRef} /> */}

        {/* --- 4. WHAT I DO SECTION --- */}
        <div className="py-32 relative">
          <GridLine className="top-0" />
          
          {/* Top Section: Philosophy & Beliefs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
            {/* Left Column: Philosophy */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: wrapperRef }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.9]"
              >
                I don&apos;t just <br />
                <span className="font-serif italic font-light">write</span> code.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: wrapperRef }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="text-gray-400 text-sm leading-relaxed max-w-xs"
              >
                I <span className="italic font-serif">engineer</span> systems, experiences, and products that work flawlessly across every platform.
              </motion.p>

              {/* Faint Grid Visual */}
              <div className="grid grid-cols-3 gap-1 w-fit mt-8 opacity-20">
                 {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-32 h-32 border border-white/30 rounded-sm" />
                 ))}
              </div>
            </div>

            {/* Middle Column: Beliefs */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-8 lg:pt-4">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, root: wrapperRef }}
                 transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
               >
                 <h4 className="text-white text-sm font-medium mb-4">I believe:</h4>
                 <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Clean architecture outlasts clever hacks</li>
                    <li>• Performance is a feature, not an afterthought</li>
                    <li>• Great products ship fast and scale gracefully</li>
                 </ul>
               </motion.div>

               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, root: wrapperRef }}
                 transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                 className="text-gray-500 text-sm leading-relaxed max-w-xs"
               >
                 When I&apos;m not coding, I&apos;m learning, experimenting, or thinking about how technology shapes the future.
               </motion.p>
            </div>

            {/* Right Column: Placeholder/Image */}
            <div className="col-span-1 lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, root: wrapperRef }}
                  transition={{ duration: 1, delay: 0.4, ease: EASE }}
                  className="w-full h-[699px] aspect-[4/5] bg-[#0E0E0E] rounded-2xl border border-white/5 overflow-hidden"
                >
                    <img 
                      src="/tammy.jpg" 
                      alt="Tammy" 
                      className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
          </div>

          {/* Bottom Section: What I Do */}
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: wrapperRef }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-center mb-16"
            >
                <h3 className="text-4xl md:text-5xl font-bold mb-6">What I Do</h3>
                <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                I build end-to-end products — from backend architecture to pixel-perfect frontends and native mobile apps.
                </p>
            </motion.div>

            {/* Service Cards List */}
            <div className="w-full flex flex-col gap-3">
                {[
                  { name: "Full Stack Web Development", bg: "#141414" },
                  { name: "Mobile App Development", bg: "#191919" },
                  { name: "API Design & Architecture", bg: "#1D1D1D" },
                  { name: "Cloud & DevOps", bg: "#212121" },
                  { name: "System Design & Scalability", bg: "#1D1D1D" }
                ].map((service, i) => (
                <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: wrapperRef }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    style={{ backgroundColor: service.bg }}
                    className="w-full border border-white/5 rounded-xl py-8 flex items-center justify-center transition-all duration-300 group cursor-pointer hover:opacity-80"
                >
                    <span className="text-xl text-gray-300 font-medium group-hover:text-white transition-colors">{service.name}</span>
                </motion.div>
                ))}
            </div>
          </div>
            </div>
        </section>

        <ProjectList />

        <WorkExperience />

        {/* --- 5. FOOTER --- */}
        <footer className="relative w-screen left-1/2 -translate-x-1/2 bg-[#0D0D0D] text-white overflow-hidden">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-14 relative">
            
            {/* Top: Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-base md:text-lg font-medium tracking-tight mb-12 md:mb-16"
            >
              Faldnag
            </motion.div>

            {/* Main Content: Contact Info (left) + Credits (right) */}
            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
              {/* Left Column: Contact */}
              <div className="flex flex-col gap-8">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                  <div className="text-xs text-white/40 font-medium mb-1">Email</div>
                  <a href="mailto:Ogunyomigbenro656@gmail.com" className="text-sm md:text-base text-white hover:text-white/70 transition-colors">
                    Ogunyomigbenro656@gmail.com
                  </a>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                >
                  <div className="text-xs text-white/40 font-medium mb-1">Phone</div>
                  <a href="tel:+2347083778524" className="text-sm md:text-base text-white hover:text-white/70 transition-colors">
                    +234 7083778524
                  </a>
                </motion.div>

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                >
                  <div className="text-xs text-white/40 font-medium mb-3">Socials</div>
                  <div className="flex items-center gap-4">
                    {/* LinkedIn */}
                    <a href="#" className="text-white hover:text-white/60 transition-colors" aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                    {/* X / Twitter */}
                    <a href="#" className="text-white hover:text-white/60 transition-colors" aria-label="X">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    {/* Behance */}
                    <a href="#" className="text-white hover:text-white/60 transition-colors" aria-label="Behance">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 11c1.38 0 2.5-1.12 2.5-2.5S8.88 6 7.5 6H3v5h4.5zm1 2H3v5h5.5c1.38 0 2.5-1.12 2.5-2.5S9.88 13 8.5 13zM21 6.5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 .99h5a1 1 0 0 0 1-1v-.01zM14 13c0 2.76 2.24 5 5 5 1.63 0 3.07-.78 3.98-2h-2.24c-.52.63-1.3 1-2.14 1a2.5 2.5 0 0 1-2.4-1.8h7.3c.1-.39.15-.79.15-1.2 0-2.76-2.24-5-5-5s-5 2.24-5 5zm2.6-1.2a2.5 2.5 0 0 1 4.8 0h-4.8z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Credits */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="flex items-end gap-6 md:gap-10 text-xs md:text-sm text-white/40 md:self-end mb-4"
              >
                <span>Design by <span className="text-white font-medium ml-1">Gbenro Ogunyomi</span></span>
                <span>Developed by <span className="text-white font-medium ml-1">Tammy</span></span>
              </motion.div>
            </div>

            {/* Memoji */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="relative w-full flex justify-center items-end mt-8 md:mt-0 h-[200px] md:h-[280px] -mb-16 md:-mb-26 z-10"
            >
              <img src="/memoji.svg" alt="Memoji" className="h-full w-auto object-contain" />
            </motion.div>

            {/* Large Watermark Text */}
            <div className="relative overflow-hidden h-[100px] md:h-[160px] lg:h-[200px] -mb-4 md:-mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: EASE }}
                className="text-[20vw] md:text-[16vw] font-[400] tracking-tighter text-white/[0.04] whitespace-nowrap leading-none select-none uppercase text-center"
              >
                FALDNAG
              </motion.div>
            </div>
          </div>
        </footer>

      </div>
      </motion.div>
    </>
  );
}