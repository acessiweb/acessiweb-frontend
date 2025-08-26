import { Metadata } from "next/types";
import AddEditGuideline from "@/app/(main)/_components/AddEditGuideline";

export const metadata: Metadata = {
  title: "Cadastrar diretriz",
};

export default function Page() {
  return (
    <AddEditGuideline
      isRequest={false}
      crumbs={[
        {
          desc: "DIRETRIZES",
          link: "/admin/diretrizes",
        },
        {
          desc: "CADASTRAR DIRETRIZ",
          link: `/admin/diretrizes/cadastrar`,
        },
      ]}
    />
  );
}
