import { Guideline } from "@/types/guideline";
import AddEditGuideline from "../../../_components/AddEditGuideline";
import { Page } from "@/types/page";

type EditGuidelineProps = Page & {
  guideline?: Guideline;
};

export default function EditGuideline({
  crumbs,
  handleSecPageTitle,
  guideline,
  isSecPage,
}: EditGuidelineProps) {
  return (
    <AddEditGuideline
      isEditPage={true}
      crumbs={crumbs}
      handleSecPageTitle={handleSecPageTitle}
      guideline={guideline}
      isSecPage={isSecPage}
    />
  );
}
