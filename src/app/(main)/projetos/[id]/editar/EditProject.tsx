import AddEditProject from "../../_components/AddEditProject";
import { Project } from "@/types/project";
import { Page } from "@/types/page";

type EditProjectProps = Page & {
  project: Project;
};

export default function EditProject({
  crumbs,
  handleSecPageTitle,
  project,
  isSecPage,
}: EditProjectProps) {
  return (
    <AddEditProject
      crumbs={crumbs}
      handleSecPageTitle={handleSecPageTitle}
      project={project}
      isSecPage={isSecPage}
      isEditPage={true}
    />
  );
}
