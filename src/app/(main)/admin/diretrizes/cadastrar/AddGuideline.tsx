import { Dispatch, SetStateAction } from "react";
import AddEditGuideline from "../../_components/AddEditGuideline";

type AddGuidelineProps = {
  isSecPage?: boolean;
  handleSecPageTitle?: Dispatch<SetStateAction<string>>;
  crumbs?: {
    desc: string;
    link: string;
  }[];
};

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
