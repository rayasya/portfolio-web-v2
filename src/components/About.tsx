import Image from "next/image";

export default function About() {
  const skills = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "PostgreSQL",
    "Drizzle ORM",
    "Node.js",
    "Git",
  ];

  const experiences = [
    {
      company: "Nama Perusahaan",
      role: "Frontend Developer",
      period: "2023 - sekarang",
      description: "Deskripsi singkat apa yang kamu kerjakan di sini.",
    },
    {
      company: "Nama Perusahaan 2",
      role: "Web Developer Intern",
      period: "2022 - 2023",
      description: "Deskripsi singkat apa yang kamu kerjakan di sini.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: "var(--muted)" }}
      >
        about me
      </p>
      <h2 className="text-2xl font-bold mb-8">Tentang Aku</h2>

      <div className="flex gap-8 items-start">
        {/* Foto */}
        <Image
          src="https://i.imgur.com/7kFwLzt.jpeg"
          alt="Foto profil"
          width={128}
          height={128}
          className="w-32 h-32 rounded-2xl object-cover shrink-0"
        />

        <div className="flex-1">
          <h3 className="text-xl font-bold">Nama Kamu</h3>
          <p className="text-sm mb-3" style={{ color: "var(--accent)" }}>
            Full-Stack Developer
          </p>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "var(--muted)" }}
          >
            Tulis bio singkat kamu di sini. Ceritain siapa kamu, passion kamu,
            dan apa yang membuat kamu berbeda. Boleh 2-3 kalimat santai aja.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(124,111,247,0.12)",
                  color: "var(--accent)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Experience */}
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)" }}
          >
            pengalaman
          </p>
          <div className="flex flex-col gap-5">
            {experiences.map((exp, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-0.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <div>
                  <h4 className="font-medium text-sm">{exp.role}</h4>
                  <p className="text-xs" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </p>
                  <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                    {exp.period}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
