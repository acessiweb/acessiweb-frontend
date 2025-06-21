import type { Metadata } from "next";
import EditGuideline from "./edit-guideline";
import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";

export const metadata: Metadata = {
  title: "Diretrizes de acessibilidade",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  return <EditGuideline guideline={guideline} />;
}
