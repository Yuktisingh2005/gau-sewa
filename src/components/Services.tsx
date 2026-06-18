"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    id: 1,
    icon: "🚑",
    image: "/images/service1.jpeg",
    title: "Emergency Rescue & Transport",
    description:
      "We help rescue injured and sick animals and arrange safe transportation to hospitals and treatment centers, ensuring they receive timely medical care.",
    features: ["Emergency assistance", "Transport to hospitals", "Animal welfare support"],
  },
  {
    id: 2,
    icon: "🏥",
    image: "/images/service2.jpeg",
    title: "Veterinary Medical Care",
    description:
      "Our onsite veterinary team provides comprehensive medical treatment including surgery, wound care, medication, and long-term recovery support for all rescued cattle.",
    features: ["In-house veterinarians", "Surgical facilities", "Post-op care"],
  },
  {
    id: 3,
    icon: "⚙️",
    image: "/images/service3.jpeg",
    title: "Healing Machine Support",
    description:
      "We utilise specialised rehabilitation frames and support machines that hold injured or paralysed cows in correct posture, enabling faster healing and muscle recovery.",
    features: ["Bovine slings & frames", "Rehabilitation equipment", "Mobility restoration"],
  },
  {
    id: 4,
    icon: "🌾",
    image: "/images/service4.jpeg",
    title: "Feed & Nutrition Programme",
    description:
      "Rescued cows receive nutritious meals tailored to their health condition, with green fodder, mineral supplements, and medicinal herbs sourced locally.",
    features: ["Daily nutritious feed", "Herbal medicine", "Mineral supplements"],
  },
  {
    id: 5,
    icon: "🏡",
    image: "/images/service5.jpeg",
    title: "Gaushala & Shelter",
    description:
      "Our Gaushala provides a safe, loving home for cows that cannot return to the wild — a sacred space where they live with dignity, comfort, and care for life.",
    features: ["Permanent shelter", "Clean environment", "Loving caretakers"],
  },
  {
    id: 6,
    icon: "🤝",
    image: "/images/service6.jpeg",
    title: "Free Animal Care Services",
    description:
      "We provide free support and assistance for injured, sick, and abandoned animals, ensuring they receive the care and attention they need.",
    features: ["Free assistance", "Animal care support", "Compassionate service"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative border border-amber-800/30 bg-amber-900/[0.08] hover:bg-amber-900/20 hover:border-amber-600/50 transition-all duration-500 rounded-sm overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />

      {/* Image container */}
      <div className="relative w-full h-48 border-b border-amber-800/20 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-amber-600/40" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-amber-600/40" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-amber-200 font-bold text-xl mb-3 group-hover:text-amber-300 transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {service.title}
        </h3>
        <p className="text-amber-200/50 text-sm leading-relaxed mb-5"
          style={{ fontFamily: "'Lora', serif" }}>
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-amber-300/60"
              style={{ fontFamily: "'Lora', serif" }}>
              <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0700 0%, #150c00 60%, #0d0700 100%)" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />

  

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="text-amber-500 text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            What We Do
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-amber-50 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Sacred Services
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-amber-500">✦</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
          <p className="text-amber-200/50 max-w-2xl mx-auto text-base"
            style={{ fontFamily: "'Lora', serif" }}>
            From emergency rescue to lifelong shelter, we offer comprehensive care for injured, ill, and abandoned animals with devotion and expertise.
          </p>
        </motion.div>

        {/* Services grid — each card animates independently on scroll */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
