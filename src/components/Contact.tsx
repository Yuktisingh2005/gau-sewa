"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const WHATSAPP_NUMBER = "+919810292527";

  // Auto-hide success after 5 seconds
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "", message: "" };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Please fill in your name.";
      valid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers.";
      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please fill in your email address.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. you@example.com).";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill in your phone number.";
      valid = false;
    } else if (!/^[+\d][\d\s\-]{6,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (e.g. +91 98765 43210).";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (serverError) setServerError("");
  };

  // Real-time email validation on blur
  const handleEmailBlur = () => {
    const val = formData.email.trim();
    if (!val) {
      setErrors((prev) => ({ ...prev, email: "Please fill in your email address." }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address (e.g. you@example.com)." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setServerError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Unable to send message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Jai Gau Mata 🙏\nI would like to know more about Triveni Gau Sewa Trust and how I can help."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-14 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #100900 0%, #0d0700 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-amber-50 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Get In Touch
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-amber-500">✦</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left: WhatsApp + contact details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* WhatsApp CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openWhatsApp}
              className="group w-full p-4 sm:p-6 border border-green-700/40 bg-green-900/10 hover:bg-green-900/20 hover:border-green-500/60 transition-all duration-400 rounded-sm flex items-center gap-4 sm:gap-5 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 30% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />
              <div className="w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-green-700/20 flex items-center justify-center border border-green-600/30">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-green-300 font-bold text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Chat on WhatsApp
                </div>
                <div className="text-green-400/60 text-xs tracking-wide"
                  style={{ fontFamily: "'Lora', serif" }}>
                  Connect instantly with our team
                </div>
              </div>
              <div className="ml-auto text-green-400/40 group-hover:text-green-400/80 group-hover:translate-x-1 transition-all duration-300">→</div>
            </motion.button>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: "📍", label: "Address", value: "49, ANAND VIHAR, PITAM PURA, DELHI- 110034" },
                { icon: "📞", label: "Phone", value: "+91 9810292527" },
                { icon: "✉️", label: "Email", value: "trivenigausewatrust2026@gmail.com" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{c.icon}</span>
                  <div>
                    <div className="text-amber-400/60 text-xs tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.label}</div>
                    <div className="text-amber-200/70 text-sm"
                      style={{ fontFamily: "'Lora', serif" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Email form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative p-5 sm:p-8 border border-amber-800/30 bg-amber-900/[0.08] rounded-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-800 rounded-l-sm" />

            {submitted ? (
              /* ── Success State — no header, just the thank-you ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-full border-2 border-amber-500/60 bg-amber-900/30 flex items-center justify-center mb-6"
                >
                  <span className="text-4xl">🙏</span>
                </motion.div>

                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-amber-300 text-3xl font-bold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Dhanyavaad!
                </motion.h4>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-amber-200/70 text-base mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  We have received your message.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-amber-200/50 text-sm leading-relaxed max-w-xs"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Our team will get back to you shortly. May Gau Mata bless you and your family. 🐄
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="flex items-center gap-3 mt-8"
                >
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-600" />
                  <span className="text-amber-500 text-sm">✦</span>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-600" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-amber-500/50 text-xs mt-4 tracking-widest uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Gau Sewa · God Sewa
                </motion.p>
              </motion.div>
            ) : (
              <>
                {/* Header — only shown when form is visible */}
                <h3 className="text-amber-200 text-2xl font-bold mb-2 pl-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Send a Message
                </h3>
                <p className="text-amber-200/40 text-sm mb-8 pl-4"
                  style={{ fontFamily: "'Lora', serif" }}>
                  Have a question or want to volunteer? We'd love to hear from you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {[
                    { key: "name", label: "Your Name", type: "text", placeholder: "Shri Ram Kumar" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-amber-400/70 text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={field.key === "email" ? handleEmailBlur : undefined}
                        className={`w-full bg-amber-900/20 border ${
                          errors[field.key as keyof typeof errors]
                            ? "border-red-500/70 focus:border-red-400"
                            : "border-amber-800/40 focus:border-amber-500"
                        } text-amber-100 placeholder-amber-200/20 px-4 py-3 text-sm outline-none transition-colors duration-300 rounded-sm`}
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                      {errors[field.key as keyof typeof errors] && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-red-400/90 text-xs flex items-center gap-1"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          <span>⚠</span> {errors[field.key as keyof typeof errors]}
                        </motion.p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-amber-400/70 text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="How can we help, or how would you like to contribute?"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="w-full bg-amber-900/20 border border-amber-800/40 focus:border-amber-500 text-amber-100 placeholder-amber-200/20 px-4 py-3 text-sm outline-none transition-colors duration-300 resize-none rounded-sm"
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </div>

                  {/* Server error */}
                  {serverError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400/90 text-xs flex items-center gap-1"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <span>⚠</span> {serverError}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-amber-700/60 text-[#1a0f00]/60 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-500 text-[#1a0f00]"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>✉️ Send Message</>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
