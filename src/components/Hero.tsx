"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const cowCount = useCountUp(500, 2200, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Hide logo when user scrolls down enough that navbar would overlap it
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 60% 40%, #3d1f00 0%, #1a0f00 40%, #0d0700 100%)",
      }}
    >
      {/* Looping faded cow/healing video overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.60]"
          style={{ filter: "sepia(80%) hue-rotate(10deg) saturate(120%)" }}
        >
          <source src="/images/cow.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(61,31,0,0.85) 0%, rgba(26,15,0,0.92) 40%, rgba(13,7,0,0.97) 100%)",
          }}
        />
      </div>

      {/* Sacred mandala background */}
      <div className="absolute inset-0 opacity-[0.04] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3Cpath d='M100 10 L190 100 L100 190 L10 100 Z' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }} />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 z-0"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }} />

      {/* Logo — fades out when navbar scrolls down over it */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "12px",
              left: "16px",
              zIndex: 40,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "clamp(44px, 11vw, 110px)",
                height: "clamp(44px, 11vw, 110px)",
                borderRadius: "50%",
                border: "2px solid rgba(245,158,11,0.6)",
                background: "rgba(120,53,15,0.2)",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(120,53,15,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Triveni Gau Sewa Trust"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transform: "scale(1.08) translateX(-0.50px) translateY(-1.25px)",
                  display: "block",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-32 pb-6 sm:pb-16">

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-3xl xs:text-4xl sm:text-6xl lg:text-8xl font-bold text-amber-50 leading-[1.1] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Triveni
          <span className="block text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #f59e0b, #fbbf24, #d97706)" }}>
            Gau Sewa Trust
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-base sm:text-2xl text-amber-200/70 mb-3 sm:mb-4 tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Serving Cow, Serving Humanity
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-3 my-4 sm:my-6"
        >
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-600" />
          <span className="text-amber-500 text-2xl">✦</span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-600" />
        </motion.div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-sm sm:text-lg text-amber-100/50 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8"
          style={{ fontFamily: "'Lora', serif" }}
        >
          A sacred mission to rescue, heal, and care for our animals — providing medical aid,
          transport, and rehabilitation with devotion and compassion.
        </motion.p>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex justify-center"
        >
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative px-8 py-4 bg-amber-500 text-[#1a0f00] font-bold text-sm tracking-widest uppercase overflow-hidden hover:bg-amber-400 transition-all duration-300 rounded-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="relative z-10">Discover Our Mission</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="mt-6 sm:mt-10 grid grid-cols-3 gap-1 sm:gap-4 max-w-[280px] xs:max-w-xs sm:max-w-lg mx-auto"
        >
          <div className="text-center">
            <div className="text-lg sm:text-3xl font-bold text-amber-400"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {statsVisible ? `${cowCount}+` : "1+"}
            </div>
            <div className="text-xs text-amber-200/50 tracking-widest uppercase mt-1"
              style={{ fontFamily: "'Lora', serif" }}>Animals Rescued</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-lg sm:text-3xl font-bold text-amber-400"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              animate={statsVisible ? { opacity: [0, 1, 0.6, 1] } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              24/7
            </motion.div>
            <div className="text-xs text-amber-200/50 tracking-widest uppercase mt-1"
              style={{ fontFamily: "'Lora', serif" }}>Emergency Aid</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-lg sm:text-3xl font-bold text-amber-400"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              animate={statsVisible ? { scale: [0.5, 1.2, 1], opacity: [0, 1] } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              ∞
            </motion.div>
            <div className="text-xs text-amber-200/50 tracking-widest uppercase mt-1"
              style={{ fontFamily: "'Lora', serif" }}>Devotion</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
