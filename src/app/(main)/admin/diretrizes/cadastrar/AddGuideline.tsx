import { Page } from "@/types/page";
import AddEditGuideline from "../../_components/AddEditGuideline";

type AddGuidelineProps = Page;

export default function AddGuideline({
  handleSecPageTitle,
  crumbs,
  isSecPage,
}: AddGuidelineProps) {
  return (
    <AddEditGuideline
      handleSecPageTitle={handleSecPageTitle}
      crumbs={crumbs}
      isSecPage={isSecPage}
    />
  );
}
