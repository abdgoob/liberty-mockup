"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Leaf } from "lucide-react";

const LOADER_DURATION = 4.4;
const DROP_PATH =
  "M150 14C137 54 58 144 58 226C58 294 99 342 150 342C201 342 242 294 242 226C242 144 163 54 150 14Z";

const BUBBLES = [
  { left: "12%", top: "25%", size: 18, delay: 0.1, duration: 4.8 },
  { left: "22%", top: "68%", size: 9, delay: 0.8, duration: 4.2 },
  { left: "33%", top: "16%", size: 7, delay: 1.2, duration: 3.8 },
  { left: "70%", top: "20%", size: 12, delay: 0.4, duration: 4.5 },
  { left: "78%", top: "62%", size: 20, delay: 1, duration: 5.2 },
  { left: "88%", top: "38%", size: 8, delay: 0.2, duration: 4 },
];

function BubblePercentage({ progress }: { progress: MotionValue<number> }) {
  const [count, setCount] = useState(1);

  useMotionValueEvent(progress, "change", (latest) => {
    const nextCount = Math.min(100, Math.max(1, Math.round(latest)));
    setCount((current) => (current === nextCount ? current : nextCount));
  });

  return (
    <span
      className="flex max-w-[82%] items-center justify-center gap-1"
      aria-label={`${count} percent`}
    >
      {String(count)
        .split("")
        .map((digit, index) => (
          <span
            key={`${index}-${digit}`}
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/35 bg-white/12 font-sans text-xl font-bold leading-none text-white shadow-[inset_2px_3px_7px_rgba(255,255,255,0.18),0_5px_14px_rgba(4,36,38,0.18)] tabular-nums backdrop-blur-[2px] sm:size-10 sm:text-2xl"
          >
            {digit}
          </span>
        ))}
      <span aria-hidden="true" className="ml-0.5 shrink-0 font-sans text-base font-semibold text-white/90 sm:text-lg">
        %
      </span>
    </span>
  );
}

