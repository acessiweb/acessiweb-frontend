import { Metadata } from "next/types";
import AddEditProject from "../_components/AddEditProject";

export const metadata: Metadata = {
  title: "Meus projetos - criar projeto",
};

export default function Page() {
  return <AddEditProject />;
}
