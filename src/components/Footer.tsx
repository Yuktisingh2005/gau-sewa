"use client";

const MAP_URL = "https://www.google.com/maps?q=28.6927251,77.1265766&z=17&hl=en";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#080400" }}
    >
      {/* Top divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-30 h-30 rounded-full border-2 border-amber-600/50 bg-amber-900/20 flex items-center justify-center overflow-hidden">
                <img src="/images/logo.png" alt="Triveni Gau Sewa Trust" className="w-full h-full object-cover scale-110 -translate-x-0.1" />
              </div>
              <div>
                <div className="text-amber-200 font-bold text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Triveni Gau Sewa Trust
                </div>
                <div className="text-amber-500/60 text-xs tracking-[0.2em] uppercase mt-0.5"
                  style={{ fontFamily: "'Lora', serif" }}>
                  Serving Cow, Serving Humanity
                </div>
              </div>
            </div>
            <p className="text-amber-200/40 text-sm leading-relaxed mb-6 max-w-sm"
              style={{ fontFamily: "'Lora', serif" }}>
              A sacred trust dedicated to the rescue, healing, and lifelong care of cows and other animals.
              Guided by the principle that <em>Gau Seva is God Seva</em>, we serve with devotion.
            </p>
            <blockquote className="italic text-amber-400/50 text-sm border-l-2 border-amber-700/50 pl-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "गाव हमारी माता है"
            </blockquote>
          </div>

          {/* Google Map */}
          <div>
            <h4 className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-6 font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Find Us
            </h4>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative overflow-hidden rounded-sm border border-amber-800/40 hover:border-amber-500/60 transition-all duration-300"
              style={{ height: "160px" }}
            >
              <iframe
                src="https://maps.google.com/maps?q=28.6927251,77.1265766&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(60%) hue-rotate(10deg) saturate(80%) brightness(0.75)", pointerEvents: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay — clicking opens Google Maps */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-amber-900/0 group-hover:bg-amber-900/50 transition-all duration-300">
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">📍</span>
                <span className="text-amber-300 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontFamily: "'Lora', serif" }}>Open in Maps</span>
              </div>
            </a>
          
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-6 font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-amber-200/50" style={{ fontFamily: "'Lora', serif" }}>
              <li className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">📍</span>
                <span>49, ANAND VIHAR, PITAM PURA, DELHI- 110034</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">📞</span>
                <span>+91 9810292527</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">✉️</span>
                <span>trivenigausewatrust2026@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-900/60 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-200/30 text-xs"
          style={{ fontFamily: "'Lora', serif" }}>
          <p>© {new Date().getFullYear()} Triveni Gau Sewa Trust. All rights reserved.</p>
          <div className="flex items-center gap-2 text-amber-500/40">
            <span>🐄</span>
            <span className="tracking-widest uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Gau Sewa · God Sewa
            </span>
            <span>🐄</span>
          </div>
          <p>Made with 🙏 for Gau Mata</p>
        </div>
      </div>
    </footer>
  );
}
