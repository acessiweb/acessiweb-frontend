"use client";

import { useForm } from "react-hook-form";
import InputTextVoice from "@/components/InputTextVoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import useErrors from "@/hooks/useErrors";
import Errors from "@/components/Errors";
import { Project } from "@/types/project";
import {
  createEditProjectSchema,
  CreateEditProjectSchema,
} from "@/schemas/project.schema";

type AddEditProjectProps = {
  isSecPage?: boolean;
  handleSecPageTitle?: Dispatch<SetStateAction<string>>;
  toEdit?: boolean;
  crumbs?: {
    desc: string;
    link: string;
  }[];
  project?: Project;
};

export default function AddEditGuideline({
  isSecPage = false,
  toEdit = false,
  crumbs,
  project,
}: AddEditProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateEditProjectSchema>({
    resolver: zodResolver(createEditProjectSchema),
    defaultValues: {
      projName: project?.name,
      desc: project?.description,
    },
  });
  const { errorMsgs, isAlert } = useErrors();

  const handleSetValue = (name: string, value: string) => {
    if (name === "projName" || name === "desc") {
      setValue(name, value);
    }
  };

  const onSubmit = async () => {
    // if (data.deficiences.toString().replaceAll(",", "").length == 0) {
    //   handleErrorMsgs(
    //     "A diretriz precisa ter ao menos uma deficiência relacionada"
    //   );
    // } else {
    //   const formData = new FormData();
    //   formData.append("name", data.projName);
    //   formData.append("desc", data.desc);
    //   formData.append("image", data.guideImage[0]);
    //   formData.append("imageDesc", data.imageDesc!);
    //   formData.append("deficiences", JSON.stringify(data.deficiences));
    //   formData.append("code", code);
    //   if (sessionData && sessionData.user && sessionData.user.id) {
    //     // const res =
    //     //   toEdit && guideline && guideline.id
    //     //     ? await updateGuideline(sessionData.user.id, guideline.id, formData)
    //     //     : await createGuideline(sessionData.user.id, formData);
    //     if ("errors" in res) {
    //       handleErrorMsgs(res);
    //       setPushMsg("");
    //     } else if (!toEdit && "id" in res) {
    //       setPushMsg("Diretriz cadastrada com sucesso 🎉");
    //       reset();
    //       router.push("/admin/diretrizes");
    //     } else {
    //       setPushMsg("Diretriz atualizada com sucesso");
    //       router.push("/admin/diretrizes");
    //     }
    //   }
    // }
  };

  return (
    <div className="add-guideline">
      {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
      {!isSecPage && (
        <h1 className="heading-1">
          {toEdit ? `Editar diretriz ${project?.name}` : "Cadastro de diretriz"}
        </h1>
      )}
      <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="projName" className="sr-only">
          Nome da diretriz
        </label>
        <InputTextVoice
          useWatchName={"projName"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+n"
        >
          <input
            {...register("projName")}
            placeholder="Nome da diretriz, exemplo: Orientação"
            id="projName"
            name="projName"
            aria-invalid={errors.projName ? true : false}
            aria-keyshortcuts="alt+shift+n"
            aria-errormessage={
              errors.projName ? "invalid-guideline-name" : undefined
            }
          />
        </InputTextVoice>
        {errors.projName && (
          <small
            role="status"
            id="invalid-guideline-name"
            className="form-error-msg"
          >
            {errors.projName.message}
          </small>
        )}
        <label htmlFor="desc" className="sr-only">
          Descrição da diretriz
        </label>
        <InputTextVoice
          useWatchName={"desc"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+d"
        >
          <textarea
            {...register("desc")}
            placeholder="Descrição da diretriz, exemplo: nenhuma funcionalidade deve depender de uma orientação específica a não ser que a função precise ser executada"
            id="desc"
            name="desc"
            aria-invalid={errors.desc ? true : false}
            className="input-transparent"
            aria-errormessage={
              errors.desc ? "invalid-guideline-desc" : undefined
            }
            aria-keyshortcuts="alt+shift+d"
            rows={5}
          />
        </InputTextVoice>
        {errors.desc && (
          <small
            role="status"
            id="invalid-guideline-desc"
            className="form-error-msg"
          >
            {errors.desc.message}
          </small>
        )}
        <Errors msgs={errorMsgs} isAlert={isAlert} />
        <div className="cart__form__btn">
          <button type="submit" className="btn-default">
            {toEdit ? "Editar" : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
}
