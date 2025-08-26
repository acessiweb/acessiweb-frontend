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
  const res = await getGuideline(id);

  if (res.ok && "data" in res) {
    return (
      <AddEditGuideline
        isRequest={true}
        crumbs={[
          {
            desc: "SOLICITAÇÕES",
            link: "/solicitacoes",
          },
          {
            desc: `EDITAR ${res.data.name}`,
            link: `/solicitacoes/editar/${res.data.id}`,
          },
        ]}
        isEditPage={true}
        guideline={res.data}
      />
    );
  }

  return;
}
