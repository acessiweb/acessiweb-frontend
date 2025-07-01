import { Metadata } from "next";
import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";
import Guideline from "@/app/(main)/diretrizes/[id]/Guideline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "É isso aí",
  };
}

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
      />
    );
  }

  return;
}
