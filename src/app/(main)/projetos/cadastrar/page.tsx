import { Metadata } from "next/types";
import AddProject from "./add-project";

export const metadata: Metadata = {
  title: "Meus projetos - criar projeto",
};

export default function Page() {
  return <AddProject />;
}
