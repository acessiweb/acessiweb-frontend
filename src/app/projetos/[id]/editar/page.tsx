"use client";

import SecondPage from "@/components/second-page";
import { useEffect, useState } from "react";
import Projects from "../../page";
import { ProjectType, useProjects } from "@/context/projects";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import updateProjectSchema from "@/schemas/projects/update-project";
import CardList from "@/components/card-list";

export default function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isSecPageOpen, setIsSecPageOpen] = useState(true);
  const [projectId, setProjectId] = useState("");
  const { projects, removeGuidelineFromProject } = useProjects();
  const [project, setProject] = useState<ProjectType>({} as ProjectType);
  const [projectName, setProjectName] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProjectSchema),
    values: {
      name: project.name,
      description: project.description,
      guidelines: project.guidelines,
    },
  });

  const onSubmit = () => {};

  const deleteGuidelineFromProject = (guidelineId: string) => {
    removeGuidelineFromProject(project.id, guidelineId);
  };

  return (
    <div className="edit-project">
      <Projects />
      {isSecPageOpen && (
        <SecondPage
          title={`Editar ${projectName || project.name}`}
          closeSecPage={() => setIsSecPageOpen(false)}
        >
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("name")}
              className="input-default"
              maxLength={150}
              placeholder="Acessibiweb"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProjectName(e.target.value)
              }
            />
            {errors.name && (
              <p className="form-error-msg">{errors.name?.message}</p>
            )}
            <textarea
              {...register("description")}
              className="textarea"
              placeholder="Crie uma descrição para o seu projeto..."
              rows={11}
            />
            <div className="edit-project__guidelines">
              <p>Minhas diretrizes</p>
              <CardList
                data={project.guidelines || []}
                hasDelete={true}
                onDelete={deleteGuidelineFromProject}
                errorMsg="Você ainda não incluiu diretrizes no seu projeto"
                showErrorMsgImage={false}
              />
              {errors.guidelines && (
                <p className="form-error-msg">{errors.guidelines?.message}</p>
              )}
            </div>
          </form>
        </SecondPage>
      )}
    </div>
  );
}
