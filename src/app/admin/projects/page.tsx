import { getProjects } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import AddProjectForm from "@/components/admin/AddProjectForm";
import EditProjectForm from "@/components/admin/EditProjectForm";

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Projects</h1>

      <AddProjectForm />

      <div className="mt-8 flex flex-col gap-3">
        {projects.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Belum ada project.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-xl border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <h3 className="font-medium text-sm">{project.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {project.techStack?.join(", ")}
                </p>
              </div>
              <div className="flex gap-2">
                <EditProjectForm project={project} />
                <DeleteButton id={project.id} type="project" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
