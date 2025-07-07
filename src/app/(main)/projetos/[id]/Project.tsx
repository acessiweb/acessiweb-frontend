import { Page } from "@/types/page";
import { Project as ProjectType } from "@/types/project";

type ProjectProps = Page & {
  project: ProjectType;
};

export default function Project({ project }: ProjectProps) {
  return (
    <div className="read-project">
      <p>{project.description}</p>
      {/* <CardList data={project.guidelines || []} /> */}
      <p>{project.feedback}</p>
    </div>
  );
}
