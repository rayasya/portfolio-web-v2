import { getCertificates } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import AddCertificateForm from "@/components/admin/AddCertificateForm";

export default async function AdminCertificates() {
  const certificates = await getCertificates();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Certificates & Achievements</h1>

      <AddCertificateForm />

      <div className="mt-8 flex flex-col gap-3">
        {certificates.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Belum ada sertifikat.
          </p>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-4 rounded-xl border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <h3 className="font-medium text-sm">{cert.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              <DeleteButton id={cert.id} type="certificate" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
