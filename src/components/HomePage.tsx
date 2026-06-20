"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage({ initialSection }: { initialSection?: string }) {
  useEffect(() => {
    if (!initialSection) return;
    const el = document.getElementById(initialSection);
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: "smooth" });
    }
  }, [initialSection]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}