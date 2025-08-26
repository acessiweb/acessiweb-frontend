import { getGuideline } from "@/routes/guidelines";
import Guideline from "../../_components/Guideline";
import { ParamsPromise } from "@/types/params";

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  if (guideline && "id" in guideline) {
    return (
      <Guideline
        guideline={guideline}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/diretrizes",
          },
          {
            desc: guideline.name,
            link: `/diretrizes/${guideline.id}`,
          },
        ]}
        isRequest={true}
      />
    );
  }

  return;
}
