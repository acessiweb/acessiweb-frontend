import { getGuideline } from "@/routes/guidelines";
import { ParamsPromise } from "@/types/params";
import Request from "./Request";

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getGuideline(id);

  if (res && "data" in res) {
    return (
      <Request
        request={res.data}
        crumbs={[
          {
            desc: "SOLICITAÇÕES",
            link: "/solicitacoes",
          },
          {
            desc: res.data.name,
            link: `/solicitacoes/${res.data.id}`,
          },
        ]}
      />
    );
  }

  return;
}