export default function WaterEntryLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(1);
  const waterY = useTransform(progress, [1, 100], [332, 0]);
  const waterThemeOpacity = useTransform(progress, [1, 55, 100], [0, 0.45, 1]);
  const glowOpacity = useTransform(progress, [1, 100], [0.04, 0.26]);
  const lineProgress = useTransform(progress, [1, 100], [0.01, 1]);

  useEffect(() => {
    let exitTimer: number | undefined;

    if (reduceMotion) {
      progress.set(100);
      exitTimer = window.setTimeout(() => setVisible(false), 180);
      return () => window.clearTimeout(exitTimer);
    }

    const progressAnimation = animate(progress, 100, {
      duration: LOADER_DURATION,
      ease: "linear",
      onComplete: () => {
        exitTimer = window.setTimeout(() => setVisible(false), 520);
      },
    });

    return () => {
      progressAnimation.stop();
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, [progress, reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={false}
          exit={reduceMotion ? { opacity: 0 } : { y: "-118%" }}
          transition={
            reduceMotion
              ? { duration: 0.16 }
              : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }
          className="fixed inset-0 z-[100] flex flex-col bg-forest text-cream will-change-transform"
          aria-label="Loading Liberty Landscapes"
          aria-busy="true"
        >
          <motion.div
            style={{ opacity: waterThemeOpacity }}
            className="pointer-events-none absolute inset-0 bg-[#0b5964] will-change-[opacity]"
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:22px_22px]" />
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(183,226,222,0.36),transparent_68%)]"
            />
            <div className="absolute -right-36 -top-40 size-[31rem] rounded-full border border-white/8" />
            <div className="absolute -bottom-52 -left-40 size-[36rem] rounded-full border border-white/8" />
            {BUBBLES.map((bubble) => (
              <motion.span
                key={`${bubble.left}-${bubble.top}`}
                className="absolute rounded-full border border-white/24 bg-white/[0.035] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.14)] will-change-transform"
                style={{
                  left: bubble.left,
                  top: bubble.top,
                  width: bubble.size,
                  height: bubble.size,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [8, -18, 8], scale: [0.88, 1.06, 0.88], opacity: [0.28, 0.68, 0.28] }
                }
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-white/20 bg-white/8 text-brass">
                <Leaf className="size-4" strokeWidth={1.7} />
              </span>
              <span className="font-display text-lg font-medium tracking-[0.04em] text-white/80">
                Liberty Landscapes
              </span>
            </div>
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40 sm:block">
              Make more of outside
            </span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-12 sm:pb-16">
            <p className="font-display mb-4 text-xl font-medium tracking-[0.08em] text-sage-200 sm:mb-6 sm:text-2xl">
              Growing your experience
            </p>

            <div className="relative aspect-[5/6] w-56 sm:w-72">
              <svg
                viewBox="0 0 300 360"
                className="absolute inset-0 size-full overflow-visible drop-shadow-[0_30px_50px_rgba(1,20,22,0.28)]"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="liberty-water-drop">
                    <path d={DROP_PATH} />
                  </clipPath>
                  <linearGradient id="water-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b7e2de" />
                    <stop offset="100%" stopColor="#72b8b4" />
                  </linearGradient>
                </defs>

                <path d={DROP_PATH} fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.34)" strokeWidth="2" />

                <g clipPath="url(#liberty-water-drop)">
                  <motion.g style={{ y: waterY }}>
                    <rect x="0" y="12" width="300" height="370" fill="url(#water-fill)" />
                    <motion.path
                      d="M-30 14C8 -2 36 0 70 12C105 25 132 25 168 12C205 -2 235 -2 274 12C297 20 315 20 338 12V38H-30Z"
                      fill="#d2eeeb"
                      animate={reduceMotion ? undefined : { x: [-24, 0, -24] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M-38 20C0 7 35 7 72 20C105 31 139 31 174 18C207 6 244 7 278 20C304 30 324 27 344 18V42H-38Z"
                      fill="rgba(255,255,255,0.22)"
                      animate={reduceMotion ? undefined : { x: [0, -22, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.g>
                </g>

                <path
                  d={DROP_PATH}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
              </svg>

              <div className="absolute left-1/2 top-[56%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <BubblePercentage progress={progress} />
              </div>
            </div>

            <p className="mt-4 text-xs font-medium tracking-wide text-white/50">
              Filling your landscape with possibility
            </p>
          </div>

          <div className="relative px-6 pb-7 sm:px-10 sm:pb-9">
            <div className="h-px overflow-hidden bg-white/15">
              <motion.div
                style={{ scaleX: lineProgress }}
                className="h-full origin-left bg-[#b7e2de]"
              />
            </div>
          </div>

          {!reduceMotion ? (
            <>
              <div className="pointer-events-none absolute top-full left-0 h-32 w-full text-[#0b5964]">
                <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="size-full" aria-hidden="true">
                  <path
                    d="M0 0H1440V34C1335 70 1242 9 1126 39C1014 68 922 111 802 70C681 29 594 5 474 43C346 83 242 103 123 56C74 37 34 32 0 47V0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {[
                { left: "13%", bottom: -74, size: 18, delay: 0.1 },
                { left: "31%", bottom: -96, size: 11, delay: 0.35 },
                { left: "67%", bottom: -82, size: 16, delay: 0.2 },
                { left: "84%", bottom: -108, size: 9, delay: 0.5 },
              ].map((splash) => (
                <motion.span
                  key={splash.left}
                  className="pointer-events-none absolute rounded-full bg-[#0b5964]"
                  style={{
                    left: splash.left,
                    bottom: splash.bottom,
                    width: splash.size,
                    height: splash.size * 1.35,
                  }}
                  animate={{ y: [0, -12, 0], scale: [1, 0.82, 1] }}
                  transition={{
                    duration: 1.5,
                    delay: splash.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
