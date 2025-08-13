import { Metadata } from "next/types";
import AddGuidelineRequest from "./AddGuidelineRequest";

export const metadata: Metadata = {
  title: "Cadastrar solicitação de criação de diretriz",
};

export default function Page() {
  return (
    <AddGuidelineRequest
      crumbs={[
        {
          desc: "SOLICITAÇÕES",
          link: "/solicitacoes",
        },
        {
          desc: "CADASTRAR SOLICITAÇÃO",
          link: `/solicitacoes/cadastrar`,
        },
      ]}
    />
  );
}
