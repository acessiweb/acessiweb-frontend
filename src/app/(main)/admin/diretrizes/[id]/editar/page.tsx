import type { Metadata } from "next";
import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";
import AddEditGuideline from "@/app/(main)/_components/AddEditGuideline";

export const metadata: Metadata = {
  title: "Diretrizes de acessibilidade",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  if (guideline && "id" in guideline) {
    return (
      <AddEditGuideline
        guideline={guideline}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/admin/diretrizes",
          },
          {
            desc: `EDITAR ${guideline.name}`,
            link: `/admin/diretrizes/${guideline.id}/editar`,
          },
        ]}
        isRequest={false}
      />
    );
  }

  return;
}
