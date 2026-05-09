"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

type HeroProps = {
  name: string;
  role: string;
  tagline: string;
};

export default function Hero({ name, role, tagline }: HeroProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const shellVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.section
      ref={ref}
      id="home"
      className="relative overflow-hidden rounded-[2.4rem] border p-6 sm:p-8 lg:p-10"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--card) 88%, transparent) 0%, color-mix(in srgb, var(--background) 96%, transparent) 100%)",
      }}
      variants={shellVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={{
            y: floatY,
            background: "color-mix(in srgb, var(--accent) 16%, transparent)",
          }}
          className="absolute -left-14 top-10 h-44 w-44 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            y: driftY,
            background: "color-mix(in srgb, var(--accent2) 18%, transparent)",
          }}
          className="absolute right-4 top-20 h-56 w-56 rounded-full blur-3xl"
          animate={{ scale: [1, 0.94, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative grid gap-10">
        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.3em] "
            style={{ borderColor: "var(--border)", color: "green" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Open For Work
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl leading-[0.92] tracking-tighter sm:text-6xl lg:text-[5.8rem]"
            >
              {name}
              <span className="block" style={{ color: "var(--accent)" }}>
                {role}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base leading-7 sm:text-lg"
              style={{ color: "var(--muted)" }}
            >
              {tagline}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 140%)",
                boxShadow:
                  "0 16px 40px color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            >
              Lihat karya
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
                background: "color-mix(in srgb, var(--card) 72%, transparent)",
              }}
            >
              Hubungi aku
            </a>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
                background: "color-mix(in srgb, var(--card) 72%, transparent)",
              }}
            >
              Download CV
            </a>

            <a
              href="/portfolio.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
                background: "color-mix(in srgb, var(--card) 72%, transparent)",
              }}
            >
              Download Portfolio
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
