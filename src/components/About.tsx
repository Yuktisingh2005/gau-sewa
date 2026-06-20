"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

const values = [
  {
    icon: "🐄",
    title: "Animal Welfare",
    desc: "We believe that every animal deserves love, care, protection, and the opportunity to live a healthy and dignified life.",
    image: "/images/box1.png",
  },
  {
    icon: "🙏",
    title: "God Seva",
    desc: "We believe that serving and protecting animals with compassion is a meaningful way to serve God and humanity.",
    image: "/images/box2.png",
  },
  {
    icon: "❤️",
    title: "Compassion",
    desc: "Every injured, abandoned, or ill animal deserves love, medical attention, and a safe home to heal.",
    image: "/images/box3.png",
  },
  {
    icon: "🌿",
    title: "Healing",
    desc: "We provide medical treatment, recovery support, and dedicated care for injured and sick animals.",
    image: "/images/box4.png",
  },
];

function FadeInWhenVisible({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : direction === "left" ? { opacity: 0, x: -50 }
    : direction === "right" ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 40 };

  const animate = inView
    ? shouldReduceMotion
      ? { opacity: 1 }
      : direction === "left" ? { opacity: 1, x: 0 }
      : direction === "right" ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.9, delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

// A small flickering oil-lamp flame — used as the section's recurring devotional mark
function DiyaFlame({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.65))" }}
      animate={
        shouldReduceMotion
          ? undefined
          : { scale: [1, 1.1, 0.94, 1.06, 1], opacity: [0.85, 1, 0.78, 1, 0.85] }
      }
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M12 2.5c-1.4 2.8-4 5-4 8.3a4 4 0 1 0 8 0c0-3.3-2.6-5.5-4-8.3z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

// Image frame with a subtle cursor-tilt
function TiltGlowFrame({
  src,
  alt,
  fallbackEmoji,
  fallbackTitle,
  fallbackHint,
  minHeight = "320px",
}: {
  src: string;
  alt: string;
  fallbackEmoji: string;
  fallbackTitle: string;
  fallbackHint: string;
  minHeight?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 10 });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div className="relative max-w-sm mx-auto" style={{ perspective: "1000px" }}>
      <div className="absolute -inset-4 border border-amber-700/20 rounded-sm" />
      <div className="absolute -inset-8 border border-amber-700/10 rounded-sm" />

      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative bg-gradient-to-br from-amber-900/30 to-amber-950/50 border border-amber-800/30 rounded-sm overflow-hidden transition-transform duration-300 ease-out will-change-transform"
        style={{ minHeight, transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-sm border border-amber-600/10 pointer-events-none"
            animate={
              shouldReduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }
            }
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ minHeight }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent && !parent.querySelector(".img-placeholder")) {
              const ph = document.createElement("div");
              ph.className = "img-placeholder flex flex-col items-center justify-center text-center p-12 h-full absolute inset-0";
              ph.innerHTML = `
                <div class="text-[5rem] mb-4 opacity-40">${fallbackEmoji}</div>
                <div class="text-amber-400/60 text-sm tracking-widest uppercase" style="font-family:'Cormorant Garamond',serif">${fallbackTitle}</div>
                <div class="text-amber-400/30 text-xs mt-2" style="font-family:'Lora',serif">${fallbackHint}</div>
              `;
              parent.appendChild(ph);
            }
          }}
        />

        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-amber-600/40 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-amber-600/40 pointer-events-none" />
      </div>
    </div>
  );
}

