import { Guideline } from "@/types/guideline";
import AddEditGuideline from "../../../_components/add-edit-guideline";
import { Dispatch, SetStateAction } from "react";

type EditGuidelineProps = {
  isSecPage?: boolean;
  handleSecPageTitle?: Dispatch<SetStateAction<string>>;
  crumbs?: {
    desc: string;
    link: string;
  }[];
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
      toEdit={true}
      crumbs={crumbs}
      handleSecPageTitle={handleSecPageTitle}
      guideline={guideline}
      isSecPage={isSecPage}
    />
  );
}
