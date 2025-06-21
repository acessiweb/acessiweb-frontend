import { Metadata } from "next";
import Guideline from "./guideline";
import { ParamsPromise } from "@/types/params";
import { getGuideline } from "@/routes/guidelines";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "É isso aí",
  };
}

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const guideline = await getGuideline(id);

  return <Guideline guideline={guideline} />;
}
