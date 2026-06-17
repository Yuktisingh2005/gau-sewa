"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    icon: "🐄",
    title: "Animal Welfare",
    desc: "We believe that every animal deserves love, care, protection, and the opportunity to live a healthy and dignified life.",
  },
  {
    icon: "🙏",
title: "God Seva",
desc: "We believe that serving and protecting animals with compassion is a meaningful way to serve God and humanity."
  },
  {
    icon: "❤️",
    title: "Compassion",
    desc: "Every injured, abandoned, or ill animal deserves love, medical attention, and a safe home to heal.",
  },
  {
    icon: "🌿",
    title: "Healing",
    desc: "We provide medical treatment, recovery support, and dedicated care for injured and sick animals.",
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
              Our organisation actively rescues injured, ill, and abandoned cows and other animals across the region. We provide emergency transport to hospitals, deploy specialised healing machines, and offer around-the-clock veterinary care to ensure every animal gets the treatment it deserves.
            </p>
            <p className="text-amber-200/60 text-base leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}>
              Under the visionary leadership of <span className="text-amber-300 font-semibold">Shri N.K. Bhalla</span>, the Trust has grown into a beacon of compassion, uniting volunteers, donors, and veterinarians in this sacred mission.
            </p>


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

        {/* Founder Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left: Founder portrait image container */}
          <FadeInWhenVisible direction="left" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 border border-amber-700/20 rounded-sm" />
              <div className="absolute -inset-8 border border-amber-700/10 rounded-sm" />
              <div
                className="relative bg-gradient-to-br from-amber-900/30 to-amber-950/50 border border-amber-800/30 rounded-sm overflow-hidden"
                style={{ minHeight: "100px" }}
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-sm border border-amber-600/10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
                <img
                   src="/images/NK.jpeg"
                   alt="Shri N.K. Bhalla"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "200px" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector(".founder-placeholder")) {
                      const ph = document.createElement("div");
                      ph.className = "founder-placeholder flex flex-col items-center justify-center text-center p-12 h-full absolute inset-0";
                      ph.innerHTML = `
                        <div class="text-[5rem] mb-4 opacity-30">🙏</div>
                        <div class="text-amber-400/60 text-sm tracking-widest uppercase" style="font-family:'Cormorant Garamond',serif">Founder's Portrait</div>
                        <div class="text-amber-400/30 text-xs mt-2" style="font-family:'Lora',serif">Place image at /public/images/NK.jpeg</div>
                      `;
                      parent.appendChild(ph);
                    }
                  }}
                />
              
                {/* Corner decorations */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-amber-600/40" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-amber-600/40" />
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right: Founder text */}
          <FadeInWhenVisible direction="right" delay={0.2}>
            <div>
              <span className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The Visionary Behind the Trust
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-amber-50 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Shri N.K. Bhalla
              </h3>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-gradient-to-r from-amber-600 to-transparent" />
                <span className="text-amber-500 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Lora', serif" }}>Founder</span>
              </div>
              <p className="text-amber-200/70 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}>
                A lifelong devotee and visionary, Shri Bhalla has dedicated his life to the welfare of animals, bringing together a community bound by love, faith, and service.
              </p>
              <p className="text-amber-200/60 text-base leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}>
                Driven by a deep belief in kindness and service, he established Triveni Gau Sewa Trust as a place of care and compassion, ensuring that injured, abandoned, and helpless animals receive the love, protection, and treatment they deserve.
              </p>
              <p className="text-amber-200/60 text-base leading-relaxed mb-10"
                style={{ fontFamily: "'Lora', serif" }}>
                Through his dedication and vision, he has brought together volunteers, donors, and veterinarians to work towards a common mission. Today, the Trust stands as a symbol of compassion and animal welfare, touching the lives of thousands of animals and people alike.
              </p>
              {/* Decorative quote */}
              <blockquote className="border-l-2 border-amber-600/60 pl-6 italic text-amber-300/70 text-xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
               "Serving and caring for animals is one of the purest forms of service to God."
                <span className="block text-amber-400/40 text-sm mt-2 not-italic tracking-wider"
                  style={{ fontFamily: "'Lora', serif" }}>
                  — Shri N.K. Bhalla
                </span>
              </blockquote>
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
