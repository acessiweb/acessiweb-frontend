import type { Metadata } from "next";
import EditGuideline from "./EditGuideline";
import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";

export const metadata: Metadata = {
  title: "Diretrizes de acessibilidade",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  if (guideline && "id" in guideline) {
    return (
      <EditGuideline
        guideline={guideline}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/admin/diretrizes",
          },
          {
            desc: `EDITAR ${guideline.name}`,
            link: `/diretrizes/${guideline.id}/editar`,
          },
        ]}
      />
    );
  }

  return;
}
