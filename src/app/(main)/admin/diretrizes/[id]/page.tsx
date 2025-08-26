import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";
import Guideline from "@/app/(main)/_components/Guideline";

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getGuideline(id);

  if (res && "data" in res) {
    return (
      <Guideline
        guideline={res.data}
        crumbs={[
          {
            desc: "DIRETRIZES",
            link: "/admin/diretrizes",
          },
          {
            desc: res.data.name,
            link: `/admin/diretrizes/${res.data.id}`,
          },
        ]}
        isRequest={false}
      />
    );
  }

  return;
}
