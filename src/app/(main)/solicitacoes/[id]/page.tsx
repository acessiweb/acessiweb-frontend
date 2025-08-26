import { getGuideline } from "@/routes/guidelines";
import Guideline from "../../_components/Guideline";
import { ParamsPromise } from "@/types/params";

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getGuideline(id);

  if (res.ok && "data" in res) {
    return (
      <Guideline
        guideline={res.data}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/diretrizes",
          },
          {
            desc: res.data.name,
            link: `/diretrizes/${res.data.id}`,
          },
        ]}
        isRequest={true}
      />
    );
  }

  return;
}
