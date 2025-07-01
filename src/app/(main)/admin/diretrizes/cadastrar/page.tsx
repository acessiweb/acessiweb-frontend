import { Metadata } from "next/types";
import AddGuideline from "./AddGuideline";

export const metadata: Metadata = {
  title: "Cadastrar diretriz",
};

export default function Page() {
  return (
    <AddGuideline
      crumbs={[
        {
          desc: "DIRETRIZES",
          link: "/admin/diretrizes",
        },
        {
          desc: "CADASTRAR DIRETRIZ",
          link: `/diretrizes/cadastrar`,
        },
      ]}
    />
  );
}
