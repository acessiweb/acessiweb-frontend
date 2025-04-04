"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePush } from "./push";

type ProjectType = {
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
  const [randomNumber, setRandomNumber] = useState(0);
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  const { setPushMsg, setShowPush } = usePush();

  useEffect(() => {
    const projs = localStorage.getItem("acessibiweb-projects");

    if (projs) {
      const projsParsed: ProjectType[] = [...JSON.parse(projs)];

      setProjects(projsParsed);
    }
  }, []);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 10000000));
    setCreationDate(new Date());
  }, []);

  const addProject = (project: AddProjectType): string => {
    const id = `project-${randomNumber}`;

    setProjects((prevProjects: ProjectType[]) => {
      const newProjects = [...prevProjects];

      newProjects.push({
        ...project,
        id,
        createdAt: creationDate,
        updatedAt: creationDate,
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

  const saveProjects = (projects: ProjectType[]) => {
    localStorage.setItem("acessibiweb-projects", JSON.stringify(projects));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
