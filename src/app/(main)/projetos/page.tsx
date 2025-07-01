import type { Metadata } from "next";
import Projects from "./Projects";

export const metadata: Metadata = {
  title: "Meus projetos",
};

export default function Page() {
  return <Projects />;
}
