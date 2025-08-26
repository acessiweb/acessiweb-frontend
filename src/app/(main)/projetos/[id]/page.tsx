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
  const res = await getProject(id);

  if (res.ok && "data" in res) {
    return (
      <Project
        project={res.data}
        crumbs={[
          {
            desc: "PROJETOS",
            link: "/projetos",
          },
          {
            desc: res.data.name,
            link: `/projetos/${res.data.id}`,
          },
        ]}
      />
    );
  }

  return;
}
