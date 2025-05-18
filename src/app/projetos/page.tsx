import type { Metadata } from "next";
import Projects from "./projects";

export const metadata: Metadata = {
  title: "Meus projetos",
};

export default function Page() {
  return <Projects />;
}