// Value card: a cursor spotlight reveals a faded image only where the pointer is,
// everywhere else stays text-only. Text also brightens on hover.
function ValueCard({ icon, title, desc, image, delay }: {
  icon: string;
  title: string;
  desc: string;
  image: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  const spotlightOn = isHovering && !shouldReduceMotion;

  return (
    <FadeInWhenVisible delay={delay}>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMove}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative p-6 border border-amber-800/30 bg-amber-900/10 hover:bg-amber-900/20 hover:border-amber-600/40 transition-colors duration-500 rounded-sm overflow-hidden h-full flex flex-col items-center text-center"
      >
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Faded image, visible only inside the cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: spotlightOn ? 0.6 : 0,
            WebkitMaskImage: `radial-gradient(circle 130px at ${spot.x}% ${spot.y}%, black 0%, transparent 75%)`,
            maskImage: `radial-gradient(circle 130px at ${spot.x}% ${spot.y}%, black 0%, transparent 75%)`,
          }}
        />

        {/* Warm light tracking the cursor, same spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlightOn ? 1 : 0,
            background: `radial-gradient(circle 150px at ${spot.x}% ${spot.y}%, rgba(245,158,11,0.22), transparent 70%)`,
          }}
        />

        <motion.div
          className="relative z-10 text-3xl mb-4"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.18, rotate: 6 }}
          transition={{ type: "spring", stiffness: 320, damping: 12 }}
        >
          {icon}
        </motion.div>
        <h3
          className="relative z-10 text-amber-300 group-hover:text-amber-100 transition-colors duration-300 font-bold text-lg mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h3>
        <p
          className="relative z-10 text-amber-200/50 group-hover:text-amber-100/85 transition-colors duration-300 text-sm leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {desc}
        </p>
      </div>
    </FadeInWhenVisible>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const flameTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0700 0%, #1a1000 50%, #0d0700 100%)" }}
    >
      {/* Decorative side lines */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-amber-800/40 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-amber-800/40 to-transparent" />

      {/* A small light that travels down the left rule as you scroll through the section */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute left-0 w-2 h-2 rounded-full bg-amber-400 pointer-events-none hidden lg:block"
          style={{
            top: flameTop,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px 4px rgba(245,158,11,0.55)",
          }}
        />
      )}

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <FadeInWhenVisible>
          <div className="text-center mb-20">
            <span
              className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Sacred Purpose
            </span>
            <h2
              className="text-4xl sm:text-6xl font-bold text-amber-50 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              About the Trust
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
              <DiyaFlame className="w-4 h-4 text-amber-500" />
              <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Text */}
          <FadeInWhenVisible direction="left" delay={0.1}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-1 text-amber-500/25 text-7xl leading-none select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "
              </span>
              <p
                className="text-amber-200/70 text-lg leading-relaxed mb-6 pl-6 text-justify"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Triveni Gau Sewa Trust was born from a deep-rooted belief in the sanctity of the cow in Indian culture and Hindu tradition. We believe that{" "}
                <em className="text-amber-300">Gau Seva is God Seva</em> — serving the cow is indeed serving the divine.
              </p>
              <p
                className="text-amber-200/60 text-base leading-relaxed mb-6 text-justify"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Our organisation actively rescues injured, ill, and abandoned cows and other animals across the region. We provide emergency transport to hospitals, deploy specialised healing machines, and offer around-the-clock veterinary care to ensure every animal gets the treatment it deserves.
              </p>
              <p
                className="text-amber-200/60 text-base leading-relaxed text-justify"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Under the visionary leadership of <span className="text-amber-300 font-semibold">Shri N.K. Bhalla</span>, the Trust has grown into a beacon of compassion, uniting volunteers, donors, and veterinarians in this sacred mission.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Right: Image container */}
          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="relative">
              <TiltGlowFrame
                src="/images/about-image.png"
                alt="Gau Mata"
                fallbackEmoji="🐄"
                fallbackTitle="Add Your Image Here"
                fallbackHint="Place image at /public/images/about-image.png"
              />

              {/* Quote */}
              <FadeInWhenVisible delay={0.5}>
                <blockquote
                  className="mt-10 text-center italic text-amber-300/60 text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
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
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Founder portrait image container */}
          <FadeInWhenVisible direction="left" delay={0.1}>
            <TiltGlowFrame
              src="/images/NK.jpeg"
              alt="Shri N.K. Bhalla"
              fallbackEmoji="🙏"
              fallbackTitle="Founder's Portrait"
              fallbackHint="Place image at /public/images/NK.jpeg"
              minHeight="340px"
            />
          </FadeInWhenVisible>

          {/* Right: Founder text */}
          <FadeInWhenVisible direction="right" delay={0.2}>
            <div>
              <span
                className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Visionary Behind the Trust
              </span>
              <h3
                className="text-3xl sm:text-5xl font-bold text-amber-50 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Shri N.K. Bhalla
              </h3>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-gradient-to-r from-amber-600 to-transparent" />
                <span
                  className="text-amber-500 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Founder
                </span>
              </div>
              <p
                className="text-amber-200/70 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                A lifelong devotee and visionary, Shri Bhalla has dedicated his life to the welfare of animals, bringing together a community bound by love, faith, and service.
              </p>
              <p
                className="text-amber-200/60 text-base leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Driven by a deep belief in kindness and service, he established Triveni Gau Sewa Trust as a place of care and compassion, ensuring that injured, abandoned, and helpless animals receive the love, protection, and treatment they deserve.
              </p>
              <p
                className="text-amber-200/60 text-base leading-relaxed mb-10"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Through his dedication and vision, he has brought together volunteers, donors, and veterinarians to work towards a common mission. Today, the Trust stands as a symbol of compassion and animal welfare, touching the lives of thousands of animals and people alike.
              </p>
              {/* Decorative quote */}
              <blockquote
                className="border-l-2 border-amber-600/60 pl-6 italic text-amber-300/70 text-xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "Serving and caring for animals is one of the purest forms of service to God."
                <span
                  className="block text-amber-400/40 text-sm mt-2 not-italic tracking-wider"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  — Shri N.K. Bhalla
                </span>
              </blockquote>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} desc={v.desc} image={v.image} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
