import { getContacts, markContactRead } from "@/lib/actions";

export default async function AdminContacts() {
  const contacts = await getContacts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Pesan Masuk</h1>
      <div className="flex flex-col gap-3">
        {contacts.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Belum ada pesan.
          </p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl border"
              style={{
                background: "var(--card)",
                borderColor: contact.isRead ? "var(--border)" : "var(--accent)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{contact.name}</h3>
                    {!contact.isRead && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white"
                        style={{ background: "var(--accent)" }}
                      >
                        baru
                      </span>
                    )}
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                    {contact.email}
                  </p>
                  <p className="text-sm">{contact.message}</p>
                </div>
                {!contact.isRead && (
                  <form
                    action={async () => {
                      "use server";
                      await markContactRead(contact.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs whitespace-nowrap px-3 py-1.5 rounded-lg border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                      }}
                    >
                      tandai dibaca
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
