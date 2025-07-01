import { Project as ProjectType } from "@/types/project";

type ProjectProps = {
  project: ProjectType;
  isSecPage?: boolean;
  crumbs?: {
    desc: string;
    link: string;
  }[];
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
