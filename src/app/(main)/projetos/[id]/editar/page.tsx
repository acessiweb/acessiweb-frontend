import { Metadata } from "next/types";
import EditProject from "./EditProject";
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
      <EditProject
        project={project}
        crumbs={[
          {
            desc: "PROJETOS",
            link: "/projetos",
          },
          {
            desc: `EDITAR ${project.name}`,
            link: `/projetos/${project.id}/editar`,
          },
        ]}
      />
    );
  }

  return;
}
