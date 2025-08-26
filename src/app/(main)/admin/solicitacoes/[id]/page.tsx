import { getGuideline } from "@/routes/guidelines";
import { ParamsPromise } from "@/types/params";
import Request from "./Request";

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  if (guideline && "id" in guideline) {
    return (
      <Request
        request={guideline}
        crumbs={[
          {
            desc: "SOLICITAÇÕES",
            link: "/solicitacoes",
          },
          {
            desc: guideline.name,
            link: `/solicitacoes/${guideline.id}`,
          },
        ]}
      />
    );
  }

  return;
}
