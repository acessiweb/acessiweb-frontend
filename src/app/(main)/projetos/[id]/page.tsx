import { Metadata } from "next/types";
import Project from "./Project";
import { ParamsPromise } from "@/types/params";
import { getProject } from "@/routes/projects";

export const metadata: Metadata = {
  title: "Meus projetos",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (project && "id" in project) {
    return (
      <Project
        project={project}
        crumbs={[
          {
            desc: "PROJETOS",
            link: "/projetos",
          },
          {
            desc: project.name,
            link: `/projetos/${project.id}`,
          },
        ]}
      />
    );
  }

  return;
}
