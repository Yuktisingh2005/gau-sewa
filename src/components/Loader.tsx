"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOAD_DURATION = 5000;

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const pct = Math.min(((now - start) / LOAD_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
          onDone?.();
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 38%, #3d1f00 0%, #1a0f00 45%, #0d0700 100%)",
          }}
        >
          {/* Sacred mandala texture, same as Hero */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3Cpath d='M100 10 L190 100 L100 190 L10 100 Z' fill='none' stroke='%23f59e0b' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Ambient glow breathing behind the scene */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.16) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating dust / sacred motes */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${8 + ((i * 37) % 84)}%`,
                top: `${15 + ((i * 53) % 70)}%`,
                background: "rgba(245,158,11,0.5)",
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.6, 0.15],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Self-drawing cow outline */}
            <div className="relative" style={{ width: 280, height: 214 }}>
              <CowGrazingSVG />
            </div>


            {/* Ground line */}
            <div
              className="w-[200px] h-[1px] -mt-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
              }}
            />

            {/* Trust name */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-amber-50 mt-8 text-center leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Triveni
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #f59e0b, #fbbf24, #d97706)",
                }}
              >
                Gau Sewa Trust
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="text-amber-200/50 text-xs sm:text-sm tracking-[0.3em] uppercase mt-3"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Serving Cow, Serving Humanity
            </motion.p>

            {/* Progress bar */}
            <div className="mt-8 w-[180px] h-[2px] bg-amber-900/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)",
                }}
                transition={{ ease: "linear" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-amber-500/40 text-[10px] tracking-[0.4em] uppercase mt-4"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Jai Gau Mata
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Decorative pieces ---------- */

// Shared draw-cycle: each stroke animates pathLength 0 -> 1 -> 1 -> 0 in sync,
// so the whole cow appears to trace itself, hold, fade, and redraw.
const drawTransition = {
  duration: 4.4,
  times: [0, 0.55, 0.85, 1],
  repeat: Infinity,
  ease: "easeInOut" as const,
};
const drawAnimate = { pathLength: [0, 1, 1, 0], opacity: [0.35, 1, 1, 0.35] };

function CowGrazingSVG() {
  return (
    <svg
      viewBox="0 0 550 419"
      width="280"
      height="214"
      fill="none"
      style={{ filter: "drop-shadow(0 4px 14px rgba(245,158,11,0.25))" }}
    >
      <g stroke="#f5b94d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Body, back hump, dewlap, legs, tail */}
        <motion.path d="M 410.0,100.0 C 412.0,105.8 403.3,133.5 400.0,143.0 C 396.7,152.5 389.0,154.7 390.0,157.0 C 391.0,159.3 401.8,151.7 406.0,157.0 C 410.2,162.3 409.5,177.8 415.0,189.0 C 420.5,200.2 436.0,215.5 439.0,224.0 C 442.0,232.5 434.3,234.5 433.0,240.0 C 431.7,245.5 432.2,252.8 431.0,257.0 C 429.8,261.2 428.5,263.2 426.0,265.0 C 423.5,266.8 418.5,266.7 416.0,268.0 C 413.5,269.3 413.0,268.5 411.0,273.0 C 409.0,277.5 406.2,290.3 404.0,295.0 C 401.8,299.7 402.8,300.0 398.0,301.0 C 393.2,302.0 381.7,299.3 375.0,301.0 C 368.3,302.7 362.7,309.2 358.0,311.0 C 353.3,312.8 351.0,313.5 347.0,312.0 C 343.0,310.5 334.7,307.5 334.0,302.0 C 333.3,296.5 338.3,287.3 343.0,279.0 C 347.7,270.7 358.8,257.7 362.0,252.0 C 365.2,246.3 363.0,243.8 362.0,245.0 C 361.0,246.2 360.2,252.2 356.0,259.0 C 351.8,265.8 341.3,277.5 337.0,286.0 C 332.7,294.5 331.3,301.8 330.0,310.0 C 328.7,318.2 330.2,328.3 329.0,335.0 C 327.8,341.7 323.5,342.7 323.0,350.0 C 322.5,357.3 326.2,373.5 326.0,379.0 C 325.8,384.5 322.2,382.8 322.0,383.0 C 321.8,383.2 322.8,377.8 325.0,380.0 C 327.2,382.2 333.7,392.8 335.0,396.0 C 336.3,399.2 337.7,397.5 333.0,399.0 C 328.3,400.5 311.0,405.7 307.0,405.0 C 303.0,404.3 309.3,398.2 309.0,395.0 C 308.7,391.8 305.2,393.3 305.0,386.0 C 304.8,378.7 308.5,359.8 308.0,351.0 C 307.5,342.2 303.8,345.2 302.0,333.0 C 300.2,320.8 299.3,292.8 297.0,278.0 C 294.7,263.2 288.3,241.8 288.0,244.0 C 287.7,246.2 297.8,285.2 295.0,291.0 C 292.2,296.8 278.8,281.0 271.0,279.0 C 263.2,277.0 256.7,278.2 248.0,279.0 C 239.3,279.8 230.3,283.5 219.0,284.0 C 207.7,284.5 188.8,283.3 180.0,282.0 C 171.2,280.7 171.3,279.3 166.0,276.0 C 160.7,272.7 153.5,265.3 148.0,262.0 C 142.5,258.7 137.5,256.7 133.0,256.0 C 128.5,255.3 124.7,256.7 121.0,258.0 C 117.3,259.3 114.0,261.5 111.0,264.0 C 108.0,266.5 105.5,268.8 103.0,273.0 C 100.5,277.2 98.3,279.0 96.0,289.0 C 93.7,299.0 90.2,323.2 89.0,333.0 C 87.8,342.8 87.2,340.3 89.0,348.0 C 90.8,355.7 96.5,372.0 100.0,379.0 C 103.5,386.0 112.5,385.8 110.0,390.0 C 107.5,394.2 89.3,404.2 85.0,404.0 C 80.7,403.8 85.7,393.3 84.0,389.0 C 82.3,384.7 77.2,384.8 75.0,378.0 C 72.8,371.2 72.8,357.0 71.0,348.0 C 69.2,339.0 66.3,330.2 64.0,324.0 C 61.7,317.8 59.8,314.8 57.0,311.0 C 54.2,307.2 47.5,305.3 47.0,301.0 C 46.5,296.7 52.8,290.2 54.0,285.0 C 55.2,279.8 58.8,286.8 54.0,270.0 C 49.2,253.2 29.7,204.7 25.0,184.0 C 20.3,163.3 24.0,155.7 26.0,146.0 C 28.0,136.3 36.8,127.5 37.0,126.0 C 37.2,124.5 29.8,129.8 27.0,137.0 C 24.2,144.2 21.0,147.7 20.0,169.0 C 19.0,190.3 21.3,243.5 21.0,265.0 C 20.7,286.5 19.5,292.8 18.0,298.0 C 16.5,303.2 12.3,306.3 12.0,296.0 C 11.7,285.7 16.7,255.3 16.0,236.0 C 15.3,216.7 9.3,193.3 8.0,180.0 C 6.7,166.7 6.7,163.7 8.0,156.0 C 9.3,148.3 13.3,139.0 16.0,134.0 C 18.7,129.0 16.7,130.8 24.0,126.0 C 31.3,121.2 47.5,110.0 60.0,105.0 C 72.5,100.0 85.3,97.0 99.0,96.0 C 112.7,95.0 121.7,94.7 142.0,99.0 C 162.3,103.3 203.0,118.2 221.0,122.0 C 239.0,125.8 239.8,123.2 250.0,122.0 C 260.2,120.8 274.8,117.3 282.0,115.0 C 289.2,112.7 288.7,112.2 293.0,108.0 C 297.3,103.8 303.7,93.7 308.0,90.0 C 312.3,86.3 313.8,86.2 319.0,86.0 C 324.2,85.8 331.8,85.8 339.0,89.0 C 346.2,92.2 356.2,101.7 362.0,105.0 C 367.8,108.3 369.7,108.5 374.0,109.0 C 378.3,109.5 382.0,109.5 388.0,108.0 C 394.0,106.5 408.0,94.2 410.0,100.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Head, ear, far horn, jaw */}
        <motion.path d="M 463.0,53.0 C 465.0,53.3 467.0,53.5 470.0,56.0 C 473.0,58.5 476.3,64.5 481.0,68.0 C 485.7,71.5 494.7,70.8 498.0,77.0 C 501.3,83.2 497.7,96.0 501.0,105.0 C 504.3,114.0 512.0,123.5 518.0,131.0 C 524.0,138.5 537.3,145.3 537.0,150.0 C 536.7,154.7 520.2,156.3 516.0,159.0 C 511.8,161.7 512.7,163.2 512.0,166.0 C 511.3,168.8 511.2,172.8 512.0,176.0 C 512.8,179.2 517.3,183.3 517.0,185.0 C 516.7,186.7 512.2,186.7 510.0,186.0 C 507.8,185.3 506.7,184.8 504.0,181.0 C 501.3,177.2 496.0,165.8 494.0,163.0 C 492.0,160.2 491.8,162.3 492.0,164.0 C 492.2,165.7 496.7,172.7 495.0,173.0 C 493.3,173.3 488.8,168.0 482.0,166.0 C 475.2,164.0 460.8,163.0 454.0,161.0 C 447.2,159.0 444.5,156.8 441.0,154.0 C 437.5,151.2 433.8,144.3 433.0,144.0 C 432.2,143.7 434.3,149.7 436.0,152.0 C 437.7,154.3 437.5,155.5 443.0,158.0 C 448.5,160.5 466.0,163.8 469.0,167.0 C 472.0,170.2 462.7,171.0 461.0,177.0 C 459.3,183.0 461.0,196.5 459.0,203.0 C 457.0,209.5 454.3,218.8 449.0,216.0 C 443.7,213.2 432.5,197.3 427.0,186.0 C 421.5,174.7 415.5,156.3 416.0,148.0 C 416.5,139.7 427.3,141.2 430.0,136.0 C 432.7,130.8 430.7,122.2 432.0,117.0 C 433.3,111.8 439.3,105.2 438.0,105.0 C 436.7,104.8 429.7,109.8 424.0,116.0 C 418.3,122.2 407.5,138.2 404.0,142.0 C 400.5,145.8 402.5,142.3 403.0,139.0 C 403.5,135.7 404.5,127.3 407.0,122.0 C 409.5,116.7 415.7,111.3 418.0,107.0 C 420.3,102.7 419.8,98.2 421.0,96.0 C 422.2,93.8 424.8,94.8 425.0,94.0 C 425.2,93.2 420.3,93.0 422.0,91.0 C 423.7,89.0 432.7,85.5 435.0,82.0 C 437.3,78.5 436.5,73.3 436.0,70.0 C 435.5,66.7 431.2,63.7 432.0,62.0 C 432.8,60.3 438.7,61.3 441.0,60.0 C 443.3,58.7 443.5,54.8 446.0,54.0 C 448.5,53.2 453.0,53.8 456.0,55.0 C 459.0,56.2 463.7,61.2 464.0,61.0 C 464.3,60.8 458.2,55.3 458.0,54.0 C 457.8,52.7 461.0,52.7 463.0,53.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Nostril / muzzle detail */}
        <motion.path d="M 390.0,23.0 C 392.0,23.7 398.5,44.8 402.0,51.0 C 405.5,57.2 405.8,57.3 411.0,60.0 C 416.2,62.7 429.5,63.3 433.0,67.0 C 436.5,70.7 435.7,80.5 432.0,82.0 C 428.3,83.5 416.5,78.8 411.0,76.0 C 405.5,73.2 402.5,69.8 399.0,65.0 C 395.5,60.2 391.5,54.0 390.0,47.0 C 388.5,40.0 388.0,22.3 390.0,23.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Neck cord holding the bell */}
        <motion.path d="M 413.0,150.0 C 416.3,155.5 421.7,180.2 428.0,192.0 C 434.3,203.8 448.2,215.5 451.0,221.0 C 453.8,226.5 448.7,227.0 445.0,225.0 C 441.3,223.0 433.8,215.5 429.0,209.0 C 424.2,202.5 419.5,194.3 416.0,186.0 C 412.5,177.7 408.5,165.0 408.0,159.0 C 407.5,153.0 409.7,144.5 413.0,150.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Hanging bell */}
        <motion.path d="M 542.0,152.0 C 546.7,151.3 545.2,153.7 546.0,157.0 C 546.8,160.3 550.7,167.3 547.0,172.0 C 543.3,176.7 528.7,183.0 524.0,185.0 C 519.3,187.0 520.7,185.5 519.0,184.0 C 517.3,182.5 514.8,179.0 514.0,176.0 C 513.2,173.0 512.8,166.5 514.0,166.0 C 515.2,165.5 518.5,172.0 521.0,173.0 C 523.5,174.0 527.5,172.5 529.0,172.0 C 530.5,171.5 531.8,171.8 530.0,170.0 C 528.2,168.2 516.0,164.0 518.0,161.0 C 520.0,158.0 537.3,152.7 542.0,152.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Front horn tip */}
        <motion.path d="M 448.0,229.0 C 451.2,228.2 456.3,233.5 459.0,237.0 C 461.7,240.5 463.2,246.5 464.0,250.0 C 464.8,253.5 466.0,255.7 464.0,258.0 C 462.0,260.3 455.7,263.3 452.0,264.0 C 448.3,264.7 444.0,265.7 442.0,262.0 C 440.0,258.3 439.0,247.5 440.0,242.0 C 441.0,236.5 444.8,229.8 448.0,229.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
        {/* Eyebrow / eye line */}
        <motion.path d="M 444.0,94.0 C 442.8,95.3 446.0,95.8 448.0,95.0 C 450.0,94.2 453.3,90.0 456.0,89.0 C 458.7,88.0 461.8,88.3 464.0,89.0 C 466.2,89.7 467.7,91.3 469.0,93.0 C 470.3,94.7 471.3,96.8 472.0,99.0 C 472.7,101.2 472.2,104.3 473.0,106.0 C 473.8,107.7 476.0,108.7 477.0,109.0 C 478.0,109.3 479.3,108.7 479.0,108.0 C 478.7,107.3 475.8,106.5 475.0,105.0 C 474.2,103.5 474.7,101.2 474.0,99.0 C 473.3,96.8 472.5,94.0 471.0,92.0 C 469.5,90.0 467.7,87.8 465.0,87.0 C 462.3,86.2 458.5,85.8 455.0,87.0 C 451.5,88.2 445.2,92.7 444.0,94.0 Z" initial={{ pathLength: 0 }} animate={drawAnimate} transition={drawTransition} />
      </g>
    </svg>
  );
}
