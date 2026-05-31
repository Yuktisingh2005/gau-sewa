"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    icon: "🐄",
    title: "Gau Seva",
    desc: "We believe serving the cow is the highest form of devotion. Every act of care for the cow is an act of worship.",
  },
  {
    icon: "🙏",
    title: "God Seva",
    desc: "Our service is rooted in the sacred belief that the cow embodies divinity — to serve her is to serve God.",
  },
  {
    icon: "❤️",
    title: "Compassion",
    desc: "Every injured, abandoned, or ill cow deserves love, medical attention, and a safe home to heal.",
  },
  {
    icon: "🌿",
    title: "Healing",
    desc: "We provide medical treatment, rehabilitation equipment, and round-the-clock care for injured cattle.",
  },
];

function FadeInWhenVisible({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial =
    direction === "left" ? { opacity: 0, x: -50 }
    : direction === "right" ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 40 };
  const animate = inView
    ? direction === "left" ? { opacity: 1, x: 0 }
    : direction === "right" ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 }
    : initial;

  return (
    <motion.div ref={ref} initial={initial} animate={animate} transition={{ duration: 0.9, delay }}>
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0700 0%, #1a1000 50%, #0d0700 100%)" }}
    >
      {/* Decorative side lines */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-amber-800/40 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-amber-800/40 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <FadeInWhenVisible>
          <div className="text-center mb-20">
            <span className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our Sacred Purpose
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold text-amber-50 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              About the Trust
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
              <span className="text-amber-500">✦</span>
              <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Text */}
          <FadeInWhenVisible direction="left" delay={0.1}>
            <p className="text-amber-200/70 text-lg leading-relaxed mb-6"
              style={{ fontFamily: "'Lora', serif" }}>
              <span className="text-amber-400 font-bold text-2xl float-left mr-3 mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</span>
              Triveni Gau Sewa Trust was born from a deep-rooted belief in the sanctity of the cow in Indian culture and Hindu tradition. We believe that <em className="text-amber-300">Gau Seva is God Seva</em> — serving the cow is indeed serving the divine.
            </p>
            <p className="text-amber-200/60 text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Lora', serif" }}>
              Our organisation actively rescues injured, ill, and abandoned cows across the region. We provide emergency transport to hospitals, deploy specialised healing machines, and offer around-the-clock veterinary care to ensure every cow gets the treatment she deserves.
            </p>
            <p className="text-amber-200/60 text-base leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}>
              Under the visionary leadership of <span className="text-amber-300 font-semibold">Shri N.K. Bhalla</span>, the Trust has grown into a beacon of compassion, uniting volunteers, donors, and veterinarians in this sacred mission.
            </p>

            {/* Founder card */}
            <FadeInWhenVisible delay={0.3}>
              <div className="mt-10 p-6 border border-amber-800/40 bg-amber-900/10 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-800" />
                <div className="pl-4">
                  <p className="text-amber-400 text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>Founder</p>
                  <h3 className="text-amber-100 text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>Shri N.K. Bhalla</h3>
                  <p className="text-amber-200/50 text-sm"
                    style={{ fontFamily: "'Lora', serif" }}>
                    A lifelong devotee and visionary, Shri Bhalla has dedicated his life to the welfare of cows, bringing together a community bound by love, faith, and service.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </FadeInWhenVisible>

          {/* Right: Image container */}
          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="relative">
                <div className="absolute -inset-4 border border-amber-700/20 rounded-sm" />
                <div className="absolute -inset-8 border border-amber-700/10 rounded-sm" />

                {/* Image container — replace the src below with your actual image */}
                <div className="relative bg-gradient-to-br from-amber-900/30 to-amber-950/50 border border-amber-800/30 rounded-sm overflow-hidden" style={{ minHeight: "320px" }}>
                  {/* Animated rings behind image */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-sm border border-amber-600/10"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 3,
                        delay: i * 0.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  {/*
                    ===================================================
                    ADD YOUR IMAGE HERE
                    Replace the img src below with your actual image path.
                    Example: src="/images/gau-mata.jpg"
                    ===================================================
                  */}
                  <img
                    src="/images/about-image.png"
                    alt="Gau Mata"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "320px" }}
                    onError={(e) => {
                      // Fallback placeholder if image not found
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector(".placeholder-text")) {
                        const ph = document.createElement("div");
                        ph.className = "placeholder-text flex flex-col items-center justify-center text-center p-12 h-full absolute inset-0";
                        ph.innerHTML = `
                          <div class="text-[5rem] mb-4 opacity-50">🐄</div>
                          <div class="text-amber-400/60 text-sm tracking-widest uppercase" style="font-family:'Cormorant Garamond',serif">Add Your Image Here</div>
                          <div class="text-amber-400/30 text-xs mt-2" style="font-family:'Lora',serif">Place image at /public/images/about-image.jpg</div>
                        `;
                        parent.appendChild(ph);
                      }
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-center">
                    <div className="text-amber-400/80 text-sm tracking-widest uppercase"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Gau Mata Ki Jai
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <FadeInWhenVisible delay={0.5}>
                <blockquote className="mt-8 text-center italic text-amber-300/60 text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "गाय हमारी माता है, इसकी सेवा ही ईश्वर सेवा है।"
                  <span className="block text-amber-400/40 text-sm mt-2 not-italic tracking-wider">
                    — The cow is our mother; her service is service to God.
                  </span>
                </blockquote>
              </FadeInWhenVisible>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <FadeInWhenVisible key={v.title} delay={0.1 + i * 0.15}>
              <div className="group relative p-6 border border-amber-800/30 bg-amber-900/10 hover:bg-amber-900/20 hover:border-amber-600/40 transition-all duration-500 rounded-sm overflow-hidden h-full">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-amber-300 font-bold text-lg mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>{v.title}</h3>
                <p className="text-amber-200/50 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lora', serif" }}>{v.desc}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
