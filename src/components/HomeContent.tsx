"use client";

import ContactForm from "@/components/admin/ContactForm";
import About from "@/components/About";
import CertificateItem, {
  type CertificateData,
} from "@/components/CertificateItem";
import Hero from "@/components/Hero";
import ProjectCard, { type ProjectData } from "@/components/ProjectCard";
import { motion, type Variants } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

type HomeContentProps = {
  projects: ProjectData[];
  certificates: CertificateData[];
};

const shellVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeContent({
  projects,
  certificates,
}: HomeContentProps) {
  return (
    <motion.main
      className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      variants={shellVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-168 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: "color-mix(in srgb, var(--accent) 16%, transparent)",
          }}
        />
        <div
          className="absolute right-12 top-28 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: "color-mix(in srgb, var(--accent2) 14%, transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
      </div>

      <motion.section variants={itemVariants} className="relative z-10">
        <Hero
          name="Halo, aku Ray."
          role="Full-Stack Developer"
          tagline="Membangun web modern yang cepat, terasa premium, dan punya identitas visual yang berani. Fokusku ada di pengalaman pengguna, detail motion, dan sistem UI yang enak dipakai jangka panjang."
        />
      </motion.section>

      <div className="mt-8">
        <About />
      </div>

      <motion.section
        id="projects"
        variants={itemVariants}
        className="mt-8 rounded-4xl border p-6 sm:p-8 lg:p-10"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--card) 90%, transparent) 0%, color-mix(in srgb, var(--background) 96%, transparent) 100%)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              projects
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl">
              Koleksi kerja yang paling mewakili aku
            </h2>
          </div>
          <p
            className="max-w-xl text-sm leading-7"
            style={{ color: "var(--muted)" }}
          >
            Bagian ini dibuat seperti galeri editorial: komposisi tegas, hover
            yang terasa hidup, dan kartu yang tetap rapi di dark mode.
          </p>
        </div>

        {projects.length === 0 ? (
          <div
            className="rounded-4xl border p-8 text-center"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 76%, transparent)",
            }}
          >
            <Sparkles
              className="mx-auto h-10 w-10"
              style={{ color: "var(--accent)" }}
            />
            <p className="mt-4 text-lg font-semibold">Belum ada project.</p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Tambah dari admin panel untuk mengisi galerinya.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        id="certificates"
        variants={itemVariants}
        className="mt-8 rounded-4xl border p-6 sm:p-8 lg:p-10"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--card) 88%, transparent) 0%, color-mix(in srgb, var(--background) 96%, transparent) 100%)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              certificates & achievements
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl">
              Bukti belajar yang terus bergerak
            </h2>
          </div>
          <p
            className="max-w-xl text-sm leading-7"
            style={{ color: "var(--muted)" }}
          >
            Sertifikat dan pencapaian ditata seperti deretan kartu kolektor,
            supaya tetap terasa penting, bukan sekadar daftar biasa.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div
            className="rounded-4xl border p-8 text-center"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 76%, transparent)",
            }}
          >
            <Sparkles
              className="mx-auto h-10 w-10"
              style={{ color: "var(--accent)" }}
            />
            <p className="mt-4 text-lg font-semibold">Belum ada sertifikat.</p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Tambah dari admin panel untuk menampilkan credential dan
              achievement.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {certificates.map((certificate, index) => (
              <CertificateItem
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        id="contact"
        variants={itemVariants}
        className="mt-8 rounded-4xl border p-6 sm:p-8 lg:p-10"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent) 0%, color-mix(in srgb, var(--accent2) 10%, transparent) 100%), var(--card)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              contact
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl">
              Kalau mau bikin sesuatu yang bagus, kita ngobrol
            </h2>
          </div>
          <p
            className="max-w-xl text-sm leading-7 text-right"
            style={{ color: "var(--muted)" }}
          >
            Jalur ini dibikin seperti command panel yang lebih premium, supaya
            form contact tetap terasa sebagai bagian penting dari portofolio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div
            className="rounded-4xl border p-5"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--background) 70%, transparent)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{ borderColor: "var(--border)", color: "var(--accent)" }}
              >
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.25em]"
                  style={{ color: "var(--muted)" }}
                >
                  direct line
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Balas cepat, bahasa santai.
                </p>
              </div>
            </div>

            <p
              className="mt-5 text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              Punya project seru, brief produk, atau ide kolaborasi? Kirim pesan
              lewat form di sebelah. Aku biasanya membalas dengan cepat dan to
              the point.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "freelance",
                "collaboration",
                "product build",
                "frontend polish",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--accent2) 22%, transparent)",
                    background:
                      "color-mix(in srgb, var(--accent2) 8%, transparent)",
                    color: "var(--accent2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  );
}
