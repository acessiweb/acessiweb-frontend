"use client";

import { useForm } from "react-hook-form";
import InputTextVoice from "@/components/InputTextVoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Breadcrumb } from "@/components/Breadcrumb";
import useErrors from "@/hooks/useErrors";
import Errors from "@/components/Errors";
import { Project } from "@/types/project";
import { Page } from "@/types/page";
import { ChangeEvent, useEffect, useState } from "react";
import { useCart } from "@/context/cart";
import { CardBtnDelete } from "@/components/CardBtn";
import Link from "next/link";
import useSecPage from "@/hooks/useSecPage";
import SecondPage from "@/components/SecondPage";
import { useScreenType } from "@/hooks/useScreenType";
import { getGuideline } from "@/routes/guidelines";
import Guideline from "../../diretrizes/[id]/Guideline";
import { CardLinkDelete } from "@/components/CardLink";
import { createProject, editProject } from "@/routes/projects";
import { usePush } from "@/context/push";
import { useRouter } from "next/navigation";
import {
  CreateProjectSchema,
  createProjectSchema,
  EditProjectSchema,
  editProjectSchema,
} from "@/schemas/project.schema";

type AddEditProjectProps = Page & {
  project?: Project;
};

export default function AddEditProject({
  isSecPage = false,
  isEditPage = false,
  crumbs,
  project,
  handleSecPageTitle,
}: AddEditProjectProps) {
  const {
    cart,
    removeGuidelineOfCart,
    addDescriptionToCart,
    addNameToCart,
    cleanCart,
  } = useCart();
  const {
    isOpen: isSecPageOpen,
    handleIsOpen: handleIsSecPageOpen,
    getSecPageClass,
    handleNode: handleSecPageContent,
    node: secPageContent,
    title: secPageTitle,
    handleTitle,
    fullScreenLink,
    handleFullScreenLink,
  } = useSecPage();
  const [guidelinesShown, setGuidelinesShown] = useState(false);
  const { isDesktop } = useScreenType();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EditProjectSchema | CreateProjectSchema>({
    resolver: zodResolver(isEditPage ? editProjectSchema : createProjectSchema),
    defaultValues: {
      projName: isEditPage ? project?.name : cart.name,
      desc: isEditPage ? project?.description : cart.description,
      guidelines: isEditPage ? project?.guidelines : cart.guidelines,
      feedback: project?.feedback || "",
    },
  });
  const { handleApiErrors, errorMsgs, isAlert } = useErrors();
  const { setPushMsg, setShowPush } = usePush();
  const router = useRouter();
  const projectName = watch("projName");

  useEffect(() => {
    if (handleSecPageTitle) {
      handleSecPageTitle(
        isEditPage
          ? `Editar ${project?.name}`
          : projectName || "Cadastrar projeto"
      );
    }
  }, [projectName, handleSecPageTitle, isEditPage, project]);

  const handleSetValue = (name: string, value: string) => {
    if (name === "projName" || name === "desc") {
      setValue(name, value);
    }
  };

  const handleReadSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      handleIsSecPageOpen(true);
      handleSecPageContent(<Guideline guideline={guideline} />);
      handleTitle(guideline.name);
      handleFullScreenLink(`/diretrizes/${id}`);
    }
  };

  const handleResponse = () => {
    setPushMsg(
      `Projeto ${isEditPage ? "editado" : "cadastrado"} com sucesso 🎉`
    );
    setShowPush(true);
    reset();

    if (isDesktop) {
      window.location.reload();
    } else {
      router.push("/projetos");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEditPage) {
      addNameToCart(e.target.value);
    }
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isEditPage) {
      addDescriptionToCart(e.target.value);
    }
  };

  const onSubmit = async (data: CreateProjectSchema | EditProjectSchema) => {
    const res =
      isEditPage && "feedback" in data && project
        ? await editProject(project.id, {
            name: data.projName,
            desc: data.desc,
            guidelines: data.guidelines.map((guide) => guide.id),
            feedback: data.feedback || "",
          })
        : await createProject({
            name: data.projName,
            desc: data.desc,
            guidelines: data.guidelines.map((guide) => guide.id),
          });

    if ("errors" in res) {
      handleApiErrors([res]);
      setPushMsg("");
      setShowPush(false);
    } else {
      handleResponse();

      if (!isEditPage) {
        cleanCart();
      }
    }
  };

  return (
    <div className={getSecPageClass()}>
      <div className={`${isEditPage ? "edit-project" : "add-project"}`}>
        {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
        {!isSecPage && (
          <h1
            className="heading-1"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {isEditPage
              ? `Editar projeto ${project?.name}`
              : projectName || "Novo projeto"}
          </h1>
        )}
        <div className="toggle-guidelines">
          <button
            className="btn-default"
            onClick={() => setGuidelinesShown((prev) => !prev)}
            aria-pressed={guidelinesShown}
            id="toggle-guidelines"
            aria-controls="guidelines-grid"
          >
            {`${guidelinesShown ? "Ocultar" : "Mostrar"}`} Diretrizes
            selecionadas
          </button>
          <Link
            href="/diretrizes"
            className="btn-link-default"
            aria-label="Incluir diretrizes no carrinho (+)"
          >
            &#43;
          </Link>
        </div>
        <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="projName" className="sr-only">
            Nome do projeto
          </label>
          <InputTextVoice
            useWatchName={"projName"}
            handleSetValue={handleSetValue}
            keycut="alt+shift+n"
          >
            <input
              {...register("projName")}
              placeholder="Nome do projeto, exemplo: Acessiweb"
              id="projName"
              name="projName"
              aria-invalid={errors.projName ? true : false}
              aria-keyshortcuts="alt+shift+n"
              aria-errormessage={
                errors.projName ? "invalid-project-name" : undefined
              }
              onChange={handleNameChange}
            />
          </InputTextVoice>
          {errors.projName && (
            <small
              role="status"
              id="invalid-project-name"
              className="form-error-msg"
            >
              {errors.projName.message}
            </small>
          )}
          <label htmlFor="desc" className="sr-only">
            Descrição do projeto
          </label>
          <InputTextVoice
            useWatchName={"desc"}
            handleSetValue={handleSetValue}
            keycut="alt+shift+d"
          >
            <textarea
              {...register("desc")}
              placeholder="Descrição do projeto, exemplo: esse sistema permitirá que os usuários cadastrem seus projetos e associem a eles as diretrizes mais relevantes para seu contexto. Assim, não se trata de uma ferramenta que implementa e avalia automaticamente a acessibilidade, mas de um meio estruturado para os usuários terem maior controle e visibilidade sobre os requisitos necessários para tornar seus projetos mais acessíveis."
              id="desc"
              name="desc"
              aria-invalid={errors.desc ? true : false}
              className="input-transparent"
              aria-errormessage={
                errors.desc ? "invalid-project-desc" : undefined
              }
              aria-keyshortcuts="alt+shift+d"
              rows={5}
              onChange={handleDescChange}
            />
          </InputTextVoice>
          {errors.desc && (
            <small
              role="status"
              id="invalid-project-desc"
              className="form-error-msg"
            >
              {errors.desc.message}
            </small>
          )}
          {guidelinesShown && cart.guidelines.length > 0 && (
            <div className="grid" id="guidelines-grid">
              {cart.guidelines.map((guide) => (
                <div className="grid__item" key={guide.id}>
                  {isDesktop ? (
                    <CardBtnDelete
                      mainText={guide.name}
                      registerId={guide.id}
                      onClick={() => handleReadSecPage(guide.id)}
                      registerName={guide.name}
                      onDelete={() => removeGuidelineOfCart(guide.id)}
                    />
                  ) : (
                    <CardLinkDelete
                      mainText={guide.name}
                      onDelete={() => removeGuidelineOfCart(guide.id)}
                      readRoute={`/diretrizes/${guide.id}`}
                      registerId={guide.id}
                      registerName={guide.name}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {errors.guidelines && (
            <small
              role="status"
              id="invalid-project-guidelines"
              className="form-error-msg"
            >
              {errors.guidelines.message}
            </small>
          )}
          {isEditPage && (
            <>
              <label htmlFor="feedback" className="sr-only">
                Feedback do projeto
              </label>
              <InputTextVoice
                useWatchName={"feedback"}
                handleSetValue={handleSetValue}
                keycut="alt+shift+f"
              >
                <input
                  {...register("feedback")}
                  placeholder="Feedback do projeto, exemplo: Após implementar as diretrizes selecionadas..."
                  id="feedback"
                  name="feedback"
                  aria-invalid={"feedback" in errors ? true : false}
                  aria-keyshortcuts="alt+shift+f"
                  aria-errormessage={
                    "feedback" in errors ? "invalid-project-name" : undefined
                  }
                />
              </InputTextVoice>
              {"feedback" in errors && (
                <small
                  role="status"
                  id="invalid-project-name"
                  className="form-error-msg"
                >
                  {errors.feedback?.message}
                </small>
              )}
            </>
          )}
          <Errors msgs={errorMsgs} isAlert={isAlert} />
          <div>
            <button type="submit" className="btn-default">
              {isEditPage ? "Editar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
      {isSecPageOpen && isDesktop && (
        <SecondPage
          title={secPageTitle}
          onClick={() => handleIsSecPageOpen(false)}
          fullScreenLink={fullScreenLink}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
