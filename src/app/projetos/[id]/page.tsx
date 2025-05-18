import { Metadata } from "next/types";
import Project from "./project";

export const metadata: Metadata = {
  title: "Meus projetos",
};

export default function Page({ params }: UrlParams) {
  return <Project params={params} />;
}
