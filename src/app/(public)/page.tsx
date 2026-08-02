import { getProjects, getCertificates } from "@/lib/actions";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

  return <HomeContent projects={projects} certificates={certificates} />;
}
