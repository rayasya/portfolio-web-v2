"use client";

import { ProjectData } from "@/components/ProjectCard";
import { CertificateData } from "@/components/CertificateItem";
import TerminalWorkspace from "@/components/TerminalWorkspace";

type HomeContentProps = {
  projects: ProjectData[];
  certificates: CertificateData[];
};

export default function HomeContent({
  projects,
  certificates,
}: HomeContentProps) {
  return <TerminalWorkspace projects={projects} certificates={certificates} />;
}
