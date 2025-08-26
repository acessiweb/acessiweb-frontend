import { Metadata } from "next/types";
import { Page as PageType } from "@/types/page";
import AddEditGuideline from "@/app/(main)/_components/AddEditGuideline";

export const metadata: Metadata = {
  title: "Cadastrar diretriz",
};

type AddGuidelineProps = PageType;

export default function Page({
  handleSecPageTitle,
  isSecPage,
}: AddGuidelineProps) {
  return (
    <AddEditGuideline
      isRequest={false}
      isSecPage={isSecPage}
      handleSecPageTitle={handleSecPageTitle}
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
