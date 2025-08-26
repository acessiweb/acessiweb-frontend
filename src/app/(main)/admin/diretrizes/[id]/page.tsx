import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";
import Guideline from "@/app/(main)/_components/Guideline";

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
            link: "/admin/diretrizes",
          },
          {
            desc: guideline.name,
            link: `/admin/diretrizes/${guideline.id}`,
          },
        ]}
        isRequest={false}
      />
    );
  }

  return;
}
