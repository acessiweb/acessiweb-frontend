"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePush } from "./push";

export type ProjectType = {
  id: string;
  name: string;
  description?: string;
  feedback: string;
  guidelines: GuidelineType[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type AddProjectType = {
  userId: string;
  name: string;
  description?: string;
  guidelines: GuidelineType[];
};

type ProjectContextType = {
  projects: ProjectType[];
  addProject: (_project: AddProjectType) => string;
  deleteProject: (_projectId: string) => void;
  removeGuidelineFromProject: (
    _projectId: string,
    _guidelineId: string
  ) => void;
};

const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

export default function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { setPushMsg, setShowPush } = usePush();

  useEffect(() => {
    const projs = localStorage.getItem("acessibiweb-projects");

    if (projs) {
      const projsParsed: ProjectType[] = [...JSON.parse(projs)];

      setProjects(projsParsed);
    }
  }, []);

  const addProject = (project: AddProjectType): string => {
    const randomNumber = Math.floor(Math.random() * 10000000);
    const id = `project-${randomNumber}`;

    setProjects((prevProjects: ProjectType[]) => {
      const newProjects = [...prevProjects];

      newProjects.push({
        ...project,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        feedback: "",
      });

      saveProjects(newProjects);

      return newProjects;
    });

    return id;
  };

  const deleteProject = (id: string) => {
    setProjects((prevProjects: ProjectType[]) => {
      let newProjects = [...prevProjects];
      newProjects = newProjects.filter((project) => project.id !== id);

      saveProjects(newProjects);

      return newProjects;
    });

    setShowPush(true);
    setPushMsg("Projeto deletado com sucesso");
  };

  const removeGuidelineFromProject = (id: string, guidelineId: string) => {
    setProjects((prevProjects: ProjectType[]) => {
      let newProjects = [...prevProjects];

      newProjects = newProjects.map((project) => {
        if (project.id === id) {
          let newGuidelines = [...project.guidelines];

          newGuidelines = newGuidelines.filter(
            (guideline) => guideline.id !== guidelineId
          );

          project.guidelines = newGuidelines;
        }

        return project;
      });

      return newProjects;
    });
  };

  const saveProjects = (projects: ProjectType[]) => {
    localStorage.setItem("acessibiweb-projects", JSON.stringify(projects));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        removeGuidelineFromProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
