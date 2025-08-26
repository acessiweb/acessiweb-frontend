import { Metadata } from "next/types";
import { ParamsPromise } from "@/types/params";
import { getProject } from "@/routes/projects";
import AddEditProject from "../../_components/AddEditProject";

export const metadata: Metadata = {
  title: "Meus projetos",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getProject(id);

  if (res.ok && "data" in res) {
    return (
      <AddEditProject
        project={res.data}
        crumbs={[
          {
            desc: "PROJETOS",
            link: "/projetos",
          },
          {
            desc: `EDITAR ${res.data.name}`,
            link: `/projetos/${res.data.id}/editar`,
          },
        ]}
        isEditPage={true}
      />
    );
  }

  return;
}
