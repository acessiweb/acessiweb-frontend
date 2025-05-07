"use client";

import { useEffect, useState } from "react";
import { ProjectType, useProjects } from "@/context/projects";
import { useSecPage } from "@/context/sec-page";
import Projects from "../page";
import SecondPage from "@/components/second-page";
import CardList from "@/components/card-list";

export default function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isOpen } = useSecPage();
  const [projectId, setProjectId] = useState("");
  const [project, setProject] = useState<ProjectType>({} as ProjectType);
  const { projects } = useProjects();

  useEffect(() => {
    const getParams = async () => {
      const p = await params;

      if (p.id) {
        setProjectId(p.id);
      }
    };

    getParams();
  }, []);

  useEffect(() => {
    const p: ProjectType =
      projects.find((p) => p.id === projectId) || ({} as ProjectType);
    setProject(p);
  }, [projectId]);

  return (
    <>
      <div className="read-project">
        <Projects />
        {isOpen && (
          <SecondPage title={project.name}>
            <p>{project.description}</p>
            <CardList data={project.guidelines || []} />
            <p>{project.feedback}</p>
          </SecondPage>
        )}
      </div>
    </>
  );
}
