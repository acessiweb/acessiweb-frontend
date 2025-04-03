type ProjectType = {
  id: string;
  name: string;
  desc?: string;
  feedback: string;
  guidelines: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const projects: ProjectType[] = [];

export function addProject(project: {
  userId: string;
  name: string;
  desc?: string;
  guidelines: { id: string; name: string }[];
}) {
  const projs = localStorage.getItem("acessibiweb-projects");

  if (projs) {
    const projsParsed = [...JSON.parse(projs)];

    projsParsed.push(project);

    setProjects(projsParsed);
  }
}

export function deleteProject() {}

export function getProjects() {
  return localStorage.getItem("acessibiweb-projects");
}

export function setProjects(projects: ProjectType[]) {
  localStorage.setItem("acessibiweb-projects", JSON.stringify(projects));
}
