import AddEditProject from "../_components/AddEditProject";
import { Page } from "@/types/page";

type AddProjectProps = Page;

export default function AddProject({
  handleSecPageTitle,
  crumbs,
  isSecPage,
}: AddProjectProps) {
  return (
    <AddEditProject
      handleSecPageTitle={handleSecPageTitle}
      crumbs={crumbs}
      isSecPage={isSecPage}
    />
  );
}
