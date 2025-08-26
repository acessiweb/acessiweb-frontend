import AddEditGuideline from "@/app/(main)/_components/AddEditGuideline";
import { getGuideline } from "@/routes/guidelines";
import { ParamsPromise } from "@/types/params";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Editar solicitação de criação de diretriz",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  if (guideline && "id" in guideline) {
    return (
      <AddEditGuideline
        isRequest={true}
        crumbs={[
          {
            desc: "SOLICITAÇÕES",
            link: "/solicitacoes",
          },
          {
            desc: `EDITAR ${guideline.name}`,
            link: `/solicitacoes/editar/${guideline.id}`,
          },
        ]}
      />
    );
  }

  return;
}
