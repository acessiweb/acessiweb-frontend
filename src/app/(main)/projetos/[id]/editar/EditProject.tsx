import { Dispatch, SetStateAction } from "react";
import AddEditProject from "../../_components/AddEditProject";
import { Project } from "@/types/project";

type EditProjectProps = {
  isSecPage?: boolean;
  handleSecPageTitle?: Dispatch<SetStateAction<string>>;
  crumbs?: {
    desc: string;
    link: string;
  }[];
  project: Project;
};

export default function EditGuideline({
  crumbs,
  handleSecPageTitle,
  project,
  isSecPage,
}: EditProjectProps) {
  return (
    <AddEditProject
      toEdit={true}
      crumbs={crumbs}
      handleSecPageTitle={handleSecPageTitle}
      project={project}
      isSecPage={isSecPage}
    />
  );
}
