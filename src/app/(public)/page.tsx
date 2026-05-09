import Navbar from "@/components/Navbar";
import { getProjects, getCertificates } from "@/lib/actions";
import HomeContent from "../../components/HomeContent";

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

  return (
    <>
      <Navbar />
      <HomeContent projects={projects} certificates={certificates} />
    </>
  );
}
