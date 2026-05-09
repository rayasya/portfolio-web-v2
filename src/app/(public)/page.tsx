import Navbar from "@/components/Navbar";
import { getProjects, getCertificates } from "@/lib/actions";
import ContactForm from "@/components/admin/ContactForm";
import Image from "next/image";

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-24">
        {/* Hero */}
        <section className="py-20">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ color: "var(--accent2)" }}
          >
            available for work
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-4">
            Halo, aku
            <br />
            <span style={{ color: "var(--accent)" }}>Full-Stack Dev</span>
            <br />
            dari Indonesia 👋
          </h1>
          <p
            className="text-lg mb-8 max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            Membangun web modern yang cepat, fungsional, dan enak dipandang.
          </p>
          <div className="flex gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white"
              style={{ background: "var(--accent)" }}
            >
              lihat projects →
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg text-sm border"
              style={{ borderColor: "var(--border)" }}
            >
              hubungi aku
            </a>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-16 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "var(--muted)" }}
          >
            projects
          </p>
          <h2 className="text-2xl font-bold mb-8">Yang sudah kubuat</h2>
          {projects.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Belum ada project. Tambah dari admin panel!
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border overflow-hidden"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                      width={800}
                      height={160}
                    />
                  ) : (
                    <div
                      className="w-full h-40 flex items-center justify-center"
                      style={{ background: "rgba(124,111,247,0.08)" }}
                    >
                      <span className="text-3xl">🖥️</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(124,111,247,0.12)",
                            color: "var(--accent)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="text-xs underline"
                          style={{ color: "var(--accent)" }}
                        >
                          live →
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          className="text-xs underline"
                          style={{ color: "var(--muted)" }}
                        >
                          github →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Certificates */}
        <section
          id="certificates"
          className="py-16 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "var(--muted)" }}
          >
            certificates & achievements
          </p>
          <h2 className="text-2xl font-bold mb-8">Pencapaian</h2>
          {certificates.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Belum ada sertifikat. Tambah dari admin panel!
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: "rgba(124,111,247,0.12)" }}
                  >
                    {cert.type === "achievement" ? "🏆" : "📜"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{cert.title}</h4>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      className="text-xs"
                      style={{ color: "var(--accent)" }}
                    >
                      verify →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-16 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "var(--muted)" }}
          >
            contact
          </p>
          <h2 className="text-2xl font-bold mb-8">Hubungi aku</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
