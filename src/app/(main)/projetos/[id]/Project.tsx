import { Page } from "@/types/page";
import { Project as ProjectType } from "@/types/project";

type ProjectProps = Page & {
  project: ProjectType;
};

export default function Project({ project }: ProjectProps) {
  return (
    <div className="read-project">
      <p>{project.description}</p>
      {project.guidelines && project.guidelines.length > 0 && (
        <div className="grid" id="guidelines-grid">
          {project.guidelines.map((guide) => (
            <div className="grid__item" key={guide.id}>
              <div className="card">
                <h3>{guide.name}</h3>
                <p>{guide.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <p>{project.feedback}</p>
    </div>
  );
}
