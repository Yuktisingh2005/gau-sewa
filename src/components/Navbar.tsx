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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-14 h-14 rounded-full border-2 border-amber-500/60 bg-amber-900/20 flex items-center justify-center overflow-hidden">
              <span className="text-amber-400 text-xs font-bold text-center leading-tight px-1">LOGO</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-amber-300 font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Triveni
              </p>
              <p className="text-amber-500/80 text-xs tracking-[0.2em] uppercase">Gau Sewa Trust</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-amber-100/80 hover:text-amber-300 text-sm tracking-widest uppercase transition-colors duration-300 group"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

      
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-0.5 bg-amber-400 origin-center transition-all" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-amber-400" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-0.5 bg-amber-400 origin-center transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a0f00]/98 border-t border-amber-900/40"
          >
            <ul className="py-6 px-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-amber-200 text-lg tracking-widest uppercase w-full text-left py-2 border-b border-amber-900/30 hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 w-full py-3 border border-amber-500 text-amber-300 text-sm tracking-widest uppercase hover:bg-amber-500 hover:text-[#1a0f00] transition-all"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Donate
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
