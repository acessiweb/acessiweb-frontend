import { Page } from "@/types/page";
import AddEditGuidelineRequest from "../_components/AddEditGuidelineRequest";

type AddGuidelineProps = Page;

export default function AddGuidelineRequest({
  handleSecPageTitle,
  crumbs,
  isSecPage,
}: AddGuidelineProps) {
  return (
    <AddEditGuidelineRequest
      handleSecPageTitle={handleSecPageTitle}
      crumbs={crumbs}
      isSecPage={isSecPage}
    />
  );
}
