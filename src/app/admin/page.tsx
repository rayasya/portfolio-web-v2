import { getProjects, getCertificates, getContacts } from "@/lib/actions";

export default async function AdminPage() {
  const projects = await getProjects();
  const certificates = await getCertificates();
  const contacts = await getContacts();
  const unread = contacts.filter((c) => !c.isRead).length;

  const stats = [
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    {
      label: "Certificates",
      value: certificates.length,
      href: "/admin/certificates",
    },
    { label: "Pesan Masuk", value: contacts.length, href: "/admin/contacts" },
    { label: "Belum Dibaca", value: unread, href: "/admin/contacts" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-xl p-5 border block hover:border-current transition-colors"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
              {stat.label}
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--accent)" }}
            >
              {stat.value}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
