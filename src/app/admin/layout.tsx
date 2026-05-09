import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <nav
        className="border-b px-6 h-14 flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-6">
          <span
            className="font-bold text-sm"
            style={{ color: "var(--accent)" }}
          >
            admin panel
          </span>
          <a
            href="/admin"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            dashboard
          </a>
          <a
            href="/admin/projects"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            projects
          </a>
          <a
            href="/admin/certificates"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            certificates
          </a>
          <a
            href="/admin/contacts"
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            contacts
          </a>
        </div>
        <Link href="/" className="text-xs" style={{ color: "var(--muted)" }}>
          ← lihat portfolio
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
