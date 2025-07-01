import { Metadata } from "next/types";
import EditProject from "./edit-project";

export const metadata: Metadata = {
  title: "Meus projetos",
};

export default function Page({ params }: UrlParams) {
  return <EditProject params={params} />;
}
