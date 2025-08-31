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
  const res = await getGuideline(id);

  console.log(res);

  if (res.ok && "data" in res) {
    return (
      <AddEditGuideline
        guideline={res.data}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/admin/diretrizes",
          },
          {
            desc: `EDITAR ${res.data.name}`,
            link: `/admin/diretrizes/${res.data.id}/editar`,
          },
        ]}
        isRequest={false}
      />
    );
  }

  return;
}
