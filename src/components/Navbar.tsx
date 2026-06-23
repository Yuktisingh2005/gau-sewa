"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = 80;
    window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
    const path = href === "#hero" ? "/" : `/${href.slice(1)}`;
    window.history.pushState(null, "", path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1a0f00]/95 backdrop-blur-md shadow-2xl shadow-amber-900/20 border-b border-amber-900/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── MOBILE LAYOUT: single row, logo left + nav links right ── */}
          <div className="flex md:hidden items-center justify-between h-14">

            {/* Left: Logo only — only when scrolled */}
            <div className="w-8">
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(245,158,11,0.6)",
                        background: "rgba(120,53,15,0.2)",
                        overflow: "hidden",
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
                          transform: "scale(1.08) translateX(-0.3px) translateY(-0.5px)",
                          display: "block",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Nav links */}
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative text-amber-100/80 hover:text-amber-300 uppercase tracking-wider transition-colors duration-300 group"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem" }}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── DESKTOP LAYOUT: single row ── */}
          <div className="hidden md:flex items-center justify-between h-20">

            {/* Left: Logo + Name — only when scrolled */}
            <div className="flex-1 min-w-0">
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(245,158,11,0.6)",
                        background: "rgba(120,53,15,0.2)",
                        overflow: "hidden",
                        flexShrink: 0,
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
                          transform: "scale(1.08) translateX(-0.3px) translateY(-0.5px)",
                          display: "block",
                        }}
                      />
                    </div>
                    <p
                      className="text-amber-300 font-bold tracking-wider uppercase leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem" }}
                    >
                      Triveni Gau Sewa Trust
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Nav links */}
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative text-amber-100/80 hover:text-amber-300 tracking-widest uppercase transition-colors duration-300 group"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </motion.nav>
    </>
  );
}
