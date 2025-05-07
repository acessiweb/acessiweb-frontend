"use client";

import { useEffect, useState } from "react";
import { ProjectType, useProjects } from "@/context/projects";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import updateProjectSchema from "@/schemas/projects/update-project";
import CardList from "@/components/card-list";
import { usePush } from "@/context/push";
import { useSecPage } from "@/context/sec-page";
import SecondPage from "@/components/second-page";
import Projects from "../../page";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { captureVoiceAndPrintText } from "@/common/utils/voice";

export default function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { setIsOpen, isOpen } = useSecPage();
  const { projects, removeGuidelineFromProject, updateProject } = useProjects();
  const { setShowPush, setPushMsg } = usePush();
  const [project, setProject] = useState({} as ProjectType);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(updateProjectSchema),
  });

  useEffect(() => {
    const getParams = async () => {
      const p = await params;

      if (p.id) {
        const proj =
          projects.find((proj) => proj.id === p.id) || ({} as ProjectType);

        setProject(proj);

        reset({
          name: proj.name,
          description: proj.description,
          guidelines: proj.guidelines,
          feedback: proj.feedback,
        });
      }
    };

    getParams();
  }, []);

  const onSubmit: SubmitHandler<{
    description?: string | undefined;
    guidelines?:
      | {
          name: string;
          id: string;
        }[]
      | undefined;
    feedback?: string | undefined;
    name: string;
  }> = (data) => {
    const id = updateProject(project.id, {
      name: data.name,
      description: data.description,
      guidelines: data.guidelines || [],
      feedback: data.feedback,
    });

    if (id) {
      setShowPush(true);
      setPushMsg("Projeto atualizado com sucesso 🥳");
      setIsOpen(false);
    }
  };

  const deleteGuidelineFromProject = (guidelineId: string) => {
    removeGuidelineFromProject(project.id, guidelineId);
  };

  return (
    <>
      <div className="edit-project">
        <Projects />
        {isOpen && (
          <SecondPage title={`Editar ${getValues()["name"] || project.name}`}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-wrapper">
                <label htmlFor="name">Nome do projeto</label>
                <div className="input-text-wrapper">
                  <input
                    {...register("name")}
                    type="text"
                    maxLength={150}
                    placeholder="Acessibiweb"
                    id="name"
                    name="name"
                  />
                  <button
                    className="btn-default"
                    type="button"
                    onClick={() => captureVoiceAndPrintText("name")}
                  >
                    <MicNoneOutlinedIcon />
                  </button>
                </div>
                {errors.name && (
                  <p className="form-error-msg">{errors.name?.message}</p>
                )}
              </div>
              <div className="input-wrapper">
                <label htmlFor="description">Descrição do projeto</label>
                <div className="input-text-wrapper">
                  <textarea
                    {...register("description")}
                    className="textarea"
                    placeholder="Crie uma descrição para o seu projeto..."
                    rows={11}
                    id="description"
                    name="description"
                  />
                  <button
                    className="btn-default"
                    type="button"
                    onClick={() => captureVoiceAndPrintText("description")}
                  >
                    <MicNoneOutlinedIcon />
                  </button>
                </div>
              </div>
              <div className="edit-project__guidelines">
                <p>Minhas diretrizes</p>
                <CardList
                  data={getValues()["guidelines"] || []}
                  hasDelete={true}
                  onDelete={deleteGuidelineFromProject}
                  errorMsg="Você ainda não incluiu diretrizes no seu projeto"
                  showErrorMsgImage={false}
                />
                {errors.guidelines && (
                  <p className="form-error-msg">{errors.guidelines?.message}</p>
                )}
              </div>
              <div className="input-wrapper">
                <label htmlFor="feedback">Feedback</label>
                <div className="input-text-wrapper">
                  <textarea
                    {...register("feedback")}
                    className="textarea"
                    placeholder="O projeto precisava ser acessível para pessoas com deficiência visual, com as diretrizes selecionadas foi possível implementar acessibilidade para esse grupo..."
                    rows={11}
                    id="feedback"
                    name="feedback"
                  />
                  <button
                    className="btn-default"
                    type="button"
                    onClick={() => captureVoiceAndPrintText("feedback")}
                  >
                    <MicNoneOutlinedIcon />
                  </button>
                </div>
              </div>
              <div style={{ margin: "30px auto 0" }}>
                <button type="submit" className="btn-default">
                  Atualizar projeto
                </button>
              </div>
            </form>
          </SecondPage>
        )}
      </div>
    </>
  );
}
