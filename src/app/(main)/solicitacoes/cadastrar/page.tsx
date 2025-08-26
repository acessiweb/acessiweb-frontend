import { Metadata } from "next/types";
import AddEditGuideline from "../../_components/AddEditGuideline";

export const metadata: Metadata = {
  title: "Cadastrar solicitação de criação de diretriz",
};

export default function Page() {
  return (
    <AddEditGuideline
      isRequest={true}
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
