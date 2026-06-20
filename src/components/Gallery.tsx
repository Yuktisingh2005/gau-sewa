"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  { id: 1,    image: "/images/1.jpeg" },
  { id: 2,  image: "/images/2.jpeg" },
  { id: 3,  image: "/images/3.jpeg" },
  { id: 4,  image: "/images/4.jpeg" },
  { id: 5,   image: "/images/5.jpeg" },
  { id: 6,  image: "/images/6.jpeg" },
  { id: 7,       image: "/images/7.jpeg" },
  { id: 8,   image: "/images/8.jpeg" },
  { id: 9,   image: "/images/9.jpeg" },
  { id: 10,  image: "/images/10.jpeg" },
  { id: 11, image: "/images/11.jpeg" },
  { id: 12,  image: "/images/12.jpeg" },
];

function MarqueeStrip({ items, direction = 1, speed = 30 }: { items: typeof galleryItems; direction?: number; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction > 0 ? [0, -50 * items.length * 4] : [-50 * items.length * 4, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative flex-shrink-0 w-48 h-32 sm:w-64 sm:h-44 bg-amber-900/20 border border-amber-800/30 rounded-sm overflow-hidden group cursor-pointer hover:border-amber-500/50 transition-all duration-300"
          >
            {/* Real image */}
            <Image
              src={item.image}
              alt={`Gallery image ${item.id}`}
              fill
              sizes="(max-width: 640px) 192px, 256px"
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-transparent" />

            {/* Hover label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-amber-100 text-xs tracking-widest uppercase text-center px-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.label}</div>
              <div className="text-amber-300 text-[10px] tracking-widest uppercase border border-amber-400/40 px-2 py-0.5"
                style={{ fontFamily: "'Lora', serif" }}>{item.tag}</div>
            </div>

            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-amber-600/30" />
            <div className="absolute top-2 left-2 text-amber-600/20 text-xs">#{item.id}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0700 0%, #100900 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Work in Pictures
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-amber-50 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Gallery
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-amber-500">✦</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
          <p className="text-amber-200/50 max-w-xl mx-auto text-sm"
            style={{ fontFamily: "'Lora', serif" }}>
            Moments of seva, compassion, and healing — a visual journey through our sacred work.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-4"
        >
          <MarqueeStrip items={galleryItems.slice(0, 6)} direction={1} speed={40} />
          <MarqueeStrip items={galleryItems.slice(6)} direction={-1} speed={35} />
        </motion.div>
      </div>
    </section>
  );
}